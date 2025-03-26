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
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // **текст** -> жирний
      .replace(/\*(.*?)\*/g, "<em>$1</em>"); // *текст* -> курсив
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
        <h2 className={styles.title}>Редагування резюме</h2>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Основна інформація</h3>
          <div className={styles.inputGroup}>
            <label>Повне ім'я</label>
            <input
              name="fullName"
              value={rawData.fullName}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Наприклад: Іван Іванов"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Позиція</label>
            <input
              name="position"
              value={rawData.position}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Наприклад: Frontend Developer"
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
            <label>Телефон</label>
            <input
              name="phone"
              value={rawData.phone}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="+380 XX XXX XX XX"
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Професійна інформація</h3>

          <div className={styles.inputGroup}>
            <label>Досвід роботи</label>
            <textarea
              name="experience"
              value={rawData.experience}
              onChange={handleInputChange}
              className={styles.textarea}
              placeholder={`Приклад:\nКомпанія "TechSolutions" (2020-2023)\nFrontend Developer\n- Розробка SPA додатків\n- Оптимізація продуктивності`}
              rows={6}
            />
            <div className={styles.hint}>
              Використовуйте Enter для нового рядка. Для жирного тексту:
              **слово**
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Освіта</label>
            <textarea
              name="education"
              value={rawData.education}
              onChange={handleInputChange}
              className={styles.textarea}
              placeholder={`Приклад:\nКиївський університет (2015-2019)\nБакалавр комп'ютерних наук`}
              rows={4}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Додаткова інформація</h3>

          <div className={styles.inputGroup}>
            <label>Проекти</label>
            <textarea
              name="projects"
              value={rawData.projects}
              onChange={handleInputChange}
              className={styles.textarea}
              placeholder={`Приклад:\nІнтернет-магазин (React/Node.js)\n- Розробка UI компонентів\n- Інтеграція з API`}
              rows={5}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Навички</label>
            <textarea
              name="skills"
              value={rawData.skills}
              onChange={handleInputChange}
              className={styles.textarea}
              placeholder="Наприклад: JavaScript, React, HTML/CSS, Git"
              rows={3}
            />
            <div className={styles.hint}>
              Розділяйте комами для створення списку
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Мови</label>
            <textarea
              name="languages"
              value={rawData.languages}
              onChange={handleInputChange}
              className={styles.textarea}
              placeholder="Наприклад: Українська (рідна), Англійська (B2)"
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
