import React from "react";
import {
  FiEdit,
  FiSave,
  FiX,
  FiUser,
  FiPhone,
  FiBriefcase,
  FiMail,
  FiAward,
  FiClock,
  FiHome,
} from "react-icons/fi";
import { useProfile } from "../hooks/profile/useProfile";
import styles from "../css/profile.module.css";
import Quit from "../components/Quit";
import { formatDate } from "../utils/profile/formatDate";

const Profile = () => {
  const {
    userData,
    setUserData,
    loading,
    error,
    isEditing,
    setIsEditing,
    successMessage,
    fetchProfile,
    updateProfile,
  } = useProfile();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile({
      fullName: userData.fullName,
      phone: userData.phone,
      position: userData.position,
      company: userData.company,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    fetchProfile();
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>{error}</p>
        <button
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              {userData.fullName
                ? userData.fullName.charAt(0).toUpperCase()
                : "U"}
            </div>
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
            <button className={styles.cancelButton} onClick={handleCancelEdit}>
              <FiX className={styles.buttonIcon} /> Cancel
            </button>
          )}
        </div>

        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}

        <form onSubmit={handleUpdateProfile} className={styles.profileForm}>
          <div className={styles.profileGrid}>
            <div className={styles.leftColumn}>
              <div className={`${styles.profileCard} ${styles.primaryCard}`}>
                <h2 className={styles.sectionTitle}>
                  <FiUser className={styles.sectionIcon} /> Main information
                </h2>

                <div className={styles.infoItem}>
                  <label className={styles.infoLabel}>
                    <FiMail className={styles.labelIcon} /> Email
                  </label>
                  <div className={styles.infoValue}>{userData.email}</div>
                </div>

                <div className={styles.infoItem}>
                  <label className={styles.infoLabel}>
                    <FiUser className={styles.labelIcon} /> Full name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={userData.fullName}
                      onChange={handleInputChange}
                      className={styles.inputField}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className={styles.infoValue}>
                      {userData.fullName || "Not specified"}
                    </div>
                  )}
                </div>

                <div className={styles.infoItem}>
                  <label className={styles.infoLabel}>
                    <FiPhone className={styles.labelIcon} /> Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      className={styles.inputField}
                      placeholder="Enter your phone number"
                      pattern="[+]{0,1}[0-9\s-]+"
                    />
                  ) : (
                    <div className={styles.infoValue}>
                      {userData.phone || "Not specified"}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.rightColumn}>
              <div className={styles.profileCard}>
                <h2 className={styles.sectionTitle}>
                  <FiBriefcase className={styles.sectionIcon} /> Professional
                  information
                </h2>

                <div className={styles.infoItem}>
                  <label className={styles.infoLabel}>
                    <FiAward className={styles.labelIcon} /> Position
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="position"
                      value={userData.position}
                      onChange={handleInputChange}
                      className={styles.inputField}
                      placeholder="Enter your company position"
                    />
                  ) : (
                    <div className={styles.infoValue}>
                      {userData.position || "Not specified"}
                    </div>
                  )}
                </div>

                <div className={styles.infoItem}>
                  <label className={styles.infoLabel}>
                    <FiHome className={styles.labelIcon} /> Company
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="company"
                      value={userData.company}
                      onChange={handleInputChange}
                      className={styles.inputField}
                      placeholder="Enter a name of your company"
                    />
                  ) : (
                    <div className={styles.infoValue}>
                      {userData.company || "Not specified"}
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.profileCard}>
                <h2 className={styles.sectionTitle}>
                  <FiClock className={styles.sectionIcon} /> Activity
                </h2>
                <div className={styles.activityItem}>
                  <Quit style={styles.quit} />
                </div>
                {userData.updatedAt && (
                  <div className={styles.activityItem}>
                    <div className={styles.activityDate}>
                      {formatDate(userData.updatedAt)}
                    </div>
                    <div className={styles.activityText}>
                      You updated your profile information
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className={styles.formActions}>
              <button type="submit" className={styles.saveButton}>
                <FiSave className={styles.buttonIcon} /> Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
