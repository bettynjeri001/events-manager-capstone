import React, { useState } from "react";
import { FiGrid, FiClipboard, FiBarChart2, FiUsers, FiDollarSign } from "react-icons/fi";

const initialEvents = [
  {
    id: 1,
    title: "Nairobi Tech Expo",
    date: "2025-07-10",
    location: "Nairobi",
    description: "A showcase of the latest in tech.",
  },
  {
    id: 2,
    title: "Mombasa Food Carnival",
    date: "2025-08-15",
    location: "Mombasa",
    description: "Taste the best dishes from the coast.",
  },
];

const sideMenu = [
  { key: "event", label: "Event Management", icon: <FiGrid /> },
  { key: "ticket", label: "Ticketing & Registration", icon: <FiClipboard /> },
  { key: "analytics", label: "Analytics", icon: <FiBarChart2 /> },
  { key: "attendee", label: "Attendee Management", icon: <FiUsers /> },
  { key: "finance", label: "Financial Tools", icon: <FiDollarSign /> },
];

export default function OrganizerDashboard() {
  const [events, setEvents] = useState(initialEvents);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });
  const [activeMenu, setActiveMenu] = useState("event");

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.location) return;
    setEvents([
      ...events,
      { ...form, id: Date.now() }
    ]);
    setForm({ title: "", date: "", location: "", description: "" });
    setShowForm(false);
  };

  const handleEditEvent = (event) => {
    setEditId(event.id);
    setForm({
      title: event.title,
      date: event.date,
      location: event.location,
      description: event.description,
    });
    setShowForm(true);
  };

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    setEvents(events.map(ev =>
      ev.id === editId ? { ...form, id: editId } : ev
    ));
    setEditId(null);
    setForm({ title: "", date: "", location: "", description: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setEvents(events.filter(ev => ev.id !== id));
  };

  // Content for each menu
  const renderContent = () => {
    switch (activeMenu) {
      case "event":
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-cyan-900">Event Management</h1>
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  setEditId(null);
                  setForm({ title: "", date: "", location: "", description: "" });
                }}
                className="bg-orange-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                {showForm && !editId ? "Cancel" : editId ? "Cancel Edit" : "Add New Event"}
              </button>
            </div>
            {showForm && (
              <form onSubmit={editId ? handleUpdateEvent : handleAddEvent} className="mb-8 flex flex-col gap-3 bg-gray-100 p-4 rounded-lg">
                <input
                  type="text"
                  name="title"
                  placeholder="Event Title"
                  value={form.title}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={form.location}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <button
                  type="submit"
                  className="bg-cyan-900 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  {editId ? "Update Event" : "Add Event"}
                </button>
              </form>
            )}
            <h2 className="text-xl font-bold mb-4 text-cyan-900">Your Events</h2>
            {events.length === 0 ? (
              <p className="text-gray-500">No events yet.</p>
            ) : (
              <ul className="space-y-4">
                {events.map((event) => (
                  <li key={event.id} className="bg-stone-100 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-orange-700">{event.title}</h3>
                      <p className="text-gray-700 text-sm">
                        {event.date} &middot; {event.location}
                      </p>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="bg-cyan-900 hover:bg-cyan-700 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="bg-orange-700 hover:bg-orange-300 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        );
      case "ticket":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4 text-cyan-900">Ticketing & Registration</h1>
            <p className="text-gray-700">Manage ticket sales and attendee registrations here.</p>
          </div>
        );
      case "analytics":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4 text-cyan-900">Analytics</h1>
            <p className="text-gray-700">View event analytics and reports here.</p>
          </div>
        );
      case "attendee":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4 text-cyan-900">Attendee Management</h1>
            <p className="text-gray-700">Manage your event attendees here.</p>
          </div>
        );
      case "finance":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4 text-cyan-900">Financial Tools</h1>
            <p className="text-gray-700">Access financial tools and reports here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Side Navigation */}
      <aside className="w-64 bg-white shadow-lg rounded-r-xl p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-cyan-900 mb-6">Dashboard</h2>
        {sideMenu.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveMenu(item.key)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
              activeMenu === item.key
                ? "bg-orange-700 text-white"
                : "text-cyan-900 hover:bg-orange-100"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
}