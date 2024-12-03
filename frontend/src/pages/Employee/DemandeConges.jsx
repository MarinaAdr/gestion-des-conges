import React, { useState } from 'react';
import { FaCalendarAlt, FaFileAlt, FaPaperPlane } from 'react-icons/fa';
import { MdWorkOff } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

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

      // Envoi de la demande à l'API
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

      // Préparation des données pour l'email
      const emailParams = {
        to_email: user.email, // Email de l'employé
        to_name: `${user.firstname} ${user.lastname}`,
        start_date: formData.dateDebut,
        end_date: formData.dateFin,
        motif: formData.motif,
      };

      // Envoi de l'email avec EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success('Votre demande a été soumise avec succès et un email a été envoyé à l\'administrateur');
      
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
    <div className="mt-10 flex justify-center p-4 md:p-8 bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 w-full max-w-3xl transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="flex items-center gap-3 text-3xl md:text-4xl font-bold text-blue-700 mb-12 animate-fade-in">
          <MdWorkOff className="text-blue-500 text-4xl md:text-5xl transform hover:scale-110 transition-transform" />
          Demande de Congés
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 transform hover:scale-105 transition-all duration-300">
              <label 
                htmlFor="dateDebut" 
                className="flex text-xl items-center gap-2 text-gray-700 font-medium mb-2"
              >
                <FaCalendarAlt className="text-blue-500 text-2xl" />
                Date de début <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dateDebut"
                required
                value={formData.dateDebut}
                onChange={(e) => setFormData({...formData, dateDebut: e.target.value})}
                className="w-full p-4 text-xl border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all hover:border-blue-300"
              />
            </div>

            <div className="space-y-4 transform hover:scale-105 transition-all duration-300">
              <label 
                htmlFor="dateFin" 
                className="flex text-xl items-center gap-2 text-gray-700 font-medium mb-2"
              >
                <FaCalendarAlt className="text-blue-500 text-2xl" />
                Date de fin <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dateFin"
                required
                value={formData.dateFin}
                onChange={(e) => setFormData({...formData, dateFin: e.target.value})}
                className="w-full p-4 text-xl border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all hover:border-blue-300"
              />
            </div>
          </div>

          <div className="space-y-4 transform hover:scale-105 transition-all duration-300">
            <label 
              htmlFor="motif" 
              className="flex text-xl items-center gap-2 text-gray-700 font-medium mb-2"
            >
              <FaFileAlt className="text-blue-500 text-2xl" />
              Motif <span className="text-red-500">*</span>
            </label>
            <textarea
              id="motif"
              rows={4}
              required
              value={formData.motif}
              onChange={(e) => setFormData({...formData, motif: e.target.value})}
              placeholder="Décrivez la raison de votre demande..."
              className="w-full p-4 text-xl border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none hover:border-blue-300"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading || !formData.dateDebut || !formData.dateFin || !formData.motif}
            className="w-full bg-blue-500 text-xl hover:bg-blue-600 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:bg-gray-400 transform hover:scale-105 hover:shadow-lg"
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
              </div>
            ) : (
              <>
                <FaPaperPlane className="text-2xl" />
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