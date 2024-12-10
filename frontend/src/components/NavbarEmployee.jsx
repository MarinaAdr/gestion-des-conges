import React from 'react';
import { RiMenuLine, RiUserLine } from 'react-icons/ri';
import { useAuth } from '../contexts/AuthContext';

const NavbarEmployee = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-blue-400  border-blue-300">
      <div className="min-h-[20px] px-4 sm:px-6">
        <div className="flex  items-center justify-center h-[60px] py-4">
          {/* Logo et Titre */}
          <div className="flex items-center flex-grow w-full sm:w-auto mb-4 sm:mb-0">
            <button 
              onClick={onMenuClick}
              className="p-2 hover:bg-blue-300 rounded-lg transition-colors"
            >
              <RiMenuLine className="text-white text-4xl" />
            </button>
            <h1 className="text-2xl sm:text-2xl text-white sans-serif font-medium ml-2 truncate">
              Gestion des congés
            </h1>
          </div>

          {/* Icône utilisateur */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <button className="flex items-center p-2 hover:bg-blue-300 rounded-lg transition-colors">
              {user?.image ? (
                <img 
                  src={user.image.startsWith('http') 
                    ? user.image 
                    : `${import.meta.env.VITE_API_URL}/uploads/${user.image}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-300"
                />
              ) : (
                <RiUserLine className="text-white text-3xl" />
              )}
              <span className="ml-2 text-white text-base font-medium hidden md:block">
                {user?.nom || 'Utilisateur'}
              </span>
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarEmployee;
