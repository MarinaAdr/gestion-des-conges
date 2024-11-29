import React, { useState, useEffect } from 'react';
import { HiCalendar, HiClock, HiClipboardList } from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [conges, setConges] = useState([]);
  const [loading, setLoading] = useState(true);

  const formattedDate = format(new Date(), 'dd MMMM', { locale: fr });

  // Fonction pour récupérer les congés
  const fetchConges = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/conges/user/${user.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setConges(response.data.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des congés:', error);
      toast.error('Erreur lors de la récupération des congés');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConges();
  }, [user.id]);

  // Fonction pour formater la date
  const formatDate = (date) => {
    return format(new Date(date), 'dd MMMM yyyy', { locale: fr });
  };

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status) => {
    const statusColors = {
      en_attente: 'bg-yellow-100 text-yellow-800',
      approuve: 'bg-green-100 text-green-800',
      refuse: 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  // Fonction pour traduire le statut
  const translateStatus = (status) => {
    const statusTranslations = {
      en_attente: 'En attente',
      approuve: 'Approuvé',
      refuse: 'Refusé'
    };
    return statusTranslations[status] || status;
  };

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
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : conges.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucune demande de congés
            </div>
          ) : (
            <div className="space-y-4">
              {conges.map((conge) => (
                <div key={conge.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Congés</span>
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(conge.statut)}`}>
                      {translateStatus(conge.statut)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Du {formatDate(conge.date_debut)} au {formatDate(conge.date_fin)}</p>
                    <p className="text-gray-500 italic">"{conge.motif}"</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    
      </div>
    </div>
  );
};

export default EmployeeDashboard;