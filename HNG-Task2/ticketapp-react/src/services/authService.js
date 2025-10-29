const SESSION_KEY = "ticketapp_session";

export const authService = {
  setSession(session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  },
  getSession() {
    try {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY));
      if (session && session.expiry > Date.now()) return session;
      this.clearSession();
      return null;
    } catch {
      return null;
    }
  },
  clearSession() {
    localStorage.removeItem(SESSION_KEY);
  },
  login({ email, password }) {
    if (email === "test@user.com" && password === "password123") {
      const session = { token: "tkn_" + Date.now(), user: email, expiry: Date.now() + 1000 * 60 * 60 };
      this.setSession(session);
      return session;
    }
    throw new Error("Invalid credentials");
  },
  signup({ email, password }) {
    if (!email || !password || password.length < 6)
      throw new Error("Email required and password must be >= 6 characters");
    const session = { token: "tkn_" + Date.now(), user: email, expiry: Date.now() + 1000 * 60 * 60 };
    this.setSession(session);
    return session;
  },
  // ✅ Add this:
  getUser() {
    const session = this.getSession();
    return session ? session.user : null;
  }
};
