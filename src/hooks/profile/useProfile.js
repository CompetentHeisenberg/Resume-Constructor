import { useState, useEffect } from "react";
import axios from "axios";
import { ERRORS } from "../../constants/profile/errorsProfile";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

export const useProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth");
        return;
      }

      const response = await api.get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserData(response.data);
    } catch (err) {
      console.error("Profile loading error:", err);
      if (err.response?.status === 401) {
        setError(ERRORS.SESSION_EXPIRED);
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError(ERRORS.LOAD_FAILED);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (updatedFields) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth");
        return;
      }

      setLoading(true);
      setError("");
      setSuccessMessage("");

      const formData = new FormData();

      if (updatedFields.fullName)
        formData.append("fullName", updatedFields.fullName);
      if (updatedFields.phone) formData.append("phone", updatedFields.phone);
      if (updatedFields.position)
        formData.append("position", updatedFields.position);
      if (updatedFields.company)
        formData.append("company", updatedFields.company);
      if (updatedFields.experience)
        formData.append("experience", updatedFields.experience);
      if (updatedFields.education)
        formData.append("education", updatedFields.education);
      if (updatedFields.projects)
        formData.append("projects", updatedFields.projects);
      if (updatedFields.skills) formData.append("skills", updatedFields.skills);
      if (updatedFields.languages)
        formData.append("languages", updatedFields.languages);

      if (updatedFields.avatarFile) {
        formData.append("avatar", updatedFields.avatarFile);
      } else if (updatedFields.avatarBase64) {
        formData.append("avatarBase64", updatedFields.avatarBase64);
      } else if (updatedFields.removeAvatar) {
        formData.append("removeAvatar", "true");
      }

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await api.put("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data);
      setSuccessMessage("Profile successfully updated!");
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Profile update error:", err);
      if (err.response?.status === 401) {
        setError(ERRORS.SESSION_EXPIRED);
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError(err.response?.data?.error || ERRORS.UPDATE_FAILED);
      }
    } finally {
      setLoading(false);
    }
  };
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const response = await api.post(
        "/profile/change-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage(
        response.data.message || "Password sucessfully changed"
      );
      return true;
    } catch (err) {
      setError(err.response?.data?.error || "Error while changing password");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return {
    userData,
    setUserData,
    loading,
    error,
    isEditing,
    setIsEditing,
    successMessage,
    fetchProfile,
    updateProfile,
    changePassword,
  };
};
