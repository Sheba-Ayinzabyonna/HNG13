import React, { useState } from "react";
import { authService, toastEmitter } from "../services";

export default function Login({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    if (!email) return setErrors({ email: "Email is required" });
    if (!password) return setErrors({ password: "Password is required" });

    try {
      authService.login({ email, password });
      toastEmitter.emit("Login successful!");
      onNavigate("dashboard");
    } catch (err) {
      setErrors({ form: err.message });
      toastEmitter.emit(err.message, "error");
    }
  }

  return (
    <section style={{
      maxWidth: 500,
      margin: "60px auto",
      padding: "40px",
      background: "white",
      borderRadius: 12,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ marginBottom: 24, textAlign: "center" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%" }} />
          {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%" }} />
          {errors.password && <small style={{ color: "red" }}>{errors.password}</small>}
        </div>
        {errors.form && <div style={{ color: "red" }}>{errors.form}</div>}
        <button type="submit" style={{ width: "100%", background: "#006400", color: "white", padding: 14, borderRadius: 6 }}>
          Login
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: 20 }}>
        Don’t have an account?{" "}
        <button onClick={() => onNavigate("signup")} style={{ background: "none", border: "none", color: "#006400" }}>
          Sign up
        </button>
      </p>
    </section>
  );
}
