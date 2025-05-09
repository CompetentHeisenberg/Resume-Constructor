import React from "react";
import { FiEdit, FiX, FiHome } from "react-icons/fi";
import styles from "../../css/profile.module.css";

const ProfileHeaderWithAvatar = ({
  userData,
  isEditing,
  setIsEditing,
  handleAvatarChange,
  setUserData,
}) => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.avatarContainer}>
        {userData.avatar ? (
          <img
            src={userData.avatar}
            alt="Avatar"
            className={styles.avatarImage}
          />
        ) : (
          <div className={styles.avatar}>
            {userData.fullName
              ? userData.fullName.charAt(0).toUpperCase()
              : "U"}
          </div>
        )}

        {isEditing && (
          <div className={styles.buttonsCont}>
            <label className={styles.fileInputLabel}>
              Choose Avatar
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className={styles.hiddenFileInput}
              />
            </label>
            {userData.avatar && (
              <button
                type="button"
                onClick={() =>
                  setUserData((prev) => ({
                    ...prev,
                    avatar: null,
                    avatarFile: null,
                  }))
                }
                className={styles.deleteAvatarButton}
              >
                Delete Avatar
              </button>
            )}
          </div>
        )}
      </div>

      <div className={styles.headerContent}>
        <h1 className={styles.profileTitle}>
          {userData.fullName || userData.email}
        </h1>
        <p className={styles.profileSubtitle}>{userData.position}</p>
        {userData.company && (
          <p className={styles.company}>
            <FiHome className={styles.icon} /> {userData.company}
          </p>
        )}
      </div>

      {!isEditing ? (
        <button
          className={styles.editButton}
          onClick={() => setIsEditing(true)}
        >
          <FiEdit className={styles.buttonIcon} /> Edit
        </button>
      ) : (
        <button
          className={styles.cancelButton}
          onClick={() => setIsEditing(false)}
        >
          <FiX className={styles.buttonIcon} /> Cancel
        </button>
      )}
    </div>
  );
};

export default ProfileHeaderWithAvatar;
