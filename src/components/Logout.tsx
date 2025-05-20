// src/components/Logout.tsx
import { useDispatch } from "react-redux";
import { setUser } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"; // Icono opcional

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

      className="flex items-center gap-2 text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-2 rounded-lg text-sm shadow-md hover:shadow-lg transition-all duration-200"
    >
      <LogOut size={16} />
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
