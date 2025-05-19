import React, { useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../../src/store/store";
import {
  FaUtensils, FaClock, FaUserTie, FaMotorcycle, FaUser,
  FaExclamationCircle, FaMapMarkerAlt, FaClipboardList, FaBoxOpen
} from 'react-icons/fa';
import { MdPhotoCamera, MdRestaurantMenu } from 'react-icons/md';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const user = useSelector((state: RootState) => state.user.user);
  const location = useLocation();
  const { pathname } = location;
  const sidebar = useRef<HTMLDivElement>(null);

  if (!user) return null;

  return (
    <aside
      ref={sidebar}
      className={`fixed inset-y-0 left-0 z-50 h-screen w-72 overflow-y-auto bg-orange-50 shadow-lg transition-transform duration-300 ease-in-out transform 
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      style={{ boxShadow: '2px 0 10px rgba(0,0,0,0.1)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6 bg-orange-100">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-600 text-white flex items-center justify-center rounded-full text-xl font-bold">D</div>
          <span className="text-orange-600 text-lg font-bold">EntregaYa</span>
        </NavLink>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-orange-600 text-xl font-bold">&times;</button>
      </div>

      {/* Links */}
      <nav className="px-4 py-4">
        <h3 className="mb-4 ml-2 text-sm font-semibold text-orange-500">MENÚ</h3>
        <ul className="space-y-2">
          {[
            { to: "/list-restaurant", label: "Restaurantes", icon: <FaUtensils /> },
            { to: "/list-driver", label: "Conductores", icon: <FaUserTie /> },
            { to: "/list-menu", label: "Menús", icon: <MdRestaurantMenu /> },
            { to: "/list-motorcycle", label: "Motocicletas", icon: <FaMotorcycle /> },
            { to: "/list-product", label: "Productos", icon: <FaBoxOpen /> },
            { to: "/list-customer", label: "Clientes", icon: <FaUser /> },
            { to: "/list-order", label: "Pedidos", icon: <FaClock /> },
            { to: "/list-address", label: "Direcciones", icon: <FaMapMarkerAlt /> },
            { to: "/list-photo", label: "Fotos", icon: <MdPhotoCamera /> },
            { to: "/list-issue", label: "Problemas", icon: <FaExclamationCircle /> },
            { to: "/charts", label: "Estadísticas", icon: <FaClipboardList /> },
          ].map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium hover:bg-orange-100 duration-200
                ${pathname.includes(to) ? 'bg-orange-100' : ''}`}
              >
                <span className="text-orange-600">{icon}</span>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
