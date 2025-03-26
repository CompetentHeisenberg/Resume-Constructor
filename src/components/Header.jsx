import React from "react";
import hstyle from "../css/header.module.css";
import Label from "../components/Label";
import { Link } from "react-router-dom";
export default function Header(props) {
  const style = props.style;
  return (
    <header className={`${style} ${hstyle.main}`}>
      <div className={hstyle.left}>
        <div className={hstyle.down}>
          <img src="/original.png" alt="office" />
        </div>
        <Label style={hstyle.lab} text={"Resume Construct"}></Label>
      </div>
      <div className={hstyle.center}></div>
      <div className={hstyle.right}>
        <Link className={hstyle.link} to="/makets">
          Makets
        </Link>
        <Link className={hstyle.link} to="/profile">
          Profile
        </Link>
        <div className={hstyle.center1}></div>
        <Link className={hstyle.link1} to="/registration">
          Registration
        </Link>
        <Link className={hstyle.link1} to="/auth">
          Autorisation
        </Link>
      </div>
    </header>
  );
}
