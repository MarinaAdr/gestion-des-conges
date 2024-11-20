import React from 'react';
import { RiMenuLine, RiNotificationLine, RiUserLine } from 'react-icons/ri';

const NavbarAdmin = ({ onMenuClick }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="min-h-[80px] px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between h-full py-4">
          {/* Logo et Titre */}
          <div className="flex items-center flex-grow w-full sm:w-auto mb-4 sm:mb-0">
            <button 
              onClick={onMenuClick}
              className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              {/* <RiMenuLine className="text-indigo-900 text-4xl" /> */}
            </button>
            <h1 className="text-2xl sm:text-2xl text-indigo-900 sans-serif font-medium ml-2 truncate">
              Gestion des congés
            </h1>
          </div>

          {/* Icônes de droite */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <button className="p-2 hover:bg-indigo-50 rounded-lg transition-colors">
              <RiNotificationLine className="text-indigo-900 text-3xl" />
            </button>
            
            <button className="flex items-center p-2 hover:bg-indigo-50 rounded-lg transition-colors">
              <RiUserLine className="text-indigo-900 text-3xl" />
              <span className="ml-2 text-indigo-900 text-xl font-medium hidden md:block">
                Admin
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
