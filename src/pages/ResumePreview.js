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
      const formattedData = {};
      if (userData.fullName) formattedData.fullName = userData.fullName;
      if (userData.position) formattedData.position = userData.position;
      if (userData.email) formattedData.email = userData.email;
      if (userData.phone) formattedData.phone = userData.phone;
      if (userData.experience) formattedData.experience = userData.experience;
      if (userData.education) formattedData.education = userData.education;
      if (userData.projects) formattedData.projects = userData.projects;
      if (userData.skills) formattedData.skills = userData.skills;
      if (userData.languages) formattedData.languages = userData.languages;
      if (userData.avatar) formattedData.avatar = userData.avatar;

      onDataImported(formattedData);
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
