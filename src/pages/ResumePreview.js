import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import styles from "../css/resumePreview.module.css";
import Button from "../components/RegButton";
import useImportData from "../hooks/resumePreview/useImportData";
import useProcessedHtml from "../hooks/resumePreview/useProcessedHtml";

const ResumePreview = ({ data = {}, template, onDataImported }) => {
  const resumeRef = useRef();
  const userData = useImportData();
  const processedHtml = useProcessedHtml(template, data);

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
