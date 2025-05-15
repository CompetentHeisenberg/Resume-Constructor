import React from "react";
import styles from "../../css/resumeEditor.module.css";

const ResumeAnalysisPopup = ({ results, onClose }) => {
  const typeColors = {
    error: "#ffebee",
    warning: "#fff8e1",
    suggestion: "#e8f5e9",
    note: "#e3f2fd",
    success: "#e8f5e9",
  };

  const typeIcons = {
    error: "Error: ",
    warning: "Warning: ",
    suggestion: "Suggestion: ",
    note: "Note: ",
    success: "Sucess: ",
  };

  return (
    <div className={styles.analysisPopup}>
      <h3>Resume Analysis Report</h3>
      <div className={styles.analysisResults}>
        {results.map((item, idx) => (
          <div
            key={idx}
            className={styles.analysisItem}
            style={{ backgroundColor: typeColors[item.type] }}
          >
            <div className={styles.analysisItemHeader}>
              <span className={styles.analysisIcon}>
                {typeIcons[item.type]}
              </span>
              <strong>{item.section}:</strong>
            </div>
            <p className={styles.analysisMessage}>{item.message}</p>
          </div>
        ))}
      </div>
      <button onClick={onClose} className={styles.closeButton}>
        Close
      </button>
    </div>
  );
};

export default ResumeAnalysisPopup;
