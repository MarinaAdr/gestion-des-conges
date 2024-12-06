import React, { useState, useEffect } from 'react';
import { HiCalendar, HiClipboardList, HiChevronDown, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFileAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const RequetesPage = () => {
  const [conges, setConges] = useState([]);
  const [filteredConges, setFilteredConges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedCongeId, setSelectedCongeId] = useState(null);
  const [usersWithConges, setUsersWithConges] = useState([]);
  const formattedDate = format(new Date(), 'dd MMMM yyyy', { locale: fr });
  const { user } = useAuth();

  // Fonction pour récupérer la liste des utilisateurs avec des congés
  const fetchUsersWithConges = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/conges/users-with-conges`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setUsersWithConges(response.data.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      toast.error('Erreur lors de la récupération des utilisateurs');
    }
  };

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
      const congesEnAttente = response.data.data.filter(conge => conge.statut === 'en_attente');
      setConges(congesEnAttente);
    } catch (error) {
      console.error('Erreur lors de la récupération des congés:', error);
      toast.error('Erreur lors de la récupération des congés');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour gérer le changement d'utilisateur sélectionné
  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);
    
    if (userId) {
      const filtered = conges.filter(conge => conge.user_id.toString() === userId);
      setFilteredConges(filtered);
    } else {
      setFilteredConges(conges);
    }
  };

  useEffect(() => {
    fetchConges();
    fetchUsersWithConges();
  }, []);

  useEffect(() => {
    setFilteredConges(conges);
  }, [conges]);

  // Fonction pour formater la date
  const formatDate = (date) => {
    return format(new Date(date), 'dd MMMM yyyy', { locale: fr });
  };

  // Fonction pour gérer l'approbation
  const handleApprove = async (congeId) => {
    try {
      const token = localStorage.getItem('token');
      const conge = conges.find(c => c.id === congeId);

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/conges/${congeId}/status`,
        { statut: 'approuve' },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Préparation et envoi de l'email
      const emailParams = {
        to_email: conge.email, // Email de l'employé
        to_name: `${conge.nom} ${conge.prenom}`,
        from_name: "Gestion des Congés - APP",
        start_date: conge.date_debut,
        end_date: conge.date_fin,
        status: "approuvée",
        motif: conge.motif
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_RESPONSE, // Nouveau template pour les réponses
        emailParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      toast.success('Demande de congé approuvée avec succès et email envoyé', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      fetchConges();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de l\'approbation de la demande');
    }
  };

  // Fonction pour gérer le refus
  const handleReject = async (congeId) => {
    try {
      const token = localStorage.getItem('token');
      const conge = conges.find(c => c.id === congeId);

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/conges/${congeId}/status`,
        { statut: 'refuse' },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Préparation et envoi de l'email
      const emailParams = {
        to_email: conge.email, // Email de l'employé
        to_name: `${conge.nom} ${conge.prenom}`,
        from_name: "Gestion des Congés - APP",
        start_date: conge.date_debut,
        end_date: conge.date_fin,
        status: "refusée",
        motif: conge.motif
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_RESPONSE, // Nouveau template pour les réponses
        emailParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      toast.success('Demande de congé refusée et email envoyé', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      fetchConges();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du refus de la demande');
    }
  };

  // Notification pour les erreurs de chargement
  useEffect(() => {
    fetchConges().catch(() => {
      toast.error('Erreur lors du chargement des demandes', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
    
    fetchUsersWithConges().catch(() => {
      toast.error('Erreur lors du chargement des utilisateurs', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  }, []);

  // Fonction pour calculer le nombre de jours ouvrables entre deux dates
  const calculateWorkingDays = (startDate, endDate) => {
    let count = 0;
    let currentDate = new Date(startDate);
    const lastDate = new Date(endDate);
    
    while (currentDate <= lastDate) {
      // Si ce n'est pas un weekend (0 = dimanche, 6 = samedi)
      const day = currentDate.getDay();
      if (day !== 0 && day !== 6) {
        count++;
      }
      // Passer au jour suivant
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return count;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 bg-gray-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* En-tête avec animation */}
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className=" p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.h1 
              whileHover={{ scale: 1.02 }}
              className="text-2xl md:text-4xl font-bold text-gray-800 flex items-center gap-3"
            >
              Les demandes en attente
            </motion.h1>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              <select 
                className="w-full md:w-auto px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 outline-none transition-all duration-300 hover:border-blue-300"
                value={selectedUserId}
                onChange={handleUserChange}
              >
                <option value="">Tous les utilisateurs</option>
                {usersWithConges.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.nom} {user.prenom}
                  </option>
                ))}
              </select>
              <motion.p 
                whileHover={{ scale: 1.05 }}
                className="text-lg md:text-xl bg-blue-50 text-blue-600 rounded-full px-6 py-2 font-medium shadow-sm"
              >
                {formattedDate}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Liste des demandes */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Liste des requêtes</h2>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="text-lg md:text-xl bg-blue-50 text-blue-600 px-6 py-2 rounded-full font-medium"
            >
              {filteredConges.length} {filteredConges.length > 1 ? 'demandes' : 'demande'} en attente
            </motion.span>
          </div>

          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center h-40"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </motion.div>
          ) : filteredConges.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 text-xl text-gray-500"
            >
              Aucune demande en attente
            </motion.div>
          ) : (
            <AnimatePresence>
              <div className="grid gap-6">
                {filteredConges.map((conge, index) => (
                  <motion.div 
                    key={conge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div 
                      onClick={() => setSelectedCongeId(selectedCongeId === conge.id ? null : conge.id)}
                      className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 cursor-pointer transform hover:scale-[1.01] hover:shadow-lg"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                            <FaUser className="text-blue-500 w-5 h-5" />
                          </div>
                          <span className="text-lg md:text-xl font-medium text-gray-700">
                            {conge.nom} {conge.prenom}
                          </span>
                        </div>
                        
                        <AnimatePresence mode="wait">
                          {selectedCongeId === conge.id ? (
                            <motion.div 
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="flex gap-2"
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleApprove(conge.id);
                                }}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 hover:shadow-md transform hover:scale-105"
                              >
                                Approuver
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleReject(conge.id);
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 hover:shadow-md transform hover:scale-105"
                              >
                                Refuser
                              </button>
                            </motion.div>
                          ) : (
                            <motion.span 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-medium"
                            >
                              En attente
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <div className="text-base md:text-lg space-y-3">
                        <p className="flex items-center gap-3 text-gray-600">
                          <HiCalendar className="text-blue-500 w-6 h-6" />
                          Du {formatDate(conge.date_debut)} au {formatDate(conge.date_fin)}
                          <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            {calculateWorkingDays(conge.date_debut, conge.date_fin)} jours
                          </span>
                        </p>
                        <p className="flex items-center gap-3 text-gray-500 italic">
                          <FaFileAlt className="text-blue-500 w-5 h-5" />
                          "{conge.motif}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RequetesPage;