import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/guidePage.module.css";
import VideoSection from "../components/GuidePage/VideoSection";
import StepList from "../components/GuidePage/StepList";
import TipsList from "../components/GuidePage/TipsList";
import STEPS from "../constants/guidePage/Steps";
import TIPS from "../constants/guidePage/Tips";
function GuidePage() {
  return (
    <div className={styles.guidePage}>
      <div className={styles.backgroundAnimation}></div>
      <div className={styles.container}>
        <h1 className={styles.title}>Resume Creation Guide</h1>

        <VideoSection
          title="Video Tutorial"
          videoSrc="https://www.youtube.com/embed/R3abknwWX7k"
        />

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How Our Resume Builder Works</h2>
          <p className={styles.sectionDescription}>
            Our simplified builder focuses on content quality with limited but
            effective styling options:
          </p>
          <StepList steps={STEPS} />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Content Optimization Tips</h2>
          <TipsList tips={TIPS} />
        </section>

        <Link to="/makets" className={styles.startButton}>
          Start Building Your Resume
          <span className={styles.buttonArrow}>→</span>
        </Link>
      </div>
    </div>
  );
}

export default GuidePage;
