const SESSION_KEY = "ticketapp_session"

export function setSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function getSession() {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY))
    if (session && session.expiry > Date.now()) return session
    clearSession()
    return null
  } catch (e) {
    return null
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function login({ email, password }) {
  if (email === "test@user.com" && password === "password123") {
    const session = { 
      token: "tkn_" + Date.now(), 
      user: email, 
      expiry: Date.now() + 1000 * 60 * 60 
    }
    setSession(session)
    return session
  }
  throw new Error("Invalid credentials")
}

export function signup({ email, password }) {
  if (!email || !password || password.length < 6) {
    throw new Error("Email required and password must be >= 6 characters")
  }
  const session = { 
    token: "tkn_" + Date.now(), 
    user: email, 
    expiry: Date.now() + 1000 * 60 * 60 
  }
  setSession(session)
  return session
}