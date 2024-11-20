import React, { useState } from 'react';
import NavbarAdmin from '../NavbarAdmin';
import SidebarAdmin from '../SidebarAdmin';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar fixe en haut */}
      <NavbarAdmin onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        {/* Sidebar */}
        <SidebarAdmin 
          className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        />
        
        {/* Main content */}
        <div className="flex-1 lg:ml-64 pt-[80px]">
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout; 