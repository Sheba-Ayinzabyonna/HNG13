// src/services/index.js

// Import each service file
import { authService } from "./authService";
import { ticketService } from "./ticketService";

// Optional: simple toast emitter (if not already created elsewhere)
export const toastEmitter = {
  emit(message, type = "success") {
    // Basic toast mock — you can replace this with something like react-toastify
    console.log(`[${type.toUpperCase()}] ${message}`);
    alert(message);
  },
};

// Export all services together
export {
  authService,
  ticketService as ticketService, // renamed for clarity if your code expects ticketService
};
