import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/auth.module.css";
import { Link } from "react-router-dom";
import Label from "../components/Label";

function Authentification() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.base}>
      <div className={styles.authMain}>
        <div className={styles.main}>
          <h1 className={styles.title}>Welcome Back</h1>

          {error && (
            <div className={styles.error}>
              <Label text={error}></Label>
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              autoComplete="username"
              required
              disabled={loading}
            />
            <input
              className={styles.input}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="current-password"
              required
              disabled={loading}
            />
            <div className={styles.but}>
              <button
                className={styles.button}
                type="submit"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>

          <div className={styles.footer}>
            <span>Don't have an account?</span>
            <Link to="/registration" className={styles.link}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentification;
