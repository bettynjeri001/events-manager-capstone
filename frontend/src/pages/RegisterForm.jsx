// components/RegisterForm.jsx
export function RegisterForm() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      <form className="space-y-4">
        {/* Email & Password fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select 
            name="role"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="attendee">Attendee</option>
            <option value="organizer">Event Organizer</option>
          </select>
        </div>

        {/* Conditionally show organizer field */}
        <div id="organizerFields" className="hidden">
          <label className="block text-sm font-medium text-gray-700">Organization Name</label>
          <input 
            type="text" 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
      </form>
    </div>
  );
}