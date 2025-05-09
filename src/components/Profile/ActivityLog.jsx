import React from "react";
import { formatDate } from "../../utils/profile/formatDate";
import Quit from "../Quit";
import styles from "../../css/profile.module.css";
import { FiClock } from "react-icons/fi";
const ActivityLog = ({ updatedAt }) => (
  <div className={styles.profileCard}>
    <h2 className={styles.sectionTitle}>
      <FiClock className={styles.sectionIcon} /> Activity
    </h2>
    <div className={styles.activityItem}>
      <Quit style={styles.quit} />
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
