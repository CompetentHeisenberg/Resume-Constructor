import { useNavigate } from "react-router-dom";

const LogoutButton = ({ className = "", type = "button" }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    sessionStorage.removeItem("userData");

    navigate("/");
    window.location.reload();
  };

  return (
    <button onClick={handleLogout} className={className} type={type}>
      Exit
    </button>
  );
};

export default LogoutButton;
