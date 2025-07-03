import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Tickets() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [registrationId, setRegistrationId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);
  const [phone, setPhone] = useState("");
  const [paying, setPaying] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/api/events/${eventId}/`)
      .then(res => res.json())
      .then(data => setEvent(data));
  }, [eventId]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/registrations/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: eventId,
        name,
        email,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setRegistrationId(data.id);
      setRegistered(true);
    } else {
      alert("Registration failed.");
    }
  };

  const handleMpesaPay = async () => {
    setPaying(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:8000/api/mpesa/pay/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: eventId,
          registration: registrationId,
          phone: phone,
          amount: event.ticket,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Payment initiated. Check your phone.");
      } else {
        setMessage(data.error || "Payment failed. Try again.");
      }
    } catch (err) {
      setMessage("Network error. Try again.");
    }
    setPaying(false);
  };

  if (!event) return <p>Loading event...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Register for {event.title}</h1>
      <p className="mb-2">{event.date} at {event.time} &middot; {event.location}</p>
      <p className="mb-4">{event.description}</p>
      {!registered ? (
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-cyan-900 hover:bg-orange-700 text-white px-4 py-2 rounded font-semibold"
          >
            Register
          </button>
        </form>
      ) : (
        <>
   <p className="mb-4 font-bold text-cyan-900">
  Ticket Price: {["0", 0, "Free", "", null, undefined].includes(event.ticket) ? "Free" : `Ksh ${event.ticket}`}
</p>
{!["0", 0, "Free", "", null, undefined].includes(event.ticket) ? (
  <>
    <input
      type="text"
      placeholder="M-Pesa Phone Number"
      value={phone}
      onChange={e => setPhone(e.target.value)}
      className="border px-2 py-1 rounded mb-2 w-full"
    />
    <button
      onClick={handleMpesaPay}
      disabled={paying}
      className="bg-green-600 text-white px-4 py-2 rounded w-full"
    >
      {paying ? "Processing..." : "Pay with Mpesa"}
    </button>
    {message && <div className="mt-2 text-blue-700">{message}</div>}
  </>
) : (
<div className="text-green-700 font-semibold">This event is free. No payment required!</div>
      )}
  </>
    )}
    </div>
    );
  }