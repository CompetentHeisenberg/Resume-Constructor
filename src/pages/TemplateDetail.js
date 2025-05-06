import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../css/templatedetail.module.css";
import DEMO_DATA from "../constants/templateDetail/demoData";
import useTemplate from "../hooks/templateDetail/useTemplate";
import renderDemoTemplate from "../utils/templateDetail/renderDemoContent.js";

function TemplateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { template, loading } = useTemplate(id);

  const handleUseTemplate = () => {
    navigate("/editor", {
      state: {
        selectedTemplate: {
          ...template,
          defaultValues: { ...DEMO_DATA },
        },
      },
    });
  };

  if (loading)
    return (
      <div className={styles.loading}>
        <p>Loading Template...</p>
      </div>
    );

  if (!template)
    return (
      <div className={styles.loading}>
        <p>Cannot load Template</p>
      </div>
    );

  return (
    <div className={styles.templatePage}>
      <div className={styles.container}>
        <div className={styles.templateWrapper}>
          <div className={styles.previewSection}>
            <div
              className={styles.previewContent}
              dangerouslySetInnerHTML={{
                __html: renderDemoTemplate(template.htmlContent, DEMO_DATA),
              }}
            />
          </div>
          <div className={styles.actionsSection}>
            <button onClick={handleUseTemplate} className={styles.useButton}>
              Use this Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateDetail;
