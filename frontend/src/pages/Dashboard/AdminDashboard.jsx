import React, {useState} from 'react';
import NavbarAdmin from '../../components/NavbarAdmin';
import SidebarAdmin from '../../components/SidebarAdmin';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState (false);

  return (
    <div className="min-h-screen  bg-gray-50">
      <NavbarAdmin onMenuClick={() => setSidebarOpen (!sidebarOpen)} />

      <div className="flex">
        <SidebarAdmin
          className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        />
        
        <div className="flex-1  pt-[20px]">
            <h1>Dashboard</h1>
          <main className="p-6" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
