import React, { useState } from 'react';

const CalendrierPage  = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newHolidayName, setNewHolidayName] = useState('');
  const [joursFeries, setJoursFeries] = useState({
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
  });

  // Données des congés (à remplacer par vos données réelles)
  const conges = {
    '2024-03-15': { name: 'Marie Dupont', type: 'CP', status: 'approved' },
    '2024-03-16': { name: 'Marie Dupont', type: 'CP', status: 'approved' },
    '2024-03-18': { name: 'Jean Martin', type: 'RTT', status: 'pending' },
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
          onClick={() => {
            setSelectedDate(date);
            setIsEditing(true);
            setNewHolidayName(joursFeries[date] || '');
          }}
          className={`
            p-3 rounded-lg relative min-h-[100px] cursor-pointer
            transition-all duration-200 ease-in-out
            ${isToday ? 'bg-blue-50 ring-2 ring-blue-200' : 'hover:bg-gray-50'}
            ${jourFerie ? 'bg-violet-50' : ''}
          `}
        >
          <div className="flex justify-between">
            <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
              {day}
            </span>
          </div>
          {jourFerie && (
            <div className="text-xs p-1.5 text-violet-600 font-medium">
              {jourFerie}
            </div>
          )}
          {conge && (
            <div className={`text-xs p-1 rounded mt-1 ${
              conge.type === 'CP' 
                ? conge.status === 'approved' 
                  ? 'bg-orange-200 text-orange-800' 
                  : 'bg-orange-100 text-orange-800'
                : conge.status === 'approved'
                  ? 'bg-green-200 text-green-800'
                  : 'bg-green-100 text-green-800'
            }`}>
              {conge.name} ({conge.type})
            </div>
          )}
          {selectedDate === date && isEditing && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
              <div className="bg-white p-4 rounded shadow-lg" onClick={e => e.stopPropagation()}>
                <input
                  type="text"
                  value={newHolidayName}
                  onChange={(e) => setNewHolidayName(e.target.value)}
                  placeholder="Nom du jour férié"
                  className="border rounded p-2 mb-2 w-full"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddHoliday(date)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Ajouter
                  </button>
                  <button
                    onClick={() => {
                      setJoursFeries(prev => {
                        const newJoursFeries = { ...prev };
                        delete newJoursFeries[selectedDate];
                        return newJoursFeries;
                      });
                      setIsEditing(false);
                      setNewHolidayName('');
                      setSelectedDate(null);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setNewHolidayName('');
                      setSelectedDate(null);
                    }}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Calendrier des Congés</h2>
        </div>

        {/* Légende */}
        <div className="mb-6 flex flex-wrap gap-6 bg-gray-50/50 p-4 rounded-xl">
          
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-violet-200 rounded-md"></div>
            <span className="text-sm text-gray-600">Jours fériés</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={previousMonth}
            className="p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-2xl font-semibold text-gray-800">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button 
            onClick={nextMonth}
            className="p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Jours de la semaine */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {days.map(day => (
            <div key={day} className="p-2 text-center font-medium text-sm text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendrier */}
        <div className="grid grid-cols-7 gap-2">
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default CalendrierPage;