const TICKETS_KEY = "ticketapp_tickets_v1"

export function loadTickets() {
  try {
    const raw = localStorage.getItem(TICKETS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

function saveTickets(tickets) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets))
}

export function createTicket({ title, status, description = "" }) {
  if (!title || title.trim() === "") throw new Error("Title is required")
  if (!["open", "in_progress", "closed"].includes(status)) {
    throw new Error("Invalid status")
  }
  const tickets = loadTickets()
  const ticket = { 
    id: Date.now().toString(),
    title, 
    status, 
    description, 
    createdAt: new Date().toISOString() 
  }
  tickets.unshift(ticket)
  saveTickets(tickets)
  return tickets
}

export function updateTicket(id, patch) {
  const tickets = loadTickets()
  const i = tickets.findIndex(t => t.id === id)
  if (i === -1) throw new Error("Ticket not found")
  if (patch.title === "") throw new Error("Title is required")
  if (patch.status && !["open", "in_progress", "closed"].includes(patch.status)) {
    throw new Error("Invalid status")
  }
  tickets[i] = { ...tickets[i], ...patch, updatedAt: new Date().toISOString() }
  saveTickets(tickets)
  return tickets
}

export function deleteTicket(id) {
  const tickets = loadTickets().filter(t => t.id !== id)
  saveTickets(tickets)
  return tickets
}
