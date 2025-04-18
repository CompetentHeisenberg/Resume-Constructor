import React, { useState } from "react";
import style from "../css/reg.module.css";
import Input from "../components/InputReg";
import Label from "../components/Label";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/RegButton";

function Registration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (
      formData.password.length > 7 &&
      /[A-Z]/.test(formData.password) &&
      /[a-z]/.test(formData.password) &&
      /\d/.test(formData.password)
    ) {
      try {
        const response = await fetch("http://localhost:3001/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.fullName.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Registration failed");
        }

        // Сохраняємо токен и перенаправляємо
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } catch (error) {
        setError(error.message || "Registration error");
      } finally {
        setLoading(false);
      }
    } else {
      setError("You must match password requirements");
      setLoading(false);
    }
  };

  return (
    <div className={style.mainBackground}>
      <div className={style.background}>
        <div className={style.leftpanel}>
          <div className={style.imageContainer}>
            <img src="/home-office.jpg" alt="Home Office" />
            <div className={style.imageOverlay}>
              <h1 className={style.imageTitle}>Resume Construct</h1>
              <p className={style.imageSubtitle}>
                A convenient service for creating your own resume
              </p>
            </div>
          </div>
          <div className={style.leftadd}>
            <Label
              style={style.leftTextDown}
              text="Want to check out service without registration?"
            />
            <Link className={style.leftaddlink} to="/">
              Click Here
            </Link>
          </div>
        </div>
        <div className={style.rightpanel}>
          <div className={style.welcome}>
            <Label style={style.welcomelabel} text="Welcome" />
          </div>
          <div className={style.underwelcomeblock}>
            <Label
              style={style.labelunderwelcome}
              text="Are you ready to the next step towards a succesfull future?"
            />
            <Label
              style={style.labelunderwelcome1}
              text="Create account, if you have already"
            />
            <Link to="/auth" className={style.link}>
              Login
            </Link>
          </div>
          <form className={style.dani} onSubmit={handleSubmit}>
            <Input
              style={style.input}
              help="Full name:"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              disabled={loading}
            />
            <Input
              style={style.input}
              help="Your Email:"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
            <Input
              style={style.input}
              help="Password:"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            {error && (
              <div className={style.error}>
                <Label text={error} className={style.error} />
              </div>
            )}
            <Button style={style.button} type="submit" disabled={loading}>
              {loading ? "Processing..." : "Start Journey"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
