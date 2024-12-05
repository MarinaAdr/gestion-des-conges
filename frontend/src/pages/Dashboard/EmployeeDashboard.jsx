import React, { useState, useEffect } from 'react';
import { HiCalendar, HiClock, HiClipboardList, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
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
  const [currentPage, setCurrentPage] = useState(1);
  const congesPerPage = 5;

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

  // Fonction pour calculer le nombre de jours ouvrables entre deux dates
  const calculateWorkingDays = (startDate, endDate) => {
    let days = 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const day = d.getDay();
      if (day !== 0 && day !== 6) { // Exclure les week-ends
        days++;
      }
    }
    return days;
  };

  // Calcul des congés pris (approuvés)
  const congesPris = conges
    .filter(c => c.statut === 'approuve')
    .reduce((total, conge) => {
      return total + calculateWorkingDays(conge.date_debut, conge.date_fin);
    }, 0);

  // Calcul pour la pagination
  const indexOfLastConge = currentPage * congesPerPage;
  const indexOfFirstConge = indexOfLastConge - congesPerPage;
  const currentConges = conges.slice(indexOfFirstConge, indexOfLastConge);
  const totalPages = Math.ceil(conges.length / congesPerPage);

  // Fonction pour changer de page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen animate-fadeIn">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* En-tête */}
        <div className=" p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4 animate-slideDown">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 flex items-center gap-3">
            Bonjour, {user.nom} {user.prenom} 
            <span className="animate-wave">👋</span>
          </h1>
          <p className="text-lg bg-blue-400/10 text-blue-600 rounded-full px-6 py-2 font-medium">
            {formattedDate}
          </p>
        </div>

        {/* Cartes statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-slideUp">
          {/* Solde congés */}
          <div className="relative p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 group">
            <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/30 transition-all duration-500 group-hover:border-blue-400/50"></div>
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 blur transition duration-500 group-hover:opacity-10"></div>
            <div className="relative flex items-center gap-4">
              <div className="flex-shrink-0 p-3 bg-blue-400/10 rounded-xl group-hover:bg-blue-400/20 transition-colors duration-300">
                <HiCalendar className="w-10 h-10 text-blue-500" />
              </div>
              <div className="flex-grow text-center">
                <p className="text-lg text-gray-600 font-medium mb-1 underline decoration-blue-500">Solde congés</p>
                <p className="text-3xl font-bold text-blue-500">
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
          <div className="relative p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 group">
            <div className="absolute inset-0 rounded-2xl border-2 border-green-400/30 transition-all duration-500 group-hover:border-green-400/50"></div>
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-green-400 to-green-500 opacity-0 blur transition duration-500 group-hover:opacity-10"></div>
            <div className="relative flex items-center gap-4">
              <div className="flex-shrink-0 p-3 bg-green-400/10 rounded-xl group-hover:bg-green-400/20 transition-colors duration-300">
                <HiClock className="w-10 h-10 text-green-500" />
              </div>
              <div className="flex-grow text-center">
                <p className="text-lg text-gray-600 font-medium mb-1 underline decoration-green-500">Congés pris</p>
                <p className="text-3xl font-bold text-green-500">
                  {congesPris} jours
                </p>
              </div>
            </div>
          </div>

          {/* Demandes en cours */}
          <div className="relative p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 group">
            <div className="absolute inset-0 rounded-2xl border-2 border-yellow-400/30 transition-all duration-500 group-hover:border-yellow-400/50"></div>
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 blur transition duration-500 group-hover:opacity-10"></div>
            <div className="relative flex items-center gap-4">
              <div className="flex-shrink-0 p-3 bg-yellow-400/10 rounded-xl group-hover:bg-yellow-400/20 transition-colors duration-300">
                <HiClipboardList className="w-10 h-10 text-yellow-500" />
              </div>
              <div className="flex-grow text-center">
                <p className="text-lg text-gray-600 font-medium mb-1 underline decoration-yellow-500">Demandes en cours</p>
                <p className="text-3xl font-bold text-yellow-500">
                  {loading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    demandesEnAttente
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  {demandesEnAttente === 0 ? 'Aucune demande en attente' :
                   demandesEnAttente === 1 ? '1 demande en attente' :
                   `${demandesEnAttente} demandes en attente`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dernières demandes */}
        <div className="bg-white/80 backdrop-blur-sm p-4 md:p-8 rounded-2xl shadow-md animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-700">Mes dernières demandes</h2>
            <span className="text-base md:text-lg bg-blue-400/90 text-white px-4 md:px-5 py-1.5 md:py-2 rounded-full font-medium whitespace-nowrap">
              {conges.length} {conges.length > 1 ? 'demandes' : 'demande'}
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40 animate-pulse">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-transparent"></div>
            </div>
          ) : currentConges.length === 0 ? (
            <div className="text-center py-8 md:py-12 animate-fadeIn">
              <div className="bg-blue-50 rounded-full w-16 md:w-20 h-16 md:h-20 mx-auto flex items-center justify-center mb-4">
                <HiClipboardList className="w-8 md:w-10 h-8 md:h-10 text-blue-400" />
              </div>
              <p className="text-lg md:text-xl text-gray-500">Aucune demande de congés</p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentConges.map((conge, index) => (
                <div 
                  key={conge.id} 
                  className="bg-white p-4 md:p-6 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-100 animate-slideIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-medium text-gray-700">Congés</span>
                      <span className="text-base bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                        {calculateWorkingDays(conge.date_debut, conge.date_fin)} jour{calculateWorkingDays(conge.date_debut, conge.date_fin) > 1 ? 's' : ''}
                      </span>
                    </div>
                    <span className={`px-4 py-1.5 rounded-md text-lg font-medium ${getStatusColor(conge.statut)}`}>
                      {translateStatus(conge.statut)}
                    </span>
                  </div>
                  <div className="text-base space-y-2">
                    <p className="flex items-center gap-3 text-gray-600">
                      <HiCalendar className="text-blue-400 w-5 h-5" />
                      Du {formatDate(conge.date_debut)} au {formatDate(conge.date_fin)}
                    </p>
                    <p className="flex items-center gap-3 text-gray-500 italic">
                      <FaFileAlt className="text-blue-400 w-4 h-4" />
                      "{conge.motif}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination responsive */}
          {totalPages > 1 && (
            <div className="mt-6 md:mt-8 flex justify-center items-center gap-1 md:gap-2 animate-fadeIn">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-blue-200"
              >
                <HiChevronLeft className="w-5 h-5 text-blue-500" />
              </button>
              
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                // Afficher seulement les pages proches de la page courante
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        currentPage === pageNumber
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-blue-500 hover:bg-blue-50 border border-blue-200'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  (pageNumber === currentPage - 2 && pageNumber > 1) ||
                  (pageNumber === currentPage + 2 && pageNumber < totalPages)
                ) {
                  return <span key={pageNumber} className="px-2">...</span>;
                }
                return null;
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-blue-200"
              >
                <HiChevronRight className="w-5 h-5 text-blue-500" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;