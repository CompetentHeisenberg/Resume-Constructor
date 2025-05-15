import { useState } from "react";

export const useResumeAnalysis = (rawData) => {
  const [analysisResult, setAnalysisResult] = useState([]);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const analyze = () => {
    const results = [];
    const sectionsToCheck = [];

    if (!rawData.fullName?.trim()) {
      results.push({
        type: "error",
        message: "Full name is required for professional resumes",
        section: "Personal Information",
      });
    } else if (rawData.fullName.trim().split(" ").length < 2) {
      results.push({
        type: "warning",
        message:
          "Consider including both first and last name for better recognition",
        section: "Personal Information",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(rawData.email)) {
      results.push({
        type: "error",
        message:
          "Invalid email format. Use professional email (e.g., name@domain.com)",
        section: "Contact Information",
      });
    }

    const normalized = rawData.phone?.replace(/[\s-]/g, "").trim();
    const pattern = /^(\+380|0)\d{9}$/;
    if (!pattern.test(normalized)) {
      results.push({
        type: "error",
        message: "Wrong phone format. Example: +380931234567 or 0931234567",
        section: "Contact Information",
      });
    }

    if (!rawData.position?.trim()) {
      results.push({
        type: "error",
        message:
          "Target position is missing. Recruiters need to know what role you're applying for",
        section: "Professional Summary",
      });
    } else if (rawData.position.length < 5) {
      results.push({
        type: "warning",
        message:
          "Position title seems too short. Be specific (e.g., 'Senior Frontend Developer' instead of 'Developer')",
        section: "Professional Summary",
      });
    }

    if (!rawData.experience?.trim()) {
      results.push({
        type: "error",
        message:
          "Work experience section is empty – this is the most important part of your resume",
        section: "Work Experience",
      });
      sectionsToCheck.push("Work Experience");
    } else {
      const experience = rawData.experience.trim();
      const expLength = experience.length;

      const bulletRegex = /(^|\n)[\u2022]\s+/;
      const dateRegex =
        /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t)?(?:ember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)?\.?\s?\d{4}\b/i;
      const companyRegex = /\b(?:at|@)\s?[A-Z][\w&.\s-]{2,}/i;
      const actionVerbRegex =
        /\b(designed|developed|created|built|implemented|led|managed|increased|reduced|optimized|improved|launched|executed|streamlined|collaborated|delivered|analyzed|resolved|achieved|introduced|automated)\b/i;

      if (expLength < 150) {
        results.push({
          type: "warning",
          message: `Experience section is brief (${expLength} chars). Aim for 200–500 characters detailing responsibilities and achievements.`,
          section: "Work Experience",
        });
      }

      if (!companyRegex.test(experience)) {
        results.push({
          type: "warning",
          message:
            "Consider adding company names (e.g., 'Senior Developer at Google').",
          section: "Work Experience",
        });
      }

      if (!dateRegex.test(experience)) {
        results.push({
          type: "warning",
          message:
            "Add employment dates (e.g., 'May 2020 – Present') for better credibility.",
          section: "Work Experience",
        });
      }

      if (!bulletRegex.test(experience)) {
        results.push({
          type: "suggestion",
          message:
            "Use bullet points (*, -, •) to structure your responsibilities and accomplishments for better readability.",
          section: "Work Experience",
        });
      }

      if (!actionVerbRegex.test(experience)) {
        results.push({
          type: "suggestion",
          message:
            "Use strong action verbs (e.g., developed, implemented, improved) and quantify achievements when possible.",
          section: "Work Experience",
        });
      }
    }

    if (!rawData.education?.trim()) {
      results.push({
        type: "warning",
        message:
          "Education section is missing. Include even basic education information",
        section: "Education",
      });
      sectionsToCheck.push("Education");
    } else {
      const hasDegree = /bachelor|master|phd|degree|diploma/i.test(
        rawData.education
      );
      const hasInstitution = /university|college|institute|school/i.test(
        rawData.education
      );
      const hasDates = /\d{4}/.test(rawData.education);

      if (!hasDegree) {
        results.push({
          type: "suggestion",
          message: "Specify degree type (e.g., 'BS in Computer Science')",
          section: "Education",
        });
      }

      if (!hasInstitution) {
        results.push({
          type: "warning",
          message: "Include educational institution name for credibility",
          section: "Education",
        });
      }

      if (!hasDates) {
        results.push({
          type: "suggestion",
          message: "Add graduation year (e.g., 'Expected 2025' or '2019')",
          section: "Education",
        });
      }
    }

    if (!rawData.projects?.trim()) {
      results.push({
        type: "suggestion",
        message:
          "Adding projects can showcase practical skills, especially for tech roles",
        section: "Projects",
      });
    } else {
      const projectsLength = rawData.projects.trim().length;
      const hasLinks = /http|github|bitbucket|gitlab|\.com/i.test(
        rawData.projects
      );
      const hasTech = /react|node|javascript|python|java|sql/i.test(
        rawData.projects
      );

      if (projectsLength < 50) {
        results.push({
          type: "warning",
          message:
            "Projects descriptions seem brief. Describe technologies used and your role",
          section: "Projects",
        });
      }

      if (!hasLinks && hasTech) {
        results.push({
          type: "suggestion",
          message:
            "Include links to live projects or GitHub repositories if available",
          section: "Projects",
        });
      }

      if (!hasTech) {
        results.push({
          type: "suggestion",
          message: "Mention specific technologies used in your projects",
          section: "Projects",
        });
      }
    }

    if (!rawData.skills?.trim()) {
      results.push({
        type: "error",
        message:
          "Skills section is empty - this is crucial for applicant tracking systems",
        section: "Skills",
      });
    } else {
      const skillsList = rawData.skills
        .split(/[,;]/)
        .map((s) => s.trim())
        .filter((s) => s);
      const uniqueSkills = [...new Set(skillsList)];

      if (uniqueSkills.length < 5) {
        results.push({
          type: "warning",
          message: `Only ${uniqueSkills.length} skills listed. Aim for 8-15 relevant skills`,
          section: "Skills",
        });
      }

      if (skillsList.length !== uniqueSkills.length) {
        results.push({
          type: "warning",
          message: "Duplicate skills detected. Remove repetitions",
          section: "Skills",
        });
      }

      const hasCategories = /:\s*|category/i.test(rawData.skills);
      if (!hasCategories && uniqueSkills.length > 7) {
        results.push({
          type: "suggestion",
          message:
            "Consider grouping skills by category (e.g., 'Frontend: React, Vue')",
          section: "Skills",
        });
      }
    }

    if (!rawData.languages?.trim()) {
      results.push({
        type: "suggestion",
        message:
          "Adding languages can be beneficial, especially for international roles",
        section: "Languages",
      });
    } else if (
      !/\(|fluent|native|basic|intermediate|advanced/i.test(rawData.languages)
    ) {
      results.push({
        type: "warning",
        message:
          "Specify language proficiency (e.g., 'Spanish (Intermediate)')",
        section: "Languages",
      });
    }

    if (!rawData.avatar) {
      results.push({
        type: "suggestion",
        message:
          "Adding a professional photo increases profile completeness by 30%",
        section: "Profile",
      });
    }

    const wordCount = Object.values(rawData).join(" ").split(/\s+/).length;
    if (wordCount < 200) {
      results.push({
        type: "warning",
        message: `Resume seems brief (${wordCount} words). Strong resumes typically contain 300-600 words`,
        section: "Overall",
      });
    }

    if (sectionsToCheck.length > 0) {
      results.push({
        type: "note",
        message: `Pay special attention to: ${sectionsToCheck.join(", ")}`,
        section: "Overall",
      });
    }

    if (results.length === 0) {
      results.push({
        type: "success",
        message:
          "Excellent resume! It meets all basic requirements. Consider adding metrics to quantify achievements",
        section: "Overall",
      });
    }

    const severityOrder = {
      error: 0,
      warning: 1,
      suggestion: 2,
      note: 3,
      success: 4,
    };
    results.sort((a, b) => severityOrder[a.type] - severityOrder[b.type]);

    setAnalysisResult(results);
    setShowAnalysis(true);
  };

  return { analyze, analysisResult, showAnalysis, setShowAnalysis };
};
