import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import ResumePreview from "./ResumePreview";
import styles from "../css/resumeEditor.module.css";
import { convertTextToHtml } from "../utils/resumeEditor/formatters.js";
import { useResumeData } from "../hooks/resumeEditor/useResumeData";
import { mainFields, additionalFields } from "../constants/resumeEditor/fields";
import ResumeAnalysisPopup from "../components/ResumeEditor/ResumeAnalysisPopup";
import { useResumeAnalysis } from "../hooks/resumeEditor/useResumeAnalysis";
import Button from "../components/Button.jsx";

const initialData = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  experience: "",
  education: "",
  projects: "",
  languages: "",
  skills: "",
  avatar: "",
};

const ResumeEditor = () => {
  const { state } = useLocation();
  const templateData = state?.selectedTemplate?.defaultValues;
  const fileInputRef = useRef(null);
  const { rawData, handleInputChange, importData } = useResumeData(
    initialData,
    templateData
  );
  const { analyze, analysisResult, showAnalysis, setShowAnalysis } =
    useResumeAnalysis(rawData);

  const formData = {
    ...rawData,
    initials:
      rawData.initials ||
      (rawData.fullName
        ? rawData.fullName
            .split(" ")
            .map((n) => n[0].toUpperCase())
            .join("")
            .substring(0, 2)
        : ""),
  };

  for (const key in rawData) {
    if (key !== "avatar") {
      formData[key] = convertTextToHtml(rawData[key]);
    }
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleInputChange({
          target: {
            name: "avatar",
            value: event.target.result,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2 className={styles.title}>Edit Resume</h2>
        <div className={styles.analyzeFlex}>
          <Button onClick={analyze} className={styles.analysisButton}>
            Analyze your Resume
          </Button>
        </div>
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Profile Photo</h3>
          <div className={styles.inputGroup}>
            <label className={styles.avatarUploadLabel}>
              <span className={styles.avatarUploadText}>
                {rawData.avatar ? "Change avatar" : "Upload avatar"}
              </span>
              <input
                type="file"
                id="avatar"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className={styles.avatarInput}
              />
            </label>

            <div className={styles.avatarPreviewContainer}>
              {rawData.avatar ? (
                <img
                  src={rawData.avatar}
                  className={styles.avatarPreview}
                  alt=""
                />
              ) : (
                <div className={styles.containerBase}>
                  <div>👤</div>
                  <div>No photo selected</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Main Information</h3>
          {mainFields.map((field) => (
            <div className={styles.inputGroup} key={field}>
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                name={field}
                value={rawData[field]}
                onChange={handleInputChange}
                className={styles.input}
                placeholder={field === "email" ? "your@email.com" : ""}
              />
            </div>
          ))}
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Professional Information</h3>

          <div className={styles.inputGroup}>
            <label htmlFor="experience">Work Experience</label>
            <textarea
              id="experience"
              name="experience"
              value={rawData.experience}
              onChange={handleInputChange}
              className={styles.textarea}
              rows={6}
              placeholder="Example:\nCompany (2020-2023)..."
            />
            <div className={styles.hint}>
              Use Enter for new line. For bold: **text**, for italic: *text*
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="education">Education</label>
            <textarea
              id="education"
              name="education"
              value={rawData.education}
              onChange={handleInputChange}
              className={styles.textarea}
              rows={4}
              placeholder="University Name, Degree, Year"
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Additional Information</h3>
          {additionalFields.map((field) => (
            <div className={styles.inputGroup} key={field}>
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <textarea
                id={field}
                name={field}
                value={rawData[field]}
                onChange={handleInputChange}
                className={styles.textarea}
                rows={field === "projects" ? 5 : 2}
                placeholder={
                  field === "skills"
                    ? "JavaScript, React, Node.js"
                    : field === "languages"
                    ? "English (Fluent), Spanish (Basic)"
                    : ""
                }
              />
              {field === "skills" && (
                <div className={styles.hint}>
                  Separate with commas to create a bullet list
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <ResumePreview
        data={formData}
        template={{
          ...state?.selectedTemplate,
          defaultValues: {
            ...state?.selectedTemplate?.defaultValues,
            avatar: rawData.avatar,
          },
        }}
        onDataImported={importData}
      />

      {showAnalysis && (
        <ResumeAnalysisPopup
          results={analysisResult}
          onClose={() => setShowAnalysis(false)}
        />
      )}
    </div>
  );
};

export default ResumeEditor;
