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
      className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-orange-50 shadow-lg duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-2 px-6 py-6 bg-orange-100">
        <NavLink to="/">
          <h1 className="text-xl font-bold text-orange-600">(logo-pagina) </h1>
        </NavLink>
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear px-4 py-4">
        <nav className="mt-2">
          <h3 className="mb-4 ml-2 text-sm font-semibold text-orange-500">
            MENÚ
          </h3>
          <ul className="flex flex-col gap-2">
            {/* Menu Item */}

            {/* RESTAURANTES */}
            <li>
              <NavLink
                to="/list-restaurant"
                className={`group flex items-center gap-3 rounded-md py-2 px-3 font-medium text-orange-700 transition-colors duration-200 hover:bg-orange-200 ${
                  pathname.includes('list-restaurant') ? 'bg-orange-300 text-white' : ''
                }`}
              >
                <FaUtensils className="text-orange-500 group-hover:text-orange-800" size={20} />
                Restaurants
              </NavLink>
            </li>
            {/* RESTAURANTES */}

            {/* DRIVERS */}
            <li>
              <NavLink
                to="/list-driver"
                className={`group flex items-center gap-3 rounded-md py-2 px-3 font-medium text-orange-700 transition-colors duration-200 hover:bg-orange-200 ${
                  pathname.includes('list-driver') ? 'bg-orange-300 text-white' : ''
                }`}
              >
                <FaUserTie className="text-orange-500 group-hover:text-orange-800" size={20} />
                Drivers
              </NavLink>
            </li>
            {/* DRIVERS */}
            
            {/* MOTOS */}
            <li>
              <NavLink
                to="/list-motorcycle"
                className={`group flex items-center gap-3 rounded-md py-2 px-3 font-medium text-orange-700 transition-colors duration-200 hover:bg-orange-200 ${
                  pathname.includes('list-motorcycle') ? 'bg-orange-300 text-white' : ''
                }`}
              >
                <FaMotorcycle className="text-orange-500 group-hover:text-orange-800" size={20} />            
                Motorcycles
              </NavLink>
            </li>
            {/* MOTOS */}
            
            {/* CUSTOMERS */}
            <li>
              <NavLink
                to="/list-customers"
                className={`group flex items-center gap-3 rounded-md py-2 px-3 font-medium text-orange-700 transition-colors duration-200 hover:bg-orange-200 ${
                  pathname.includes('list-customers') ? 'bg-orange-300 text-white' : ''
                }`}
              >
                <FaUser className="text-orange-500 group-hover:text-orange-800" size={20} />
                Customers
              </NavLink>
            </li>
            {/* CUSTOMERS */}

            {/* ADDRESS */}
            <li>
              <NavLink
                to="/list-address"
                className={`group flex items-center gap-3 rounded-md py-2 px-3 font-medium text-orange-700 transition-colors duration-200 hover:bg-orange-200 ${
                  pathname.includes('list-address') ? 'bg-orange-300 text-white' : ''
                }`}
              >
                <FaMapMarkerAlt className="text-orange-500 group-hover:text-orange-800" size={20} />
                Address
              </NavLink>
            </li>
            {/* ADDRESS */}

            {/* ISSUES */}
            <li>
              <NavLink
                to="/list-issues"
                className={`group flex items-center gap-3 rounded-md py-2 px-3 font-medium text-orange-700 transition-colors duration-200 hover:bg-orange-200 ${
                  pathname.includes('list-issues') ? 'bg-orange-300 text-white' : ''
                }`}
              >
                <FaExclamationCircle className="text-orange-500 group-hover:text-orange-800" size={20} />
                Issues
              </NavLink>
            </li>
            {/* ISSUES */}

            {/* SHIFTS */}
            <li>
              <NavLink
                to="/list-shifts"
                className={`group flex items-center gap-3 rounded-md py-2 px-3 font-medium text-orange-700 transition-colors duration-200 hover:bg-orange-200 ${
                  pathname.includes('list-shifts') ? 'bg-orange-300 text-white' : ''
                }`}
              >
                <FaClock className="text-orange-500 group-hover:text-orange-800" size={20} />
                Shifts
              </NavLink>
            </li>
            {/* SHIFTS */}

            {/* PHOTOS */}
            <li>
              <NavLink
                to="/list-photos"
                className={`group flex items-center gap-3 rounded-md py-2 px-3 font-medium text-orange-700 transition-colors duration-200 hover:bg-orange-200 ${
                  pathname.includes('list-photos') ? 'bg-orange-300 text-white' : ''
                }`}
              >
                <  MdPhotoCamera className="text-orange-500 group-hover:text-orange-800" size={20} />
                Photos
              </NavLink>
            </li>
              
            {/* ORDER */}
            <li>
              <NavLink
                to="/list-orders"
                className={`group flex items-center gap-3 rounded-md py-2 px-3 font-medium text-orange-700 transition-colors duration-200 hover:bg-orange-200 ${
                  pathname.includes('list-orders') ? 'bg-orange-300 text-white' : ''
                }`}
              >
                <FaClipboardList className="text-orange-500 group-hover:text-orange-800" size={20} />
                Order
              </NavLink>
            </li>
              
            {/* MENU */}
            <li>
              <NavLink
                to="/list-menus"
                className={`group flex items-center gap-3 rounded-md py-2 px-3 font-medium text-orange-700 transition-colors duration-200 hover:bg-orange-200 ${
                  pathname.includes('list-menus') ? 'bg-orange-300 text-white' : ''
                }`}
              >
                <MdRestaurantMenu className="text-orange-500 group-hover:text-orange-800" size={20} />
                Menu
              </NavLink>
            </li>
              
            {/* PRODUCT */}
            <li>
              <NavLink
                to="/list-products"
                className={`group flex items-center gap-3 rounded-md py-2 px-3 font-medium text-orange-700 transition-colors duration-200 hover:bg-orange-200 ${
                  pathname.includes('list-products') ? 'bg-orange-300 text-white' : ''
                }`}
              >
                <FaBoxOpen className="text-orange-500 group-hover:text-orange-800" size={20} />
                Product
              </NavLink>
            </li>

            {/* CHARTS */}
            <li>
              <NavLink
                to="/charts"
                className={`group flex items-center gap-3 rounded-md py-2 px-3 font-medium text-orange-700 transition-colors duration-200 hover:bg-orange-200 ${
                  pathname.includes('charts') ? 'bg-orange-300 text-white' : ''
                }`}
              >
                <FaBoxOpen className="text-orange-500 group-hover:text-orange-800" size={20} />
                Charts
              </NavLink>
            </li>

            {/* Menu Item */}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
