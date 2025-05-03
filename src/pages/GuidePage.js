import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/guidePage.module.css";

function GuidePage() {
  return (
    <div className={styles.guidePage}>
      <div className={styles.backgroundAnimation}></div>
      <div className={styles.container}>
        <h1 className={styles.title}>Resume Creation Guide</h1>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Video Tutorial</h2>
          <div className={styles.videoWrapper}>
            <iframe
              src="https://www.youtube.com/embed/R3abknwWX7k"
              title="Resume Builder Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How Our Resume Builder Works</h2>
          <p className={styles.sectionDescription}>
            Our simplified builder focuses on content quality with limited but
            effective styling options:
          </p>

          <ol className={styles.stepsList}>
            <li className={styles.stepItem}>
              <div className={styles.stepIcon}>1</div>
              <div>
                <h3 className={styles.stepTitle}>Select a Template</h3>
                <p className={styles.stepDescription}>
                  Choose from our pre-designed professional layouts
                </p>
              </div>
            </li>
            <li className={styles.stepItem}>
              <div className={styles.stepIcon}>2</div>
              <div>
                <h3 className={styles.stepTitle}>Fill in the Fields</h3>
                <p className={styles.stepDescription}>
                  Complete all sections with your professional information
                </p>
              </div>
            </li>
            <li className={styles.stepItem}>
              <div className={styles.stepIcon}>3</div>
              <div>
                <h3 className={styles.stepTitle}>Adjust Basic Styling</h3>
                <p className={styles.stepDescription}>
                  Select font style from predefined options
                </p>
              </div>
            </li>
            <li className={styles.stepItem}>
              <div className={styles.stepIcon}>4</div>
              <div>
                <h3 className={styles.stepTitle}>Download Your Resume</h3>
                <p className={styles.stepDescription}>
                  Export as PDF ready for job applications
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Content Optimization Tips</h2>
          <ul className={styles.tipsList}>
            <li className={styles.tipItem}>
              <h3 className={styles.tipTitle}>Focus on Content Quality</h3>
              <p className={styles.tipDescription}>
                Make your content stand out with clear achievements
              </p>
            </li>
            <li className={styles.tipItem}>
              <h3 className={styles.tipTitle}>Use Sections Wisely</h3>
              <p className={styles.tipDescription}>
                Our templates optimize space automatically
              </p>
            </li>
            <li className={styles.tipItem}>
              <h3 className={styles.tipTitle}>Font Selection Matters</h3>
              <p className={styles.tipDescription}>
                Match fonts to your industry
              </p>
            </li>
          </ul>
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
