import { useEffect, useState } from "react";
import { processTemplate } from "../../utils/resumePreview/resumeTemplateProcessor.js";
import defaultResumeTemplate from "../../constants/resumePreview/defaultResumeTemplate.js";

const useProcessedHtml = (template, data) => {
  const [processedHtml, setProcessedHtml] = useState("");

  useEffect(() => {
    const result = processTemplate(
      template?.htmlContent,
      data,
      defaultResumeTemplate
    );
    setProcessedHtml(result);
  }, [template, data]);

  return processedHtml;
};

export default useProcessedHtml;
