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
      className="bg-orange-700 text-orange-100 font-medium hover:bg-orange-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-300 active:bg-orange-800 px-4 py-2 rounded-md text-sm shadow-sm transition-all duration-200 ease-in-out"
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
