import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DOMPurify from "dompurify";

const ResumePreview = ({ data, template }) => {
  const resumeRef = useRef();
  const [processedHtml, setProcessedHtml] = useState("");

  useEffect(() => {
    const formatContent = (content) => {
      if (!content) return "";

      if (content.includes(",")) {
        return `<ul style="margin-top: 5px; padding-left: 20px;">${content
          .split(",")
          .map((item) => `<li style="margin-bottom: 3px;">${item.trim()}</li>`)
          .join("")}</ul>`;
      }

      return content;
    };

    const processTemplate = (html) => {
      const result = html
        .replace(
          /\{\{fullName\}\}/g,
          data.fullName ||
            "<span style='color:#999'>Full Name not specified</span>"
        )
        .replace(
          /\{\{position\}\}/g,
          data.position ||
            "<span style='color:#999'>Position not specified</span>"
        )
        .replace(
          /\{\{email\}\}/g,
          data.email || "<span style='color:#999'>email@example.com</span>"
        )
        .replace(
          /\{\{phone\}\}/g,
          data.phone || "<span style='color:#999'>+XXX XX XXX XX XX</span>"
        )
        .replace(
          /\{\{experience\}\}/g,
          formatContent(data.experience) ||
            "<span style='color:#999'>Years of Expirience not specified</span>"
        )
        .replace(
          /\{\{education\}\}/g,
          formatContent(data.education) ||
            "<span style='color:#999'>Education not specified</span>"
        )
        .replace(
          /\{\{projects\}\}/g,
          formatContent(data.projects) ||
            "<span style='color:#999'>Projects not specified</span>"
        )
        .replace(
          /\{\{skills\}\}/g,
          formatContent(data.skills) ||
            "<span style='color:#999'>Skills not specified</span>"
        )
        .replace(
          /\{\{languages\}\}/g,
          formatContent(data.languages) ||
            "<span style='color:#999'>Languages not specified</span>"
        );

      return DOMPurify.sanitize(result);
    };

    if (!template?.htmlContent) {
      const defaultTemplate = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 800px; margin: 0 auto; padding: 30px; background: #fff; box-shadow: 0 0 20px rgba(0,0,0,0.1); border-radius: 8px;">
          <header style="border-bottom: 2px solid #f0f0f0; padding-bottom: 20px; margin-bottom: 25px;">
            <h1 style="color: #2c3e50; margin: 0; font-size: 28px;">{{fullName}}</h1>
            <h2 style="color: #7f8c8d; margin: 5px 0 0; font-size: 18px; font-weight: normal;">{{position}}</h2>
            <div style="display: flex; gap: 15px; margin-top: 15px; flex-wrap: wrap;">
              <p style="margin: 0; color: #555;">📧 {{email}}</p>
              <p style="margin: 0; color: #555;">📱 {{phone}}</p>
            </div>
          </header>

          <section style="margin-bottom: 25px;">
            <h2 style="color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 5px; font-size: 20px;">Years of expirience</h2>
            <div style="margin-top: 10px; line-height: 1.6;">{{experience}}</div>
          </section>

          <section style="margin-bottom: 25px;">
            <h2 style="color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 5px; font-size: 20px;">Education</h2>
            <div style="margin-top: 10px; line-height: 1.6;">{{education}}</div>
          </section>

          <section style="margin-bottom: 25px;">
            <h2 style="color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 5px; font-size: 20px;">Projects</h2>
            <div style="margin-top: 10px; line-height: 1.6;">{{projects}}</div>
          </section>

          <section style="margin-bottom: 25px;">
            <h2 style="color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 5px; font-size: 20px;">Skills</h2>
            <div style="margin-top: 10px;">{{skills}}</div>
          </section>

          <section>
            <h2 style="color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 5px; font-size: 20px;">Languages</h2>
            <div style="margin-top: 10px;">{{languages}}</div>
          </section>
        </div>
      `;
      setProcessedHtml(processTemplate(defaultTemplate));
    } else {
      setProcessedHtml(processTemplate(template.htmlContent));
    }
  }, [data, template]);

  const downloadPDF = () => {
    const input = resumeRef.current;
    html2canvas(input, {
      scale: 2,
      logging: true,
      useCORS: true,
      allowTaint: true,
    }).then((canvas) => {
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
    <div
      style={{
        width: "50%",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        overflowY: "auto",
        maxHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          paddingBottom: "15px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#333",
            margin: 0,
          }}
        >
          Preview of Template
        </h2>
        <button
          onClick={downloadPDF}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem",
            transition: "background-color 0.3s",
            ":hover": {
              backgroundColor: "#45a049",
            },
          }}
        >
          Dowloand PDF
        </button>
      </div>

      <div
        ref={resumeRef}
        dangerouslySetInnerHTML={{ __html: processedHtml }}
      />
    </div>
  );
};

export default ResumePreview;
