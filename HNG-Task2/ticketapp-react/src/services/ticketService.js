// src/services/ticketService.js

const TICKETS_KEY = "ticketapp_tickets_v1";

export const ticketService = {
  // -------------------------
  // Core Methods
  // -------------------------

  loadTickets() {
    try {
      const raw = localStorage.getItem(TICKETS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveTickets(tickets) {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
    return tickets;
  },

  createTicket({ title, status, description = "" }) {
    if (!title.trim()) throw new Error("Title is required");
    if (!["open", "in_progress", "closed"].includes(status))
      throw new Error("Invalid status");

    const tickets = this.loadTickets();
    const id = Date.now().toString();
    const ticket = {
      id,
      title,
      status,
      description,
      createdAt: new Date().toISOString(),
    };

    tickets.unshift(ticket);
    return this.saveTickets(tickets);
  },

  updateTicket(id, patch) {
    const tickets = this.loadTickets();
    const i = tickets.findIndex((t) => t.id === id);
    if (i === -1) throw new Error("Ticket not found");
    if (patch.title === "") throw new Error("Title is required");
    if (patch.status && !["open", "in_progress", "closed"].includes(patch.status))
      throw new Error("Invalid status");

    tickets[i] = {
      ...tickets[i],
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    return this.saveTickets(tickets);
  },

  deleteTicket(id) {
    const tickets = this.loadTickets().filter((t) => t.id !== id);
    return this.saveTickets(tickets);
  },

  // -------------------------
  // Alias Methods (for convenience)
  // -------------------------

  getAll() {
    return this.loadTickets();
  },

  getById(id) {
    return this.loadTickets().find((t) => t.id === id) || null;
  },

  add(data) {
    return this.createTicket(data);
  },

  update(id, patch) {
    return this.updateTicket(id, patch);
  },

  remove(id) {
    return this.deleteTicket(id);
  },

  clearAll() {
    localStorage.removeItem(TICKETS_KEY);
    return [];
  },
};
