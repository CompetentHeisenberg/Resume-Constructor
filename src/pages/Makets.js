import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../css/makets.module.css";
import { renderDemoContent } from "../utils/makets/renderDemoContent";
function Makets() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/templates")
      .then((response) => {
        if (!response.ok) throw new Error("Error while dowloanding templates");
        return response.json();
      })
      .then((data) => {
        setTemplates(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredTemplates = templates.filter((template) => {
    const nameMatch = template.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const styleMatch = selectedStyle ? template.style === selectedStyle : true;
    const colorMatch = selectedColor ? template.color === selectedColor : true;
    const formatMatch = selectedFormat
      ? template.format === selectedFormat
      : true;
    return nameMatch && styleMatch && colorMatch && formatMatch;
  });

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p className={styles.errorTitle}>Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Professional Templates</h1>
        <p className={styles.subtitle}>Choose ideal Template for yourself</p>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Searching Templates..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filters}>
          <select
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
          >
            <option value="">All Styles</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="modern">Modern</option>
          </select>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="">All Colors</option>
            <option value="purple">Purple</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="orange">Orange</option>
          </select>
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
          >
            <option value="">All Formats</option>
            <option value="vertical">Vertical</option>
            <option value="horizontal">Horizontal</option>
          </select>
        </div>
      </header>

      {filteredTemplates.length > 0 ? (
        <div className={styles.templatesGrid}>
          {filteredTemplates.map((template) => (
            <div key={template._id} className={styles.templateCard}>
              <div className={styles.previewContainer}>
                <div
                  className={styles.demoContent}
                  dangerouslySetInnerHTML={{
                    __html: renderDemoContent(template.htmlContent),
                  }}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.templateName}>{template.name}</h3>
                <div className={styles.actions}>
                  <Link
                    to={`/templates/${template._id}`}
                    className={styles.detailLink}
                  >
                    Details
                  </Link>
                  <Link
                    to="/editor"
                    state={{ selectedTemplate: template }}
                    className={styles.useButton}
                  >
                    Use this Template
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📄</div>
          <h3>We dont find any Templates</h3>
          <p>Try to change search parameters</p>
        </div>
      )}
    </div>
  );
}

export default Makets;
