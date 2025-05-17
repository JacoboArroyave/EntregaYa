// src/components/Logout.tsx
import { useDispatch } from "react-redux";
import { setUser } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setUser(null));
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white bg-red-700 hover:bg-red-800 px-3 py-1 rounded-md text-sm"
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
