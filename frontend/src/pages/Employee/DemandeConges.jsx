import React, { useState } from 'react';
import { FaCalendarAlt, FaFileAlt, FaPaperPlane } from 'react-icons/fa';
import { MdWorkOff } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';

const DemandeConges = () => {
  const [formData, setFormData] = useState({
    typeConge: '',
    dateDebut: '',
    dateFin: '',
    motif: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation des champs obligatoires
    if (!formData.dateDebut || !formData.dateFin || !formData.motif) {
      toast.error('Tous les champs sont obligatoires');
      return;
    }
    
    // Validation des dates côté client
    const dateDebut = new Date(formData.dateDebut);
    const dateFin = new Date(formData.dateFin);

    if (dateFin < dateDebut) {
      toast.error('La date de fin ne peut pas être antérieure à la date de début');
      return;
    }

    setLoading(true);

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

      toast.success('Votre demande a été soumise avec succès');
      
      // Réinitialiser le formulaire
      setFormData({
        typeConge: '',
        dateDebut: '',
        dateFin: '',
        motif: ''
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(error.response?.data?.message || 'Une erreur est survenue');
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

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="dateDebut" className="flex text-xl items-center gap-2 text-gray-700 font-medium">
                <FaCalendarAlt className="text-blue-500" />
                Date de début <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dateDebut"
                required
                value={formData.dateDebut}
                onChange={(e) => setFormData({...formData, dateDebut: e.target.value})}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dateFin" className="flex text-xl items-center gap-2 text-gray-700 font-medium">
                <FaCalendarAlt className="text-blue-500" />
                Date de fin <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dateFin"
                required
                value={formData.dateFin}
                onChange={(e) => setFormData({...formData, dateFin: e.target.value})}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="motif" className="flex text-xl items-center gap-2 text-gray-700 font-medium">
              <FaFileAlt className="text-blue-500" />
              Motif <span className="text-red-500">*</span>
            </label>
            <textarea
              id="motif"
              rows={4}
              required
              value={formData.motif}
              onChange={(e) => setFormData({...formData, motif: e.target.value})}
              placeholder="Décrivez la raison de votre demande..."
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading || !formData.dateDebut || !formData.dateFin || !formData.motif}
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