import React, { useState, useEffect } from "react";
import ResumePreview from "./ResumePreview";
import { useLocation } from "react-router-dom";
import styles from "../css/resumeEditor.module.css";

const ResumeEditor = () => {
  const { state } = useLocation();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    education: "",
    projects: "",
    languages: "",
    skills: "",
  });

  const [rawData, setRawData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    education: "",
    projects: "",
    languages: "",
    skills: "",
  });

  const convertHtmlToText = (html) => {
    if (!html) return "";
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  const convertTextToHtml = (text) => {
    if (!text) return "";
    return text
      .replace(/\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // **text** -> bold
      .replace(/\*(.*?)\*/g, "<em>$1</em>"); // *text* -> cursive
  };

  useEffect(() => {
    if (state?.selectedTemplate?.defaultValues) {
      const templateData = state.selectedTemplate.defaultValues;
      setFormData(templateData);

      const plainTextData = {};
      Object.keys(templateData).forEach((key) => {
        plainTextData[key] = convertHtmlToText(templateData[key]);
      });

      setRawData(plainTextData);
    }
  }, [state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setRawData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: convertTextToHtml(value),
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2 className={styles.title}>Editing Resume</h2>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Main Information</h3>
          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input
              name="fullName"
              value={rawData.fullName}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Example: John Smith"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Position</label>
            <input
              name="position"
              value={rawData.position}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Example: Frontend Developer"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              name="email"
              value={rawData.email}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="your@email.com"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Phone</label>
            <input
              name="phone"
              value={rawData.phone}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="+XXX XX XXX XX XX"
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Professional Information</h3>

          <div className={styles.inputGroup}>
            <label>Years of Expirience</label>
            <textarea
              name="experience"
              value={rawData.experience}
              onChange={handleInputChange}
              className={styles.textarea}
              placeholder={`Example:\nCompany "TechSolutions" (2020-2023)\nFrontend Developer\n- Developing SPA app's\n- Productivity Optimisation`}
              rows={6}
            />
            <div className={styles.hint}>
              Use Enter for a new line. For bold text: **text**
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Education</label>
            <textarea
              name="education"
              value={rawData.education}
              onChange={handleInputChange}
              className={styles.textarea}
              placeholder={`Example:\nKyiv University (2015-2019)\nBachelor of Computer Science`}
              rows={4}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Additional Information</h3>

          <div className={styles.inputGroup}>
            <label>Projects</label>
            <textarea
              name="projects"
              value={rawData.projects}
              onChange={handleInputChange}
              className={styles.textarea}
              placeholder={`Example:\nWeb-Store (React/Node.js)\n- Developing UI components\n- Integration with API`}
              rows={5}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Skills</label>
            <textarea
              name="skills"
              value={rawData.skills}
              onChange={handleInputChange}
              className={styles.textarea}
              placeholder="Example: JavaScript, React, HTML/CSS, Git"
              rows={3}
            />
            <div className={styles.hint}>
              Separate with commas to create a list
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Languages</label>
            <textarea
              name="languages"
              value={rawData.languages}
              onChange={handleInputChange}
              className={styles.textarea}
              placeholder="Example: Ukrainian (native), English (B2)"
              rows={2}
            />
          </div>
        </div>
      </div>

      <ResumePreview data={formData} template={state?.selectedTemplate || {}} />
    </div>
  );
};

export default ResumeEditor;
