import { useState, useEffect } from "react";
import axios from "axios";
import { ERRORS } from "../../constants/profile/errorsProfile";
import { useNavigate } from "react-router-dom";

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

      const response = await axios.get("http://localhost:3001/profile", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
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

      const response = await axios.put(
        "http://localhost:3001/profile",
        updatedFields,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

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
        setError(err.response?.data?.message || ERRORS.UPDATE_FAILED);
      }
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
