import React, { useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../../src/store/store";
import { FaUtensils, FaClock, FaUserTie, FaMotorcycle, FaUser, FaExclamationCircle, FaMapMarkerAlt } from 'react-icons/fa';
import {
  MdPhotoCamera,
  MdRestaurantMenu,
} from 'react-icons/md';
import {
  FaClipboardList,
  FaBoxOpen,
} from 'react-icons/fa';

interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar = ({ sidebarOpen }: SidebarProps) => {
  const user = useSelector((state: RootState) => state.user.user);
  const location = useLocation();
  const { pathname } = location;
  const sidebar = useRef<HTMLDivElement>(null);

  if (!user) return null;

  return (
    <aside
      ref={sidebar}
      className={`fixed inset-y-0 left-0 z-50 h-screen w-72 flex-col overflow-y-auto bg-orange-50 shadow-lg transition-transform duration-300 ease-in-out
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex`}
      style={{ boxShadow: '2px 0 10px rgba(0,0,0,0.1)' }}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-2 px-6 py-6 bg-orange-100 w-full">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 bg-orange-600 rounded-full">
            <span className="text-white text-xl font-bold">D</span>
          </div>
          <span className="text-orange-600 text-lg font-bold">DeliveryYa</span>
        </NavLink>
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear px-4 py-4 w-full">
        <nav className="mt-2 w-full">
          <h3 className="mb-4 ml-2 text-sm font-semibold text-orange-500">
            MENÚ
          </h3>
          <ul className="flex flex-col gap-2 w-full">
            <li>
              <NavLink
                to="/list-restaurant"
                className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium duration-300 ease-in-out hover:bg-orange-100 ${pathname.includes('/list-restaurant') && 'bg-orange-100'
                  }`}
              >
                <FaUtensils className="text-orange-600" />
                Restaurantes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/list-driver"
                className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium duration-300 ease-in-out hover:bg-orange-100 ${pathname.includes('/list-driver') && 'bg-orange-100'
                  }`}
              >
                <FaUserTie className="text-orange-600" />
                Conductores
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/list-menu"
                className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium duration-300 ease-in-out hover:bg-orange-100 ${pathname.includes('/list-menu') && 'bg-orange-100'
                  }`}
              >
                <MdRestaurantMenu className="text-orange-600" />
                Menús
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/list-motorcycle"
                className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium duration-300 ease-in-out hover:bg-orange-100 ${pathname.includes('/list-motorcycle') && 'bg-orange-100'
                  }`}
              >
                <FaMotorcycle className="text-orange-600" />
                Motocicletas
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/list-product"
                className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium duration-300 ease-in-out hover:bg-orange-100 ${pathname.includes('/list-product') && 'bg-orange-100'
                  }`}
              >
                <FaBoxOpen className="text-orange-600" />
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/list-customer"
                className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium duration-300 ease-in-out hover:bg-orange-100 ${pathname.includes('/list-customer') && 'bg-orange-100'
                  }`}
              >
                <FaUser className="text-orange-600" />
                Clientes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/list-order"
                className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium duration-300 ease-in-out hover:bg-orange-100 ${pathname.includes('/list-order') && 'bg-orange-100'
                  }`}
              >
                <FaClock className="text-orange-600" />
                Pedidos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/list-address"
                className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium duration-300 ease-in-out hover:bg-orange-100 ${pathname.includes('/list-address') && 'bg-orange-100'
                  }`}
              >
                <FaMapMarkerAlt className="text-orange-600" />
                Direcciones
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/list-photo"
                className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium duration-300 ease-in-out hover:bg-orange-100 ${pathname.includes('/list-photo') && 'bg-orange-100'
                  }`}
              >
                <MdPhotoCamera className="text-orange-600" />
                Fotos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/list-issue"
                className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium duration-300 ease-in-out hover:bg-orange-100 ${pathname.includes('/list-issue') && 'bg-orange-100'
                  }`}
              >
                <FaExclamationCircle className="text-orange-600" />
                Problemas
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/charts"
                className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium duration-300 ease-in-out hover:bg-orange-100 ${pathname.includes('/charts') && 'bg-orange-100'
                  }`}
              >
                <FaClipboardList className="text-orange-600" />
                Estadísticas
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;