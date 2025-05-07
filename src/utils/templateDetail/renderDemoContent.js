const renderDemoTemplate = (htmlContent, demoData) => {
  if (!htmlContent) return "";

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.trim().split(" ");
    return names
      .filter((name) => name.length > 0)
      .map((name) => name[0].toUpperCase())
      .join("")
      .substring(0, 2);
  };

  const processedData = {
    ...demoData,
    initials: demoData.initials || getInitials(demoData.fullName),
  };

  console.log("Processing template with:", {
    avatar: processedData.avatar,
    initials: processedData.initials,
    fullName: processedData.fullName,
  });

  let result = htmlContent;

  if (processedData.avatar) {
    console.log("Avatar exists - showing image");
    result = result.replace(
      /\{\{#avatar\}\}(.*?)\{\{\/avatar\}\}/gs,
      (match, content) =>
        content.replace(/\{\{avatar\}\}/g, processedData.avatar)
    );
    result = result.replace(/\{\{\^avatar\}\}(.*?)\{\{\/avatar\}\}/gs, "");
  } else {
    console.log("No avatar - showing initials");
    result = result.replace(/\{\{#avatar\}\}(.*?)\{\{\/avatar\}\}/gs, "");
    result = result.replace(
      /\{\{\^avatar\}\}(.*?)\{\{\/avatar\}\}/gs,
      (match, content) =>
        content.replace(/\{\{initials\}\}/g, processedData.initials)
    );
  }

  const replacements = {
    fullName: processedData.fullName,
    position: processedData.position,
    email: processedData.email,
    phone: processedData.phone,
    experience: processedData.experience,
    education: processedData.education,
    projects: processedData.projects,
    skills: processedData.skills,
    languages: processedData.languages,
  };

  Object.entries(replacements).forEach(([key, value]) => {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value || "");
  });

  console.log("Final template output:", result);
  return result;
};

export default renderDemoTemplate;
