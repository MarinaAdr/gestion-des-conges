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
    { path: '/employee/dashboard', icon: <HiHome className="w-6 h-6" />, text: 'Dashboard' },
    { path: '/employee/solde-conges', icon: <HiDocumentText className="w-6 h-6" />, text: 'Solde de congés' },
    { path: '/employee/demande-conges', icon: <HiDocumentText className="w-6 h-6" />, text: 'Demande de congés' },
    { path: '/employee/mon-profil', icon: <HiUser className="w-6 h-6" />, text: 'Mon profil' },
    { path: '/employee/calendrier-equipe', icon: <HiCalendar className="w-6 h-6" />, text: 'Calendrier d\'équipe' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-full text-white hover:bg-blue-500 transition-all duration-300"
      >
        <HiMenuAlt2 className="w-6 h-6" />
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40
        h-full w-80 
        bg-gradient-to-b from-blue-400 to-blue-600
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-[calc(100vh-80px)]
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        shadow-xl
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
                  px-4 py-5 rounded-xl
                  text-left text-xl font-medium
                  transition-all duration-300 transform hover:scale-105
                  ${location.pathname === item.path
                    ? 'bg-white bg-opacity-20 text-white shadow-lg'
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                  }
                `}
              >
                {item.icon}
                <span className="tracking-wide">{item.text}</span>
              </button>
            ))}
          </nav>

          {/* Sign Out Button */}
          <div className="px-4 mt-auto">
            <button
              onClick={() => {
                navigate('/login');
                setIsMobileMenuOpen(false);
              }}
              className="
                w-full flex items-center gap-4
                px-4 py-5 rounded-xl
                text-left text-xl font-medium text-white
                hover:bg-white hover:bg-opacity-10
                transition-all duration-300 transform hover:scale-105
              "
            >
              <HiLogout className="w-6 h-6" />
              <span className="tracking-wide">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default EmployeeSidebar;