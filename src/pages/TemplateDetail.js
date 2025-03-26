import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TemplateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/templates/${id}`)
      .then((res) => res.json())
      .then((data) => setTemplate(data));
  }, [id]);

  const handleUseTemplate = () => {
    navigate("/editor", {
      state: {
        selectedTemplate: {
          ...template,
          defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            experience: "",
            education: "",
          },
        },
      },
    });
  };

  if (!template) return <div>Завантаження...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div
            className="bg-gray-50 p-4 rounded border"
            dangerouslySetInnerHTML={{ __html: template.htmlContent }}
          />
        </div>
        <div className="p-6">
          <button
            onClick={handleUseTemplate}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Використати цей шаблон
          </button>
        </div>
      </div>
    </div>
  );
}

export default TemplateDetail;
