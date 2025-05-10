import React from "react";
import { formatDate } from "../../utils/profile/formatDate";
import Quit from "../Quit";
import styles from "../../css/profile.module.css";
import { FiClock, FiSave } from "react-icons/fi";

const ActivityLog = ({ updatedAt, isEditing }) => (
  <div className={styles.profileCard}>
    <h2 className={styles.sectionTitle}>
      <FiClock className={styles.sectionIcon} /> Activity
    </h2>
    <div className={styles.ActionFlex}>
      {isEditing && (
        <div className={styles.formActions}>
          <button type="submit" className={styles.saveButton}>
            <FiSave className={styles.buttonIcon} /> Save Changes
          </button>
        </div>
      )}
      <div className={styles.formActions}>
        <Quit className={styles.quit} type="button" />
      </div>
    </div>
    {updatedAt && (
      <div className={styles.activityItem}>
        <div className={styles.activityDate}>{formatDate(updatedAt)}</div>
        <div className={styles.activityText}>
          You updated your profile information
        </div>
      </div>
    )}
  </div>
);

export default ActivityLog;
