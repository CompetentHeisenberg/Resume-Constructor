import React, { useState, useEffect } from "react";
import ResumePreview from "./ResumePreview";
import { useLocation } from "react-router-dom";
import styles from "../css/resumeEditor.module.css";

const ResumeEditor = () => {
  const { state } = useLocation();
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
  };

  const [rawData, setRawData] = useState(initialData);

  const convertTextToHtml = (text) => {
    if (!text) return "";
    return text
      .replace(/\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");
  };

  const convertHtmlToText = (html) => {
    if (!html) return "";
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  useEffect(() => {
    if (state?.selectedTemplate?.defaultValues) {
      const templateData = state.selectedTemplate.defaultValues;
      const plainTextData = {};

      for (const key in templateData) {
        plainTextData[key] = convertHtmlToText(templateData[key]);
      }

      setRawData(plainTextData);
    }
  }, [state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRawData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDataImported = (importedData) => {
    const plainTextData = {};
    for (const key in importedData) {
      plainTextData[key] = convertHtmlToText(importedData[key]);
    }
    setRawData(plainTextData);
  };

  const formData = {};
  for (const key in rawData) {
    formData[key] = convertTextToHtml(rawData[key]);
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2 className={styles.title}>Edit Resume</h2>
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Main Information</h3>

          {["fullName", "position", "email", "phone"].map((field) => (
            <div className={styles.inputGroup} key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
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
            <label>Work Experience</label>
            <textarea
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
            <label>Education</label>
            <textarea
              name="education"
              value={rawData.education}
              onChange={handleInputChange}
              className={styles.textarea}
              rows={4}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Additional Information</h3>

          {["projects", "skills", "languages"].map((field) => (
            <div className={styles.inputGroup} key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <textarea
                name={field}
                value={rawData[field]}
                onChange={handleInputChange}
                className={styles.textarea}
                rows={field === "projects" ? 5 : 2}
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
        template={state?.selectedTemplate || {}}
        onDataImported={handleDataImported}
      />
    </div>
  );
};

export default ResumeEditor;
