import DOMPurify from "dompurify";

export const formatContent = (content, isList = false) => {
  if (!content) return "";
  if (isList && content.includes(",")) {
    return `<ul>${content
      .split(",")
      .map((item) => `<li>${item.trim()}</li>`)
      .join("")}</ul>`;
  }
  return content;
};

export const processTemplate = (templateHtml, data, defaultTemplate) => {
  const replacements = {
    fullName: data.fullName,
    position: data.position,
    email: data.email,
    phone: data.phone,
    experience: formatContent(data.experience),
    education: formatContent(data.education),
    projects: formatContent(data.projects),
    skills: formatContent(data.skills, true),
    languages: formatContent(data.languages, true),
  };

  let result = templateHtml || defaultTemplate;

  for (const [key, value] of Object.entries(replacements)) {
    const placeholder = `{{${key}}}`;
    const replacement =
      !value || value.trim() === ""
        ? `<span style="color:#999">[Your ${key}]</span>`
        : value;

    result = result.replace(new RegExp(placeholder, "g"), replacement);
  }

  return DOMPurify.sanitize(result);
};
