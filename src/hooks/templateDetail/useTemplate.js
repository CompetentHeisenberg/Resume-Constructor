import { useState, useEffect } from "react";

const useTemplate = (id) => {
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await fetch(`http://localhost:3001/templates/${id}`);
        if (!response.ok) throw new Error("Template not found");
        const data = await response.json();

        if (!data.htmlContent) throw new Error("Invalid template format");

        setTemplate(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id]);

  return { template, loading, error };
};

export default useTemplate;
