import React, { useState } from "react";
import { authService, toastEmitter } from "../services";

export default function Signup({ onNavigate }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    if (!form.name) return setErrors({ name: "Name is required" });
    if (!form.email) return setErrors({ email: "Email is required" });
    if (!form.password) return setErrors({ password: "Password is required" });

    try {
      authService.signup(form);
      toastEmitter.emit("Signup successful! Please login.");
      onNavigate("login");
    } catch (err) {
      toastEmitter.emit(err.message, "error");
      setErrors({ form: err.message });
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
      <h2 style={{ marginBottom: 24, textAlign: "center" }}>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Full Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} style={{ width: "100%" }} />
          {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} style={{ width: "100%" }} />
          {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} style={{ width: "100%" }} />
          {errors.password && <small style={{ color: "red" }}>{errors.password}</small>}
        </div>
        {errors.form && <div style={{ color: "red" }}>{errors.form}</div>}
        <button type="submit" style={{ width: "100%", background: "#FF6347", color: "white", padding: 14, borderRadius: 6 }}>
          Sign Up
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: 20 }}>
        Already have an account?{" "}
        <button onClick={() => onNavigate("login")} style={{ background: "none", border: "none", color: "#006400" }}>
          Login
        </button>
      </p>
    </section>
  );
}
