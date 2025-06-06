import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../css/templatedetail.module.css";
import DEMO_DATA from "../constants/templateDetail/demoData";
import useTemplate from "../hooks/templateDetail/useTemplate";
import renderDemoTemplate from "../utils/templateDetail/renderDemoContent.js";

function TemplateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { template, loading, error } = useTemplate(id);

  const enhancedDemoData = {
    ...DEMO_DATA,
    initials:
      DEMO_DATA.initials ||
      (DEMO_DATA.fullName
        ? DEMO_DATA.fullName
            .split(" ")
            .map((n) => n[0].toUpperCase())
            .join("")
            .substring(0, 2)
        : ""),
    avatar: DEMO_DATA.avatar ? DEMO_DATA.avatar : null,
  };

  const handleUseTemplate = () => {
    navigate("/editor", {
      state: {
        selectedTemplate: {
          ...template,
          defaultValues: enhancedDemoData,
        },
      },
    });
  };

  if (loading) return <div className={styles.loading}>Loading Template...</div>;
  if (error) return <div className={styles.loading}>Error: {error}</div>;
  if (!template)
    return <div className={styles.loading}>Template not found</div>;

  return (
    <div className={styles.templatePage}>
      <div className={styles.container}>
        <div className={styles.templateWrapper}>
          <div className={styles.previewSection}>
            <div
              className={styles.previewContent}
              dangerouslySetInnerHTML={{
                __html: renderDemoTemplate(
                  template.htmlContent,
                  enhancedDemoData
                ),
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
