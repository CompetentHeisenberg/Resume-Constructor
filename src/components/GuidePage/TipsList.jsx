import React from "react";
import styles from "../../css/guidePage.module.css";

function TipsList({ tips }) {
  return (
    <ul className={styles.tipsList}>
      {tips.map((tip, index) => (
        <li key={index} className={styles.tipItem}>
          <h3 className={styles.tipTitle}>{tip.title}</h3>
          <p className={styles.tipDescription}>{tip.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default TipsList;
