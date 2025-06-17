import React, { useState } from "react";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("attendee");
  const [organizationName, setOrganizationName] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    if (e.target.value !== "organizer") {
      setOrganizationName("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const payload = {
      username,
      password,
      role,
      organization_name: role === "organizer" ? organizationName : "",
    };
    const response = await fetch("http://localhost:8000/api/events/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.status === 201) {
      setSuccess("Registration successful! You can now log in.");
      setUsername("");
      setPassword("");
      setRole("attendee");
      setOrganizationName("");
    } else {
      const data = await response.json();
      setError(
        data.username?.[0] ||
        data.password?.[0] ||
        data.role?.[0] ||
        data.organization_name?.[0] ||
        data.detail ||
        "Registration failed."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {success && (
          <div className="mb-4 text-orange-600 text-center">{success}</div>
        )}
        {error && (
          <div className="mb-4 text-orange-600 text-center">{error}</div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            name="role"
            value={role}
            onChange={handleRoleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
            <option value="attendee">Attendee</option>
            <option value="organizer">Event Organizer</option>
          </select>
        </div>
        {role === "organizer" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Organization Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              value={organizationName}
              onChange={e => setOrganizationName(e.target.value)}
              required={role === "organizer"}
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Register
        </button>
      </form>
    </div>
  );
}