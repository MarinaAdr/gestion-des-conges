import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const CalendrierPage  = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newHolidayName, setNewHolidayName] = useState('');
  const [joursFeries, setJoursFeries] = useState({
    '2025-01-01': "Jour de l'an",
    '2024-04-01': "Lundi de Pâques",
    '2025-05-01': "Fête du travail",
    '2024-05-08': "Victoire 1945",
    '2024-05-09': "Ascension",
    '2024-05-20': "Lundi de Pentecôte",
    '2025-06-26': "Fête nationale",
    '2024-08-15': "Assomption",
    '2024-11-01': "Toussaint",
    '2024-12-25': "Noël"
  });
  const [congesApprouves, setCongesApprouves] = useState([]);

  const fetchCongesApprouves = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/conges`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const approuves = response.data.data.filter(conge => conge.statut === 'approuve');
      setCongesApprouves(approuves);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  useEffect(() => {
    fetchCongesApprouves();
  }, []);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleAddHoliday = (date) => {
    if (newHolidayName.trim()) {
      setJoursFeries(prev => ({
        ...prev,
        [date]: newHolidayName.trim()
      }));
      setNewHolidayName('');
      setIsEditing(false);
      setSelectedDate(null);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Jours vides du mois précédent
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

    // Jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      const date = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = new Date().toDateString() === new Date(date).toDateString();
      
      const congesJour = congesApprouves.filter(conge => {
        const debut = new Date(conge.date_debut);
        const fin = new Date(conge.date_fin);
        const currentDate = new Date(date);
        return currentDate >= debut && currentDate <= fin;
      });

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
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
          onClick={() => {
            setSelectedDate(date);
            setIsEditing(true);
            setNewHolidayName(joursFeries[date] || '');
          }}
          className={`
            p-4 rounded-xl relative min-h-[120px] cursor-pointer
            transition-all duration-300 ease-in-out
            backdrop-blur-sm border
            hover:shadow-lg
            ${isToday ? 'bg-blue-50/70 ring-2 ring-blue-200 border-blue-200' : 'hover:bg-gray-50/80 border-gray-100'}
            ${joursFeries[date] ? 'bg-violet-50/70 border-violet-200' : ''}
            ${congesJour.length > 0 ? 'bg-orange-50/70 border-orange-200' : ''}
          `}
        >
          {/* En-tête du jour */}
          <div className="flex justify-between items-center mb-2">
            <span className={`
              font-medium rounded-full w-7 h-7 flex items-center justify-center
              ${isToday ? 'bg-blue-500 text-white' : 'text-gray-700'}
            `}>
              {day}
            </span>
            {joursFeries[date] && (
              <div className="text-xs px-2 py-1 bg-violet-100 text-violet-700 rounded-full font-medium">
                Férié
              </div>
            )}
          </div>

          {/* Contenu du jour */}
          <div className="space-y-1.5">
            {joursFeries[date] && (
              <div className="text-xs p-1.5 text-violet-600 font-medium group flex justify-between items-center bg-violet-50 rounded-lg">
                <span>{joursFeries[date]}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const newJoursFeries = { ...joursFeries };
                    delete newJoursFeries[date];
                    setJoursFeries(newJoursFeries);
                  }}
                  className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50 rounded-full p-1"
                >
                  ×
                </button>
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

          {/* Modal d'édition */}
          {selectedDate === date && isEditing && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-sm p-3 rounded-xl flex flex-col gap-2 border border-gray-200 shadow-lg"
            >
              <input
                type="text"
                value={newHolidayName}
                onChange={(e) => setNewHolidayName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Nom du jour férié"
              />
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddHoliday(date);
                  }}
                  className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  {joursFeries[date] ? 'Modifier' : 'Ajouter'}
                </button>
                {joursFeries[date] && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newJoursFeries = { ...joursFeries };
                      delete newJoursFeries[date];
                      setJoursFeries(newJoursFeries);
                      setIsEditing(false);
                      setSelectedDate(null);
                    }}
                    className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    Supprimer
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(false);
                    setSelectedDate(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </motion.div>
          )}
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
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            Calendrier des Congés
          </h2>
        </motion.div>

        {/* Légende modernisée */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6 flex flex-wrap gap-4 bg-gray-50/50 p-4 rounded-xl backdrop-blur-sm"
        >
          {[
            { bg: 'bg-violet-50', border: 'border-violet-200', text: 'Jours fériés' },
            { bg: 'bg-orange-50', border: 'border-orange-200', text: 'Congés approuvés' },
            { bg: 'bg-blue-50', border: 'border-blue-200', text: 'Aujourd\'hui' }
          ].map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/50 transition-colors duration-300"
            >
              <div className={`w-4 h-4 ${item.bg} border ${item.border} rounded-md`}></div>
              <span className="text-sm text-gray-600 whitespace-nowrap">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation modernisée */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6"
        >
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={previousMonth}
            className="p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <HiChevronLeft className="w-6 h-6 text-gray-600" />
          </motion.button>
          <motion.h2 
            className="text-2xl font-semibold text-gray-800 px-4 py-2 rounded-full bg-gray-50"
          >
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </motion.h2>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextMonth}
            className="p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <HiChevronRight className="w-6 h-6 text-gray-600" />
          </motion.button>
        </motion.div>

        {/* Jours de la semaine modernisés */}
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

        {/* Calendrier avec animation */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentDate.getMonth()}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="grid grid-cols-7 gap-2"
          >
            {renderCalendar()}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default CalendrierPage;