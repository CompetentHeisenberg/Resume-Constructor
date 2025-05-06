import { useState, useEffect } from "react";

const useTemplate = (id) => {
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

  return { template, loading };
};

export default useTemplate;
