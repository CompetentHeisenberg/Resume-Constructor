import React from "react";
import style from "../css/auth.module.css";
import InputReg from "../components/InputReg";
import Button from "../components/RegButton";
import { useNavigate } from "react-router-dom";

function Authentification() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={style.base}>
      <div className={style.authMain}>
        <div className={style.main}>
          <h1 className={style.title}>Welcome Back</h1>
          {error && <div className={style.error}>{error}</div>}{" "}
          <form className={style.form} onSubmit={handleSubmit}>
            <InputReg
              style={style.input}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              help="Email"
            />
            <InputReg
              style={style.input}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              help="Password"
            />
            <div className={style.but}>
              <Button style={style.button} type="submit">
                Sign In
              </Button>
            </div>
          </form>
          <div className={style.footer}>
            <span>Don't have an account?</span>
            <a href="#" className={style.link}>
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentification;
