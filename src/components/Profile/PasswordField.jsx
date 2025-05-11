import React, { useState } from "react";
import { FiLock } from "react-icons/fi";
import styles from "../../css/profile.module.css";

const PasswordField = ({ isEditing, onChangePassword }) => {
  const [editMode, setEditMode] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    if (!currentPassword) {
      setError("Please enter current password");
      return false;
    }

    if (
      newPassword.length < 8 ||
      !/[A-Z]/.test(newPassword) ||
      !/[a-z]/.test(newPassword)
    ) {
      setError(
        "Password must be at least 8 characters and have capital + regular letter"
      );
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setIsLoading(true);
    setError("");

    try {
      await onChangePassword(currentPassword, newPassword);
      setEditMode(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message || "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <div className={styles.infoItem}>
        <label className={styles.infoLabel}>
          <FiLock className={styles.labelIcon} /> Password
        </label>
        <div className={styles.infoValue}>••••••••</div>
      </div>
    );
  }

  if (!editMode) {
    return (
      <div className={styles.infoItem}>
        <label className={styles.infoLabel}>
          <FiLock className={styles.labelIcon} /> Password
        </label>
        <div className={styles.infoValue}>••••••••</div>
        <button className={styles.saveButton} onClick={() => setEditMode(true)}>
          Change
        </button>
      </div>
    );
  }

  return (
    <div className={styles.infoPassword}>
      <label className={styles.infoLabel}>
        <FiLock className={styles.labelIcon} /> Change Password
      </label>

      <div className={styles.passwordInputs}>
        <input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className={styles.inputFieldPas}
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Password must be at least 8 characters"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={styles.inputFieldPas}
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.inputFieldPas}
          disabled={isLoading}
        />
      </div>

      {error && <div className={styles.errorText}>{error}</div>}

      <div className={styles.passwordActions}>
        <button
          type="button"
          onClick={() => {
            setEditMode(false);
            setError("");
          }}
          className={styles.quit}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className={styles.saveButton}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
