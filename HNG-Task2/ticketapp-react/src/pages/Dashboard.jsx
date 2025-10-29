import React, { useEffect, useState } from "react";
import { authService, ticketService } from "../services";

export default function Dashboard({ onNavigate }) {
  const [tickets, setTickets] = useState([]);
  const user = authService.getUser();

  useEffect(() => {
    if (!user) return onNavigate("login");
    setTickets(ticketService.getAll());
  }, []);

  const total = tickets.length;
  const open = tickets.filter(t => t.status === "open").length;
  const closed = tickets.filter(t => t.status === "closed").length;

  return (
    <section style={{
      maxWidth: 900,
      margin: "60px auto",
      padding: "40px",
      background: "white",
      borderRadius: 12,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ marginBottom: 20 }}>Welcome, {user?.name || "User"}</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 20,
        marginBottom: 40
      }}>
        <div style={{ background: "#006400", color: "white", padding: 20, borderRadius: 10 }}>
          <h3>Total Tickets</h3>
          <p style={{ fontSize: 28 }}>{total}</p>
        </div>
        <div style={{ background: "#FF6347", color: "white", padding: 20, borderRadius: 10 }}>
          <h3>Open</h3>
          <p style={{ fontSize: 28 }}>{open}</p>
        </div>
        <div style={{ background: "#ccc", color: "black", padding: 20, borderRadius: 10 }}>
          <h3>Closed</h3>
          <p style={{ fontSize: 28 }}>{closed}</p>
        </div>
      </div>

      <button
        onClick={() => onNavigate("tickets")}
        style={{
          background: "#006400",
          color: "white",
          padding: "14px 30px",
          borderRadius: 6,
          border: "none",
          cursor: "pointer"
        }}>
        Manage Tickets
      </button>
    </section>
  );
}
