import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function useImportData() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    education: "",
    projects: "",
    skills: "",
    languages: "",
    avatar: "",
    company: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/auth");
          return;
        }

        const response = await axios.get("http://localhost:3001/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setUserData({
          fullName: response.data.fullName || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          position: response.data.position || "",
          company: response.data.company || "",
          experience: response.data.experience || "",
          education: response.data.education || "",
          projects: response.data.projects || "",
          skills: response.data.skills || "",
          languages: response.data.languages || "",
          avatar: response.data.avatar || "",
        });
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  return userData;
}

export default useImportData;
