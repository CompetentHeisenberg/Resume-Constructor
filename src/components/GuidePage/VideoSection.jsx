import React from "react";
import styles from "../../css/guidePage.module.css";

function VideoSection({ title, videoSrc }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.videoWrapper}>
        <iframe
          src={videoSrc}
          title="Resume Builder Tutorial"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}

export default VideoSection;
