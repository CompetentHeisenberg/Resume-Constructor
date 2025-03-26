import React, { useState } from "react";
import style from "../css/reg.module.css";
import Input from "../components/InputReg";
import Label from "../components/Label";
import { Link } from "react-router-dom";
import Button from "../components/RegButton";

function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // Додати состояние для помилок

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Сброс помилки

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Реєстрація успешна!");
      } else {
        setError(data.message || "Непонятна помилка");
      }
    } catch (error) {
      setError("Ошибка подключення до серверу");
    }
  };

  return (
    <div className={style.mainBackground}>
      <div className={style.background}>
        <div className={style.leftpanel}>
          <img src="/home-office.jpg" alt="office" />
          <div className={style.leftdown}>
            <img src="/original.png" alt="office" />
            <label className={style.label}>Resume Construct</label>
          </div>
        </div>
        <div className={style.rightpanel}>
          <div className={style.regblock}>
            <div className={style.welcome}>
              <Label style={style.welcomelabel} text="Welcome" />
              <div>
                <Label
                  style={style.labelunderwelcome}
                  text="Create account, if you have already"
                />
                <div>
                  <Link to="/auth" className={style.link}>
                    Login
                  </Link>
                </div>
              </div>
            </div>
            <form className={style.dani} onSubmit={handleSubmit}>
              <Input
                style={style.input}
                help="Full name:"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
              />
              <Input
                style={style.input}
                help="Email:"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                style={style.input}
                help="Password:"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              {error && <div className={style.error}>{error}</div>}{" "}
              {/* Показ помилки буде тута */}
              <div className={style.buttondiv}>
                <Button style={style.button} type="submit">
                  Start Journey
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
