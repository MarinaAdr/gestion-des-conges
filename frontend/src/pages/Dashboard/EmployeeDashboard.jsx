import React, { useState, useEffect } from 'react';
import { HiCalendar, HiClock, HiClipboardList } from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaFileAlt } from 'react-icons/fa';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [conges, setConges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState(null);

  const formattedDate = format(new Date(), 'dd MMMM', { locale: fr });

  // Fonction pour récupérer les données de l'employé
  const fetchEmployeeData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/employees/${user.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setEmployeeData(response.data.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données employé:', error);
      toast.error('Erreur lors de la récupération des données employé');
    }
  };

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
    fetchEmployeeData();
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

  // Calculer le nombre de demandes en attente
  const demandesEnAttente = conges.filter(conge => conge.statut === 'en_attente').length;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* En-tête */}
        <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
            Bonjour, {user.nom} {user.prenom} 
            <span className="animate-wave">👋</span>
          </h1>
          <p className="text-xl bg-blue-50 text-blue-600 rounded-full px-6 py-2 font-medium">
            {formattedDate}
          </p>
        </div>

        {/* Cartes statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Solde congés */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-blue-50 rounded-xl">
                <HiCalendar className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-xl text-gray-600 font-medium mb-2">Solde congés</p>
                <p className="text-3xl font-bold text-gray-800">
                  {employeeData ? (
                    `${employeeData.solde_conge} jours`
                  ) : (
                    <span className="animate-pulse">Chargement...</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Congés pris */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-green-50 rounded-xl">
                <HiClock className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-xl text-gray-600 font-medium mb-2">Congés pris</p>
                <p className="text-3xl font-bold text-gray-800">
                  {conges.filter(c => c.statut === 'approuve').length} jours
                </p>
              </div>
            </div>
          </div>

          {/* Demandes en cours */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-yellow-50 rounded-xl">
                <HiClipboardList className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <p className="text-xl text-gray-600 font-medium mb-2">Demandes en cours</p>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-gray-800">
                    {loading ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      demandesEnAttente
                    )}
                  </p>
                  <p className="text-lg text-gray-500">
                    {demandesEnAttente === 0 ? 'Aucune demande en attente' :
                     demandesEnAttente === 1 ? '1 demande en attente' :
                     `${demandesEnAttente} demandes en attente`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dernières demandes */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Mes dernières demandes</h2>
            <span className="text-xl bg-blue-50 text-blue-600 px-6 py-2 rounded-full font-medium">
              {conges.length} {conges.length > 1 ? 'demandes' : 'demande'}
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : conges.length === 0 ? (
            <div className="text-center py-12 text-xl text-gray-500">
              Aucune demande de congés
            </div>
          ) : (
            <div className="space-y-6">
              {conges.map((conge) => (
                <div 
                  key={conge.id} 
                  className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <span className="text-xl font-medium text-gray-700">Congés</span>
                    <span className={`px-4 py-2 rounded-full text-lg font-medium ${getStatusColor(conge.statut)}`}>
                      {translateStatus(conge.statut)}
                    </span>
                  </div>
                  <div className="text-lg space-y-3">
                    <p className="flex items-center gap-3 text-gray-600">
                      <HiCalendar className="text-blue-500 w-6 h-6" />
                      Du {formatDate(conge.date_debut)} au {formatDate(conge.date_fin)}
                    </p>
                    <p className="flex items-center gap-3 text-gray-500 italic">
                      <FaFileAlt className="text-blue-500 w-5 h-5" />
                      "{conge.motif}"
                    </p>
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