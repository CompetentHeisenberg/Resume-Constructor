import React from "react";
import {
  FiUser,
  FiPhone,
  FiBriefcase,
  FiMail,
  FiAward,
  FiHome,
  FiSave,
} from "react-icons/fi";
import { useProfile } from "../hooks/profile/useProfile";
import imageCompression from "browser-image-compression";
import styles from "../css/profile.module.css";

import ProfileHeaderWithAvatar from "../components/Profile/ProfileHeaderWithAvatar";
import InfoField from "../components/Profile/InfoField";
import ActivityLog from "../components/Profile/ActivityLog";

const Profile = () => {
  const {
    userData,
    setUserData,
    loading,
    error,
    isEditing,
    setIsEditing,
    successMessage,
    updateProfile,
  } = useProfile();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File size should be less than 2MB");
      return;
    }

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 200,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          avatar: reader.result,
          avatarFile: compressedFile,
        }));
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const formData = {
      fullName: userData.fullName,
      phone: userData.phone,
      position: userData.position,
      company: userData.company,
    };

    if (userData.avatarFile) {
      formData.avatarFile = userData.avatarFile;
    } else if (userData.avatar && typeof userData.avatar === "string") {
      formData.avatarBase64 = userData.avatar;
    } else {
      formData.removeAvatar = true;
    }

    updateProfile(formData);
  };

  if (!userData) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>Please log in to view your profile.</p>
      </div>
    );
  }

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
        <ProfileHeaderWithAvatar
          userData={userData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleAvatarChange={handleAvatarChange}
          setUserData={setUserData}
        />

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

                <InfoField
                  label="Full name"
                  name="fullName"
                  value={userData.fullName}
                  icon={FiUser}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />

                <InfoField
                  label="Phone"
                  name="phone"
                  value={userData.phone}
                  icon={FiPhone}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  type="tel"
                  pattern="[+]{0,1}[0-9\s-]+"
                />
              </div>
            </div>

            <div className={styles.rightColumn}>
              <div className={styles.profileCard}>
                <h2 className={styles.sectionTitle}>
                  <FiBriefcase className={styles.sectionIcon} /> Professional
                  information
                </h2>

                <InfoField
                  label="Position"
                  name="position"
                  value={userData.position}
                  icon={FiAward}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                  placeholder="Enter your company position"
                />

                <InfoField
                  label="Company"
                  name="company"
                  value={userData.company}
                  icon={FiHome}
                  isEditing={isEditing}
                  onChange={handleInputChange}
                  placeholder="Enter a name of your company"
                />
              </div>

              <ActivityLog updatedAt={userData.updatedAt} />
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
