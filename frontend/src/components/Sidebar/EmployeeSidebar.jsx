import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';
import { 
  HiHome, 
  HiCalendar, 
  HiUser, 
  HiDocumentText,
  HiLogout 
} from 'react-icons/hi';

const EmployeeSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: <HiHome className="w-6 h-6" />, text: 'Dashboard' },
    { path: '/solde-conges', icon: <HiDocumentText className="w-6 h-6" />, text: 'Solde de congés' },
    { path: '/demande-conges', icon: <HiDocumentText className="w-6 h-6" />, text: 'Demande de congés' },
    { path: '/mon-profil', icon: <HiUser className="w-6 h-6" />, text: 'Mon profil' },
    { path: '/calendrier-equipe', icon: <HiCalendar className="w-6 h-6" />, text: 'Calendrier d\'équipe' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-blue-900 hover:bg-blue-50"
      >
        <HiMenuAlt2 className="w-6 h-6" />
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40
        h-full w-80 
        bg-white shadow-lg
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-[calc(100vh-64px)]
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Content */}
        <div className="flex flex-col h-full py-6">
          {/* Menu Items */}
          <nav className="flex-1 px-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 
                  px-4 py-5 rounded-lg
                  text-left text-xl font-medium
                  transition-colors duration-200
                  ${location.pathname === item.path
                    ? 'bg-blue-50 text-blue-900'
                    : 'text-blue-900 hover:bg-blue-50'
                  }
                `}
              >
                {item.icon}
                <span>{item.text}</span>
              </button>
            ))}
          </nav>

          {/* Sign Out Button */}
          <div className="px-4 mt-auto">
            <button
              onClick={() => {
                navigate('/');
                setIsMobileMenuOpen(false);
              }}
              className="
                w-full flex items-center gap-4
                px-4 py-9 rounded-lg
                text-left text-xl font-medium text-blue-900
                hover:bg-blue-50 transition-colors duration-200
              "
            >
              <HiLogout className="w-6 h-6" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default EmployeeSidebar;