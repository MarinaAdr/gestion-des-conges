import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const CalendrierEquipe = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [congesApprouves, setCongesApprouves] = useState([]);

  // Liste complète des jours fériés en France pour 2024
  const joursFeries = {
    '2024-01-01': "Jour de l'an",
    '2024-04-01': "Lundi de Pâques",
    '2024-05-01': "Fête du travail",
    '2024-05-08': "Victoire 1945",
    '2024-05-09': "Ascension",
    '2024-05-20': "Lundi de Pentecôte",
    '2024-07-14': "Fête nationale",
    '2024-08-15': "Assomption",
    '2024-11-01': "Toussaint",
    '2024-11-11': "Armistice 1918",
    '2024-12-25': "Noël"
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      // Récupérer les congés approuvés
      const congesResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/conges`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const approuves = congesResponse.data.data.filter(conge => conge.statut === 'approuve');
      console.log('Congés approuvés:', approuves);
      setCongesApprouves(approuves);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      setCongesApprouves([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <motion.div 
          key={`empty-${i}`} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="p-2 text-gray-400 bg-gray-50/30 rounded-lg"
        />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = new Date().toDateString() === new Date(date).toDateString();
      
      const congesJour = congesApprouves.filter(conge => {
        const debutDate = new Date(conge.date_debut);
        const finDate = new Date(conge.date_fin);
        const currentDate = new Date(date);
        
        debutDate.setHours(0, 0, 0, 0);
        finDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        
        return currentDate >= debutDate && currentDate <= finDate;
      });

      console.log(`Congés pour le ${date}:`, congesJour);

      days.push(
        <motion.div 
          key={day}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: day * 0.01,
            type: "spring",
            stiffness: 100
          }}
          className={`
            p-4 rounded-xl relative min-h-[120px]
            transition-all duration-300 ease-in-out
            backdrop-blur-sm border
            ${isToday ? 'bg-blue-50/70 ring-2 ring-blue-200 border-blue-200' : 'border-gray-100'}
            ${joursFeries[date] ? 'bg-violet-50/70 border-violet-200' : ''}
            ${congesJour.length > 0 ? 'bg-orange-50/70 border-orange-200' : ''}
          `}
        >
          <div className="flex justify-between items-center mb-2">
            <span className={`
              font-medium rounded-full w-7 h-7 flex items-center justify-center
              ${isToday ? 'bg-blue-500 text-white' : 'text-gray-700'}
            `}>
              {day}
            </span>
          </div>

          <div className="space-y-1.5">
            {joursFeries[date] && (
              <div className="text-xs p-1.5 text-violet-600 font-medium bg-violet-50 rounded-lg">
                {joursFeries[date]}
              </div>
            )}
            {congesJour.map((conge, index) => (
              <motion.div
                key={`${conge.id}-${index}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-xs p-2 bg-orange-100/80 text-orange-800 rounded-lg font-medium shadow-sm"
              >
                {conge.nom} {conge.prenom}
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    }

    return days;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-4 md:p-8"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100"
      >
        <motion.div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            Calendrier des Congés
          </h2>
        </motion.div>

        {/* Légende */}
        <motion.div className="mb-6 flex flex-wrap gap-4 bg-gray-50/50 p-4 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-violet-50 border border-violet-200 rounded-md"></div>
            <span className="text-sm text-gray-600">Jours fériés</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-50 border border-orange-200 rounded-md"></div>
            <span className="text-sm text-gray-600">Congés approuvés</span>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <HiChevronLeft className="w-6 h-6 text-gray-600" />
          </motion.button>
          <h2 className="text-2xl font-semibold text-gray-800">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <HiChevronRight className="w-6 h-6 text-gray-600" />
          </motion.button>
        </div>

        {/* Jours de la semaine */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {days.map(day => (
            <motion.div 
              key={day}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-2 text-center font-medium text-sm text-gray-600 rounded-lg bg-gray-50"
            >
              {day}
            </motion.div>
          ))}
        </div>

        {/* Calendrier */}
        <div className="grid grid-cols-7 gap-2">
          {renderCalendar()}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CalendrierEquipe;