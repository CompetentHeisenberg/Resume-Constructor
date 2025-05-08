import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import styles from "../css/resumePreview.module.css";
import Button from "../components/RegButton";
import useImportData from "../hooks/resumePreview/useImportData";
import useProcessedHtml from "../hooks/resumePreview/useProcessedHtml";

const ResumePreview = ({ data = {}, template, onDataImported }) => {
  const resumeRef = useRef();
  const userData = useImportData();
  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  useEffect(() => {
    if (localData.fullName && !localData.initials) {
      const initials =
        localData.fullName
          ?.split(" ")
          .map((name) => name[0])
          .join("") || "";
      setLocalData((prevData) => ({
        ...prevData,
        initials,
      }));
    }
  }, [localData.fullName]);

  const processedHtml = useProcessedHtml(template, localData);

  const handleImportData = () => {
    if (userData) {
      const formattedData = {
        fullName: userData.fullName,
        position: userData.position,
        email: userData.email,
        phone: userData.phone,
        experience: userData.experience,
        education: userData.education,
        projects: userData.projects,
        skills: userData.skills,
        languages: userData.languages,
        avatar: userData.avatar,
      };

      setLocalData(formattedData);
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
