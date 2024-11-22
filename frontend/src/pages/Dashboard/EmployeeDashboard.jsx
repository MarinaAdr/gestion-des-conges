import React from 'react';
import { HiCalendar, HiClock, HiClipboardList } from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const EmployeeDashboard = () => {
  const { user } = useAuth();

  const formattedDate = format(new Date(), 'dd MMMM', { locale: fr });

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Bonjour, {user.nom} {user.prenom} 👋
        </h1>
        <p className="text-gray-600 bg-blue-100 rounded-full px-3 py-1">
          {formattedDate}
        </p>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Solde congés */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <HiCalendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Solde congés</p>
              <p className="text-2xl font-bold text-gray-800">25 jours</p>
            </div>
          </div>
        </div>

        {/* Congés pris */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <HiClock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Congés pris</p>
              <p className="text-2xl font-bold text-gray-800">12 jours</p>
            </div>
          </div>
        </div>

        {/* Demandes en cours */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <HiClipboardList className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Demandes en cours</p>
              <p className="text-2xl font-bold text-gray-800">2</p>
            </div>
          </div>
        </div>

        
      </div>

      {/* Sections principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dernières demandes */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Mes dernières demandes</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Congés annuels</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  En attente
                </span>
              </div>
              <p className="text-sm text-gray-600">Du 20 au 24 Mai 2024</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">RTT</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Approuvé
                </span>
              </div>
              <p className="text-sm text-gray-600">Le 15 Avril 2024</p>
            </div>
          </div>
        </div>
    
      </div>
    </div>
  );
};

export default EmployeeDashboard;