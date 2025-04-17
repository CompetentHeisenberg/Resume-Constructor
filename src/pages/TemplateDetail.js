import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../css/templatedetail.module.css";

const DEMO_DATA = {
  fullName: "Olexander Petrenko",
  position: "Senior Frontend Developer",
  email: "olexandr@example.com",
  phone: "+380 99 765 4321",
  experience: `
    <div>
      <p><strong>Senior Frontend Developer</strong></p>
      <p>Tech Innovations | 2018-now</p>
      <ul>
        <li>Developing web-architecture on React</li>
        <li>Team-Lead in developer team</li>
      </ul>
    </div>
  `,
  education: `
    <div>
      <p><strong>Master of CS</strong></p>
      <p>Kyiv Politech Institute | 2012-2018</p>
    </div>
  `,
  projects: `
    <ul>
      <li>Analytic System Manager (React/Node.js)</li>
      <li>Web Banking Service (React Native)</li>
    </ul>
  `,
  skills: "JavaScript, React, TypeScript, Redux, GraphQL",
  languages: "Ukrainian (native), English (C1)",
};

function TemplateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/templates/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Cannot download Template");
        return res.json();
      })
      .then((data) => {
        setTemplate(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [id]);

  const renderDemoContent = (htmlContent) => {
    if (!htmlContent) return "";
    return htmlContent
      .replace(/\{\{fullName\}\}/g, DEMO_DATA.fullName)
      .replace(/\{\{position\}\}/g, DEMO_DATA.position)
      .replace(/\{\{email\}\}/g, DEMO_DATA.email)
      .replace(/\{\{phone\}\}/g, DEMO_DATA.phone)
      .replace(/\{\{experience\}\}/g, DEMO_DATA.experience)
      .replace(/\{\{education\}\}/g, DEMO_DATA.education)
      .replace(/\{\{projects\}\}/g, DEMO_DATA.projects)
      .replace(/\{\{skills\}\}/g, DEMO_DATA.skills)
      .replace(/\{\{languages\}\}/g, DEMO_DATA.languages);
  };

  const handleUseTemplate = () => {
    navigate("/editor", {
      state: {
        selectedTemplate: {
          ...template,
          defaultValues: {
            fullName: DEMO_DATA.fullName,
            email: DEMO_DATA.email,
            phone: DEMO_DATA.phone,
            position: DEMO_DATA.position,
            experience: DEMO_DATA.experience,
            education: DEMO_DATA.education,
            projects: DEMO_DATA.projects,
            skills: DEMO_DATA.skills,
            languages: DEMO_DATA.languages,
          },
        },
      },
    });
  };

  if (loading)
    return (
      <div className={styles.loading}>
        <p>Loading Template...</p>
      </div>
    );
  if (!template)
    return (
      <div className={styles.loading}>
        <p>Cannot load Template</p>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.templateWrapper}>
        <div className={styles.previewSection}>
          <div
            className={styles.previewContent}
            dangerouslySetInnerHTML={{
              __html: renderDemoContent(template.htmlContent),
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
  );
}

export default TemplateDetail;
