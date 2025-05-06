import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/auth.module.css";
import Label from "../components/Label";
import useLogin from "../hooks/auth/useLogin";

function Authentification() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, loading, error } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className={styles.base}>
      <div className={styles.authMain}>
        <div className={styles.main}>
          <h1 className={styles.title}>Welcome Back</h1>

          {error && (
            <div className={styles.error}>
              <Label text={error} />
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
