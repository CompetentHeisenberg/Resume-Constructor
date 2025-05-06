import DEMO_DATA from "../../constants/makets/demoData";

export const renderDemoContent = (htmlContent) => {
  if (!htmlContent) return "";

  return htmlContent
    .replace(/\{\{fullName\}\}/g, DEMO_DATA.fullName)
    .replace(/\{\{position\}\}/g, DEMO_DATA.position)
    .replace(/\{\{email\}\}/g, DEMO_DATA.email)
    .replace(/\{\{phone\}\}/g, DEMO_DATA.phone)
    .replace(/\{\{experience\}\}/g, DEMO_DATA.experience)
    .replace(/\{\{education\}\}/g, DEMO_DATA.education)
    .replace(/\{\{projects\}\}/g, DEMO_DATA.projects)
    .replace(/\{\{skills\}\}/g, DEMO_DATA.skills)
    .replace(/\{\{languages\}\}/g, DEMO_DATA.languages);
};
