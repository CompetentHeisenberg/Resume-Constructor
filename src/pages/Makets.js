import React, { useState, useEffect } from "react";
import styles from "../css/makets.module.css";
import SearchBar from "../components/Makets/SearchBar";
import TemplateFilters from "../components/Makets/TemplateFilters";
import TemplateCard from "../components/Makets/TemplateCard";

function Makets() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [hasAvatar, setHasAvatar] = useState("");

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
    const avatarMatch =
      hasAvatar === "yes"
        ? typeof template.defaultValues?.avatar === "string" &&
          template.defaultValues.avatar.trim() === ""
        : hasAvatar === "no"
        ? !template.defaultValues?.hasOwnProperty("avatar")
        : true;

    return nameMatch && styleMatch && colorMatch && formatMatch && avatarMatch;
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

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <TemplateFilters
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedFormat={selectedFormat}
          setSelectedFormat={setSelectedFormat}
          hasAvatar={hasAvatar}
          setHasAvatar={setHasAvatar}
        />
      </header>

      {filteredTemplates.length > 0 ? (
        <div className={styles.templatesGrid}>
          {filteredTemplates.map((template) => (
            <TemplateCard key={template._id} template={template} />
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
