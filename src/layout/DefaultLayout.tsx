import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/SideBar';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Provider store={store}>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 overflow-y-auto pt-16 lg:pl-72">
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default DefaultLayout;
