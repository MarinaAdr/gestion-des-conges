import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../NavbarAdmin';
import SidebarAdmin from '../SidebarAdmin';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Navbar fixe en haut */}
      <NavbarAdmin onMenuClick={handleMenuClick} />
      
      {/* Container pour Sidebar et Contenu Principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
          <SidebarAdmin />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 