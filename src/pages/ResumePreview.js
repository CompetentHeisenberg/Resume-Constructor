import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DOMPurify from "dompurify";
import styles from "../css/resumePreview.module.css";
import Button from "../components/RegButton";
import useImportData from "../hooks/useImportData";

const ResumePreview = ({ data = {}, template, onDataImported }) => {
  const resumeRef = useRef();
  const [processedHtml, setProcessedHtml] = useState("");
  const userData = useImportData();

  const handleImportData = () => {
    if (userData) {
      const formattedData = {
        fullName: userData.fullName || data.fullName,
        position: userData.position || data.position,
        email: userData.email || data.email,
        phone: userData.phone || data.phone,
        experience: userData.experience || data.experience,
        education: userData.education || data.education,
        projects: userData.projects || data.projects,
        skills: userData.skills || data.skills,
        languages: userData.languages || data.languages,
      };
      onDataImported?.(formattedData);
    }
  };

  useEffect(() => {
    const formatContent = (content, isList = false) => {
      if (!content) return "";
      if (isList && content.includes(",")) {
        return `<ul>${content
          .split(",")
          .map((item) => `<li>${item.trim()}</li>`)
          .join("")}</ul>`;
      }
      return content;
    };

    const processTemplate = (html) => {
      const replacements = {
        fullName: data.fullName,
        position: data.position,
        email: data.email,
        phone: data.phone,
        experience: formatContent(data.experience),
        education: formatContent(data.education),
        projects: formatContent(data.projects),
        skills: formatContent(data.skills, true),
        languages: formatContent(data.languages, true),
      };

      const defaultTemplate = `
      <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 800px; margin: 0 auto; padding: 30px; background: #fff; box-shadow: 0 0 20px rgba(0,0,0,0.1); border-radius: 12px;">
        <h1>{{fullName}}</h1>
        <h2>{{position}}</h2>
        <p>Email: {{email}}</p>
        <p>Phone: {{phone}}</p>
        <section>
          <h3>Experience</h3>
          <div>{{experience}}</div>
        </section>
        <section>
          <h3>Education</h3>
          <div>{{education}}</div>
        </section>
        <section>
          <h3>Projects</h3>
          <div>{{projects}}</div>
        </section>
        <section>
          <h3>Skills</h3>
          <div>{{skills}}</div>
        </section>
        <section>
          <h3>Languages</h3>
          <div>{{languages}}</div>
        </section>
      </div>
    `;

      let result = html || defaultTemplate;

      for (const [key, value] of Object.entries(replacements)) {
        const placeholder = `{{${key}}}`;
        const replacement =
          !value || value.trim() === ""
            ? `<span style="color:#999">[Your ${key}]</span>`
            : value;

        result = result.replace(new RegExp(placeholder, "g"), replacement);
      }

      return DOMPurify.sanitize(result);
    };

    setProcessedHtml(processTemplate(template?.htmlContent));
  }, [data, template]);

  const downloadPDF = () => {
    const input = resumeRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        0,
        0,
        imgWidth,
        imgHeight
      );
      pdf.save("resume.pdf");
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Resume Preview</h2>
        <Button onClick={handleImportData} style={styles.downloadButton}>
          Import Profile Data
        </Button>
        <button onClick={downloadPDF} className={styles.downloadButton}>
          Download as PDF
        </button>
      </div>
      <div
        ref={resumeRef}
        className={styles.resumeContent}
        dangerouslySetInnerHTML={{ __html: processedHtml }}
      />
    </div>
  );
};

export default ResumePreview;
