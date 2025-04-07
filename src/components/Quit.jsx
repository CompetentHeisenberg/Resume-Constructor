import { useNavigate } from "react-router-dom";

const LogoutButton = ({ style }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("userData");

    navigate("/");
    window.location.reload();
  };

  return (
    <button onClick={handleLogout} className={style}>
      Exit
    </button>
  );
};

export default LogoutButton;
