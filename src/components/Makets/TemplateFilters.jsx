import React from "react";
import styles from "../../css/makets.module.css";

function TemplateFilters({
  selectedStyle,
  setSelectedStyle,
  selectedColor,
  setSelectedColor,
  selectedFormat,
  setSelectedFormat,
  hasAvatar,
  setHasAvatar,
}) {
  return (
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

      <select value={hasAvatar} onChange={(e) => setHasAvatar(e.target.value)}>
        <option value="">All Options</option>
        <option value="yes">With Avatar</option>
        <option value="no">Without Avatar</option>
      </select>
    </div>
  );
}

export default TemplateFilters;
