import { useState, useEffect } from "react";
import { convertHtmlToText } from "../../utils/resumeEditor/formatters.js";

export const useResumeData = (initialData, templateData) => {
  const [rawData, setRawData] = useState(initialData);

  useEffect(() => {
    if (templateData) {
      setRawData((prev) => {
        const updatedData = { ...prev };
        for (const key in templateData) {
          if (templateData[key]) {
            updatedData[key] =
              key === "avatar"
                ? templateData[key]
                : convertHtmlToText(templateData[key]);
          }
        }
        return updatedData;
      });
    }
  }, [templateData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRawData((prev) => ({ ...prev, [name]: value }));
  };

  const importData = (newData) => {
    setRawData((prev) => {
      const updatedData = { ...prev };
      for (const key in newData) {
        if (newData[key]) {
          updatedData[key] =
            key === "avatar" ? newData[key] : convertHtmlToText(newData[key]);
        }
      }
      return updatedData;
    });
  };

  return { rawData, handleInputChange, importData };
};
