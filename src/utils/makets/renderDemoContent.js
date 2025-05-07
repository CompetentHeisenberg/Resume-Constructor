import DEMO_DATA from "../../constants/makets/demoData";

export const renderDemoContent = (htmlContent) => {
  if (!htmlContent) {
    console.error("Empty HTML content received");
    return "";
  }

  console.log("Initial DEMO_DATA:", DEMO_DATA);

  const getInitials = (name) => {
    if (!name || typeof name !== "string") {
      console.warn("Invalid name for initials:", name);
      return "";
    }
    const initials = name
      .trim()
      .split(" ")
      .filter((name) => name.length > 0)
      .map((name) => name[0].toUpperCase())
      .join("")
      .substring(0, 2);
    console.log("Calculated initials:", initials);
    return initials;
  };

  const processedData = {
    fullName: DEMO_DATA.fullName || "[Full Name]",
    position: DEMO_DATA.position || "[Position]",
    email: DEMO_DATA.email || "[Email]",
    phone: DEMO_DATA.phone || "[Phone]",
    experience: DEMO_DATA.experience || "[Experience]",
    education: DEMO_DATA.education || "[Education]",
    projects: DEMO_DATA.projects || "[Projects]",
    skills: DEMO_DATA.skills || "[Skills]",
    languages: DEMO_DATA.languages || "[Languages]",
    avatar:
      DEMO_DATA.avatar && DEMO_DATA.avatar.startsWith("http")
        ? DEMO_DATA.avatar
        : "",
    initials: DEMO_DATA.initials || getInitials(DEMO_DATA.fullName),
  };

  console.log("Processed data before replacement:", processedData);

  let result = htmlContent;

  try {
    if (processedData.avatar) {
      console.log("Processing with avatar");
      result = result.replace(
        /\{\{#avatar\}\}(.*?)\{\{\/avatar\}\}/gs,
        (match, inner) => {
          return inner.replace(/\{\{avatar\}\}/g, processedData.avatar);
        }
      );
      result = result.replace(/\{\{\^avatar\}\}(.*?)\{\{\/avatar\}\}/gs, "");
    } else {
      console.log("Processing without avatar, using initials");
      result = result.replace(/\{\{#avatar\}\}(.*?)\{\{\/avatar\}\}/gs, "");
      result = result.replace(
        /\{\{\^avatar\}\}(.*?)\{\{\/avatar\}\}/gs,
        (match, inner) => {
          return inner.replace(/\{\{initials\}\}/g, processedData.initials);
        }
      );
    }

    const fields = [
      "fullName",
      "position",
      "email",
      "phone",
      "experience",
      "education",
      "projects",
      "skills",
      "languages",
      "initials",
    ];

    fields.forEach((field) => {
      const regex = new RegExp(`\\{\\{${field}\\}\\}`, "g");
      result = result.replace(regex, processedData[field]);
      console.log(`Replaced {{${field}}} with:`, processedData[field]);
    });
  } catch (error) {
    console.error("Template processing error:", error);
    return "<div style='color:red'>Template Error</div>";
  }

  console.log("Final rendered template:", result);
  return result;
};
