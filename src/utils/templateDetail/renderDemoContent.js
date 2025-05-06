const renderDemoTemplate = (htmlContent, demoData) => {
  if (!htmlContent) return "";

  return htmlContent
    .replace(/\{\{fullName\}\}/g, demoData.fullName)
    .replace(/\{\{position\}\}/g, demoData.position)
    .replace(/\{\{email\}\}/g, demoData.email)
    .replace(/\{\{phone\}\}/g, demoData.phone)
    .replace(/\{\{experience\}\}/g, demoData.experience)
    .replace(/\{\{education\}\}/g, demoData.education)
    .replace(/\{\{projects\}\}/g, demoData.projects)
    .replace(/\{\{skills\}\}/g, demoData.skills)
    .replace(/\{\{languages\}\}/g, demoData.languages);
};

export default renderDemoTemplate;
