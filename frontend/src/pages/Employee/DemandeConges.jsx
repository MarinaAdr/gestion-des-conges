import React, { useState } from 'react';
import { FaCalendarAlt, FaFileAlt, FaPaperPlane } from 'react-icons/fa';
import { MdWorkOff } from 'react-icons/md';
import axios from 'axios';

const DemandeConges = () => {
  const [formData, setFormData] = useState({
    typeConge: '',
    dateDebut: '',
    dateFin: '',
    motif: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation des dates côté client
    const dateDebut = new Date(formData.dateDebut);
    const dateFin = new Date(formData.dateFin);

    if (dateFin < dateDebut) {
      setMessage({
        type: 'error',
        content: 'La date de fin ne peut pas être antérieure à la date de début'
      });
      return;
    }

    setLoading(true);
    setMessage({ type: '', content: '' });

    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      const congeData = {
        user_id: user.id,
        date_debut: formData.dateDebut,
        date_fin: formData.dateFin,
        motif: formData.motif
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/conges`,
        congeData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setMessage({
        type: 'success',
        content: 'Votre demande a été soumise avec succès'
      });
      setFormData({
        typeConge: '',
        dateDebut: '',
        dateFin: '',
        motif: ''
      });
    } catch (error) {
      console.error('Erreur:', error);
      setMessage({
        type: 'error',
        content: error.response?.data?.message || 'Une erreur est survenue'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 h-screen max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          <MdWorkOff className="text-blue-500 text-3xl md:text-4xl" />
          Demande de Congés
        </h1>

        {message.content && (
          <div className={`p-4 rounded-lg mb-4 ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.content}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

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
            disabled={loading}
            className="w-full bg-blue-500 text-xl hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
          >
            {loading ? (
              'Envoi en cours...'
            ) : (
              <>
                <FaPaperPlane />
                Soumettre la demande
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DemandeConges;