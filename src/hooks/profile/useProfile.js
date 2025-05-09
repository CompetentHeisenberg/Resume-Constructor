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
  };
};
