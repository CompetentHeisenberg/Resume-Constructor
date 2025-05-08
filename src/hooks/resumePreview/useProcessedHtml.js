import { useEffect, useState } from "react";
import { processTemplate } from "../../utils/resumePreview/resumeTemplateProcessor.js";
import defaultResumeTemplate from "../../constants/resumePreview/defaultResumeTemplate.js";

const useProcessedHtml = (template, data) => {
  const [processedHtml, setProcessedHtml] = useState("");

  useEffect(() => {
    console.log("Template data:", { template, data });
    const updatedData = {
      ...data,
      initials: data.initials || "",
    };
    const result = processTemplate(
      template?.htmlContent,
      updatedData,
      defaultResumeTemplate
    );
    setProcessedHtml(result);
  }, [template, data]);

  return processedHtml;
};

export default useProcessedHtml;
