import React from "react";
import styles from "../../css/profile.module.css";

const InfoField = ({
  icon: Icon,
  label,
  value,
  name,
  isEditing,
  onChange,
  placeholder,
  type = "text",
}) => (
  <div className={styles.infoItem}>
    <label className={styles.infoLabel}>
      <Icon className={styles.labelIcon} /> {label}
    </label>
    {isEditing ? (
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        className={styles.inputField}
        placeholder={placeholder}
      />
    ) : (
      <div className={styles.infoValue}>{value || "Not specified"}</div>
    )}
  </div>
);

export default InfoField;
