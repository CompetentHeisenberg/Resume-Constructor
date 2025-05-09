import React from "react";
import styles from "../../css/guidePage.module.css";

function StepList({ steps }) {
  return (
    <ol className={styles.stepsList}>
      {steps.map((step, index) => (
        <li key={index} className={styles.stepItem}>
          <div className={styles.stepIcon}>{index + 1}</div>
          <div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default StepList;
