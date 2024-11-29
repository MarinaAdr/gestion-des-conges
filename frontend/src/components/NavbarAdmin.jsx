import React, { useState, useEffect } from 'react';
import { RiMenuLine, RiNotificationLine, RiUserLine } from 'react-icons/ri';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const NavbarAdmin = ({ onMenuClick }) => {
  const { user } = useAuth();
  const [pendingRequests, setPendingRequests] = useState(0);

  // Fonction pour récupérer le nombre de demandes en attente
  const fetchPendingRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/conges`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setPendingRequests(response.data.data.length);
    } catch (error) {
      console.error('Erreur lors de la récupération des demandes en attente:', error);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
    // Optionnel : Mettre à jour toutes les X secondes
    const interval = setInterval(fetchPendingRequests, 30000); // 30 secondes
    return () => clearInterval(interval);
  }, []);

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
            <div className="relative">
              <button className="p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                <RiNotificationLine className="text-indigo-900 text-3xl" />
                {pendingRequests > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {pendingRequests}
                  </span>
                )}
              </button>
            </div>
            
            <button className="flex items-center p-2 hover:bg-indigo-50 rounded-lg transition-colors">
              {user?.image ? (
                <img 
                  src={user.image.startsWith('http') 
                    ? user.image 
                    : `${import.meta.env.VITE_API_URL}/uploads/${user.image}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200"
                />
              ) : (
                <RiUserLine className="text-indigo-900 text-3xl" />
              )}
              <span className="ml-2 text-indigo-900 text-xl font-medium hidden md:block">
                {user?.nom || 'Undefined'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
