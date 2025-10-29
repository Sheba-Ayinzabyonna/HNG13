import React, { useEffect, useState } from "react";
import { ticketService, toastEmitter, authService } from "../services";

export default function Tickets({ onNavigate }) {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const user = authService.getUser();

  useEffect(() => {
    if (!user) return onNavigate("login");
    setTickets(ticketService.getAll());
  }, []);

  function handleAdd(e) {
    e.preventDefault();
    if (!title || !desc) return toastEmitter.emit("Please fill all fields", "error");
    ticketService.create({ title, description: desc });
    setTickets(ticketService.getAll());
    setTitle("");
    setDesc("");
    toastEmitter.emit("Ticket created!");
  }

  function handleClose(id) {
    ticketService.close(id);
    setTickets(ticketService.getAll());
    toastEmitter.emit("Ticket closed");
  }

  function handleDelete(id) {
    ticketService.delete(id);
    setTickets(ticketService.getAll());
    toastEmitter.emit("Ticket deleted");
  }

  return (
    <section style={{
      maxWidth: 900,
      margin: "60px auto",
      padding: "40px",
      background: "white",
      borderRadius: 12,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ marginBottom: 20 }}>Tickets</h2>

      <form onSubmit={handleAdd} style={{ marginBottom: 30 }}>
        <input
          placeholder="Ticket Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />
        <textarea
          placeholder="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />
        <button
          type="submit"
          style={{
            background: "#FF6347",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}>
          Add Ticket
        </button>
      </form>

      <div style={{ display: "grid", gap: 16 }}>
        {tickets.length === 0 && <p>No tickets yet.</p>}
        {tickets.map(ticket => (
          <div key={ticket.id} style={{
            padding: 16,
            borderRadius: 8,
            background: "#f8f9fa",
            borderLeft: `6px solid ${ticket.status === "open" ? "#006400" : "#999"}`
          }}>
            <h4>{ticket.title}</h4>
            <p>{ticket.description}</p>
            <p>Status: <strong>{ticket.status}</strong></p>
            {ticket.status === "open" && (
              <button onClick={() => handleClose(ticket.id)} style={{ marginRight: 8 }}>
                Close
              </button>
            )}
            <button onClick={() => handleDelete(ticket.id)} style={{ color: "red" }}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => onNavigate("dashboard")}
        style={{
          marginTop: 40,
          background: "#006400",
          color: "white",
          padding: "12px 30px",
          borderRadius: 6,
          border: "none"
        }}>
        ← Back to Dashboard
      </button>
    </section>
  );
}
