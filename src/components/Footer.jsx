import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footerBottom}>
      <p>
        &copy; {new Date().getFullYear()} Digital Solutions Inc. All Rights
        Reserved.
      </p>
      <div className={styles.legalLinks}>
        <Link to="https://github.com/CompetentHeisenberg">GitHub</Link>
        <a href="#">Contact Center</a>
        <Link to="/guide">Guide for Resume</Link>
      </div>
    </div>
  );
}
