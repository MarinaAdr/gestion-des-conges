import React, { useState } from 'react';
import { FaCalendarAlt, FaFileAlt, FaPaperPlane } from 'react-icons/fa';
import { MdWorkOff } from 'react-icons/md';

const DemandeConges = () => {
  const [formData, setFormData] = useState({
    typeConge: '',
    dateDebut: '',
    dateFin: '',
    motif: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Ajouter la logique d'envoi ici
  };

  return (
    <div className="p-4 md:p-8 h-screen max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          <MdWorkOff className="text-blue-500 text-3xl md:text-4xl" />
          Demande de Congés
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="typeConge" className="flex text-xl items-center gap-2 text-gray-700 font-medium">
              <FaFileAlt className="text-blue-500" />
              Type de congé
            </label>
            <select
              id="typeConge"
              value={formData.typeConge}
              onChange={(e) => setFormData({...formData, typeConge: e.target.value})}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            >
              <option value="">Sélectionnez un type</option>
              <option value="congé payé">Congé payé</option>
              <option value="congé sans solde">Congé sans solde</option>
              <option value="congé maladie">Congé maladie</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="dateDebut" className="flex text-xl items-center gap-2 text-gray-700 font-medium">
                <FaCalendarAlt className="text-blue-500" />
                Date de début
              </label>
              <input
                type="date"
                id="dateDebut"
                value={formData.dateDebut}
                onChange={(e) => setFormData({...formData, dateDebut: e.target.value})}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dateFin" className="flex text-xl items-center gap-2 text-gray-700 font-medium">
                <FaCalendarAlt className="text-blue-500" />
                Date de fin
              </label>
              <input
                type="date"
                id="dateFin"
                value={formData.dateFin}
                onChange={(e) => setFormData({...formData, dateFin: e.target.value})}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="motif" className="flex text-xl items-center gap-2 text-gray-700 font-medium">
              <FaFileAlt className="text-blue-500" />
              Motif
            </label>
            <textarea
              id="motif"
              rows={4}
              value={formData.motif}
              onChange={(e) => setFormData({...formData, motif: e.target.value})}
              placeholder="Décrivez la raison de votre demande..."
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-xl hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <FaPaperPlane />
            Soumettre la demande
          </button>
        </form>
      </div>
    </div>
  );
};

export default DemandeConges;