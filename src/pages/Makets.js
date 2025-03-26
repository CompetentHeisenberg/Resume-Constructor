import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Makets() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/templates")
      .then((response) => {
        if (!response.ok) throw new Error("Помилка завантаження");
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

  if (loading) return <div className="text-center py-8">Завантаження...</div>;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Шаблони резюме</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template._id}
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <div
              className="bg-white p-4 h-64 overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: template.htmlContent }}
            />
            <div className="bg-gray-50 p-4 border-t">
              <h3 className="text-xl font-semibold">{template.name}</h3>
              <div className="mt-4 flex justify-between items-center">
                <Link
                  to={`/templates/${template._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Детальніше
                </Link>
                <Link
                  to="/editor"
                  state={{ selectedTemplate: template }}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Використати
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Makets;
