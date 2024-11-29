import React, { useState, useEffect } from 'react';
import { HiCalendar, HiClipboardList } from 'react-icons/hi';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaFileAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const RequetesPage = () => {
  const [conges, setConges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCongeId, setSelectedCongeId] = useState(null);
  const formattedDate = format(new Date(), 'dd MMMM', { locale: fr });
  const { user } = useAuth();
  // Fonction pour récupérer toutes les demandes en attente
  const fetchConges = async () => {
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
      // Filtrer pour ne garder que les congés en attente
      const congesEnAttente = response.data.data.filter(conge => conge.statut === 'en_attente');
      setConges(congesEnAttente);
    } catch (error) {
      console.error('Erreur lors de la récupération des congés:', error);
      toast.error('Erreur lors de la récupération des congés');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConges();
  }, []);

  // Fonction pour formater la date
  const formatDate = (date) => {
    return format(new Date(date), 'dd MMMM yyyy', { locale: fr });
  };

  // Fonction pour gérer l'approbation
  const handleApprove = async (congeId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/conges/${congeId}/status`,
        { statut: 'approuve' },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      toast.success('Demande approuvée avec succès');
      fetchConges(); // Rafraîchir la liste
    } catch (error) {
      toast.error('Erreur lors de l\'approbation de la demande');
    }
  };

  // Fonction pour gérer le refus
  const handleReject = async (congeId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/conges/${congeId}/status`,
        { statut: 'refuse' },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      toast.success('Demande refusée');
      fetchConges(); // Rafraîchir la liste
    } catch (error) {
      toast.error('Erreur lors du refus de la demande');
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* En-tête */}
        <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
            Demandes en attente
            <HiClipboardList className="text-blue-600" />
          </h1>
          <p className="text-xl bg-blue-50 text-blue-600 rounded-full px-6 py-2 font-medium">
            {formattedDate}
          </p>
        </div>

        {/* Liste des demandes */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Liste des requêtes</h2>
            <span className="text-xl bg-blue-50 text-blue-600 px-6 py-2 rounded-full font-medium">
              {conges.length} {conges.length > 1 ? 'demandes' : 'demande'} en attente
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : conges.length === 0 ? (
            <div className="text-center py-12 text-xl text-gray-500">
              Aucune demande en attente
            </div>
          ) : (
            <div className="space-y-6">
              {conges.map((conge) => (
                <div 
                  key={conge.id} 
                  className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedCongeId(selectedCongeId === conge.id ? null : conge.id)}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <FaUser className="text-blue-500" />
                      <span className="text-xl font-medium text-gray-700">
                        {conges.user_nom} {conges.employee_prenom}
                      </span>
                    </div>
                    {selectedCongeId === conge.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(conge.id);
                          }}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          Approuver
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(conge.id);
                          }}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Refuser
                        </button>
                      </div>
                    ) : (
                      <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg">
                        En attente
                      </span>
                    )}
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

export default RequetesPage;