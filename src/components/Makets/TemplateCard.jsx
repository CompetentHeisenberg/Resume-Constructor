import React from "react";
import { Link } from "react-router-dom";
import styles from "../../css/makets.module.css";
import { renderDemoContent } from "../../utils/makets/renderDemoContent";

function TemplateCard({ template }) {
  return (
    <div className={styles.templateCard}>
      <div className={styles.previewContainer}>
        <div
          className={styles.demoContent}
          dangerouslySetInnerHTML={{
            __html: renderDemoContent(template.htmlContent),
          }}
        />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.templateName}>{template.name}</h3>
        <div className={styles.actions}>
          <Link to={`/templates/${template._id}`} className={styles.detailLink}>
            Details
          </Link>
          <Link
            to="/editor"
            state={{ selectedTemplate: template }}
            className={styles.useButton}
          >
            Use this Template
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TemplateCard;
