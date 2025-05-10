import React from "react";
import styles from "../../css/profile.module.css";

const TextAreaField = ({
  icon: Icon,
  label,
  value,
  name,
  isEditing,
  onChange,
  placeholder,
  rows = 5,
}) => (
  <div className={styles.infoItem}>
    <label className={styles.infoLabel}>
      {Icon && <Icon className={styles.labelIcon} />} {label}
    </label>
    {isEditing ? (
      <textarea
        name={name}
        value={value || ""}
        onChange={onChange}
        className={styles.textAreaInput}
        placeholder={placeholder}
        rows={rows}
      />
    ) : (
      <div className={styles.infoValue}>{value || "Not specified"}</div>
    )}
  </div>
);

export default TextAreaField;
