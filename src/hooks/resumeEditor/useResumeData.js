import { useState, useEffect } from "react";
import { convertHtmlToText } from "../../utils/resumeEditor/formatters.js";

export const useResumeData = (initialData, templateData) => {
  const [rawData, setRawData] = useState(initialData);

  useEffect(() => {
    if (templateData) {
      const plainTextData = {};
      for (const key in templateData) {
        plainTextData[key] = convertHtmlToText(templateData[key]);
      }
      setRawData(plainTextData);
    }
  }, [templateData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRawData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const importData = (data) => {
    const plainTextData = {};
    for (const key in data) {
      plainTextData[key] = convertHtmlToText(data[key]);
    }
    setRawData(plainTextData);
  };

  return { rawData, setRawData, handleInputChange, importData };
};
