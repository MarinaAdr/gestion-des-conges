import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

const CalendrierPage = () => {
  const [currentDate, setCurrentDate] = useState (new Date ());
  const [selectedDate, setSelectedDate] = useState (null);
  const [isEditing, setIsEditing] = useState (false);
  const [newHolidayName, setNewHolidayName] = useState ('');
  const [joursFeries, setJoursFeries] = useState ({
    '2024-01-01': "Jour de l'an",
    '2024-04-01': 'Lundi de Pâques',
    '2024-05-01': 'Fête du travail',
    '2024-05-08': 'Victoire 1945',
    '2024-05-09': 'Ascension',
    '2024-05-20': 'Lundi de Pentecôte',
    '2024-07-14': 'Fête nationale',
    '2024-08-15': 'Assomption',
    '2024-11-01': 'Toussaint',
    '2024-11-11': 'Armistice 1918',
    '2024-12-25': 'Noël',
  });
  const [congesApprouves, setCongesApprouves] = useState ([]);

  // Fonction pour récupérer les congés approuvés
  const fetchCongesApprouves = async () => {
    try {
      const token = localStorage.getItem ('token');
      const response = await axios.get (
        `${import.meta.env.VITE_API_URL}/api/conges`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      // Filtrer uniquement les congés approuvés
      const approuves = response.data.data.filter (conge => conge.statut === 'approuve');
      setCongesApprouves (approuves);
    } catch (error) {
      console.error ('Erreur lors de la récupération des congés:', error);
      toast.error ('Erreur lors de la récupération des congés');
    }
  };

  useEffect (() => {
    fetchCongesApprouves ();
  }, []);

  const isDateInConge = date => {
    return congesApprouves.some (conge => {
      const debutConge = new Date (conge.date_debut);
      const finConge = new Date (conge.date_fin);
      const currentDate = new Date (date);
      return currentDate >= debutConge && currentDate <= finConge;
    });
  };

  const getCongesForDate = date => {
    return congesApprouves.filter (conge => {
      const debutConge = new Date (conge.date_debut);
      const finConge = new Date (conge.date_fin);
      const currentDate = new Date (date);
      return currentDate >= debutConge && currentDate <= finConge;
    });
  };

  const getDaysInMonth = date => {
    return new Date (date.getFullYear (), date.getMonth () + 1, 0).getDate ();
  };

  const getFirstDayOfMonth = date => {
    return new Date (date.getFullYear (), date.getMonth (), 1).getDay ();
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String (month + 1).padStart (2, '0')}-${String (day).padStart (2, '0')}`;
  };

  const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];
  const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const previousMonth = () => {
    setCurrentDate (
      new Date (currentDate.getFullYear (), currentDate.getMonth () - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate (
      new Date (currentDate.getFullYear (), currentDate.getMonth () + 1)
    );
  };

  const handleAddHoliday = date => {
    if (newHolidayName.trim ()) {
      setJoursFeries (prev => ({
        ...prev,
        [date]: newHolidayName.trim (),
      }));
      setNewHolidayName ('');
      setIsEditing (false);
      setSelectedDate (null);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth (currentDate);
    const firstDayOfMonth = getFirstDayOfMonth (currentDate);
    const days = [];

    // Jours du mois précédent
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push (<div key={`empty-${i}`} className="p-2 text-gray-400" />);
    }

    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      const date = formatDate (
        currentDate.getFullYear (),
        currentDate.getMonth (),
        day
      );
      const isToday =
        new Date ().toDateString () === new Date (date).toDateString ();
      const congesJour = getCongesForDate (date);
      const hasConge = isDateInConge (date);

      days.push (
        <div
          key={day}
          onClick={() => {
            setSelectedDate (date);
            setIsEditing (true);
            setNewHolidayName (joursFeries[date] || '');
          }}
          className={`
            p-3 rounded-lg relative min-h-[100px] cursor-pointer
            transition-all duration-200 ease-in-out
            ${isToday ? 'bg-blue-50 ring-2 ring-blue-200' : ''}
            ${joursFeries[date] ? 'bg-violet-50' : ''}
            ${hasConge ? 'bg-green-50' : ''}
            hover:bg-gray-50
          `}
        >
          <div className="flex justify-between">
            <span
              className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}
            >
              {day}
            </span>
          </div>
          {joursFeries[date] && (
            <div className="text-xs p-1.5 text-violet-600 font-medium">
              {joursFeries[date]}
            </div>
          )}
          {congesJour.map ((conge, index) => (
            <div
              key={`${conge.id}-${index}`}
              className="text-xs p-1.5 mt-1 bg-green-100 text-green-800 rounded-md"
            >
              {conge.nom} {conge.prenom}
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            Calendrier des Congés
          </h2>
        </div>

        {/* Légende */}
        <div className="mb-6 flex flex-wrap gap-6 bg-gray-50/50 p-4 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-violet-200 rounded-md" />
            <span className="text-sm text-gray-600">Jours fériés</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-200 rounded-md" />
            <span className="text-sm text-gray-600">Congés approuvés</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={previousMonth}
            className="p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h2 className="text-2xl font-semibold text-gray-800">
            {months[currentDate.getMonth ()]} {currentDate.getFullYear ()}
          </h2>
          <button
            onClick={nextMonth}
            className="p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Jours de la semaine */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {days.map (day => (
            <div
              key={day}
              className="p-2 text-center font-medium text-sm text-gray-600"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendrier */}
        <div className="grid grid-cols-7 gap-2">
          {renderCalendar ()}
        </div>
      </div>
    </div>
  );
};

export default CalendrierPage;
