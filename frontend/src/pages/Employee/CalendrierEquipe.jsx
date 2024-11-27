import React, { useState } from 'react';

const CalendrierEquipe = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Données des congés (à remplacer par vos données réelles)
  const conges = {
    '2024-03-15': { name: 'Marie Dupont', type: 'CP' },
    '2024-03-16': { name: 'Marie Dupont', type: 'CP' },
    '2024-03-18': { name: 'Jean Martin', type: 'RTT' },
  };

  // Jours fériés
  const joursFeries = {
    '2024-01-01': "Jour de l'an",
    '2024-05-01': 'Fête du travail',
    // Ajoutez d'autres jours fériés...
  };

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

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Jours du mois précédent
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 text-gray-400"></div>);
    }

    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      const date = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = new Date().toDateString() === new Date(date).toDateString();
      const conge = conges[date];
      const jourFerie = joursFeries[date];

      days.push(
        <div 
          key={day}
          className={`p-2 border relative min-h-[80px] ${
            isToday ? 'bg-blue-50' : ''
          } ${jourFerie ? 'bg-indigo-50' : ''}`}
        >
          <span className="text-sm">{day}</span>
          {jourFerie && (
            <div className="text-xs p-1 text-indigo-600">
              {jourFerie}
            </div>
          )}
          {conge && (
            <div className={`text-xs p-1 rounded mt-1 ${
              conge.type === 'CP' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
            }`}>
              {conge.name} ({conge.type})
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Calendrier des Congés</h2>
      </div>

      {/* Légende */}
      <div className="mb-4 flex gap-4 bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-100 rounded"></div>
          <span className="text-sm">Congés payés</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 rounded"></div>
          <span className="text-sm">RTT</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-indigo-50 rounded"></div>
          <span className="text-sm">Jours fériés</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 rounded"
        >
          ←
        </button>
        <h2 className="text-xl font-semibold">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button 
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded"
        >
          →
        </button>
      </div>

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map(day => (
          <div key={day} className="p-2 text-center font-semibold text-sm">
            {day}
          </div>
        ))}
      </div>

      {/* Calendrier */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default CalendrierEquipe;