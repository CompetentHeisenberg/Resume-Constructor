import React from "react";
import style from "../css/reg.module.css";
import Input from "../components/InputReg";
import Label from "../components/Label";
import RegButton from "../components/RegButton";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/registration/useRegister";

function Registration() {
  const { formData, handleChange, handleSubmit, error, loading } =
    useRegister();

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
            <RegButton style={style.button} type="submit" disabled={loading}>
              {loading ? "Processing..." : "Start Journey"}
            </RegButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
