import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa6";
import { MdOutlineTitle } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';



const EmployeesForm = () => {
  const navigate = useNavigate();
  
  const initialFormState = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: 'EMPLOYEE',
    date_embauche: '',
    poste: '',
    solde_conge: 22,
    contact: '',
    image_profile: null,
    image_preview: null
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleCancel = () => {
    navigate('/admin/employees');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image_profile: file,
        image_preview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Créer l'objet de données
      const employeeData = {
        nom: formData.nom.trim(),
        prenom: formData.prenom.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        date_embauche: formData.date_embauche,
        poste: formData.poste.trim(),
        solde_conge: formData.solde_conge,
        contact: formData.contact.trim()
      };

      console.log('Données à envoyer:', employeeData);

      // Premier appel pour créer l'employé
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/employees`,
        employeeData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Si une image est sélectionnée, faire un deuxième appel pour l'upload
      if (formData.image_profile) {
        const imageFormData = new FormData();
        imageFormData.append('image', formData.image_profile);

        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/employees/${response.data.data.id}/image`,
          imageFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }

      console.log('Réponse du serveur:', response.data);
      toast.success('Employé créé avec succès');
      navigate('/admin/employees', { replace: true });

    } catch (error) {
      console.error('Erreur complète:', error);
      console.error('Réponse du serveur:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || 'Une erreur est survenue';
      toast.error(errorMessage);
    }
  };

  return (
    
      <div className="min-h-screen md:mr-80 py-4 md:py-8 px-2 sm:px-4 md:px-6 lg:px-8 animate-fadeIn">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4 md:mb-8 bg-white p-4 md:p-8 rounded-xl shadow-lg border-l-4 border-blue-600 transform hover:scale-[1.02] transition-all duration-300">
            <button
              onClick={() => navigate('/admin/employees')}
              className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <FaArrowLeft className="mr-2" />
              <span>Retour à la liste</span>
            </button>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 flex items-center flex-wrap animate-slideDown">
              <span className="bg-blue-600 text-white p-2 md:p-3 rounded-lg mr-3 md:mr-4 text-xl md:text-2xl">
                <FaPlus />
              </span>
              Ajouter un nouvel employé
            </h2>
            <p className="mt-2 md:mt-3 text-lg md:text-xl text-gray-600 ml-4 md:ml-16 animate-slideRight">
              Remplissez les informations ci-dessous pour créer un employé.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-10 border border-gray-100 hover:shadow-2xl transition-all duration-500 animate-slideUp">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="form-group transform hover:scale-[1.02] transition-all duration-300">
                  <label className="block text-lg md:text-xl font-semibold text-gray-700 mb-2 md:mb-3 flex items-center">
                    <span className="text-xl md:text-2xl mr-2"><FaUser /></span> Nom
                    <span className="text-yellow-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-5 py-3 md:py-4 text-base md:text-xl rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none hover:border-blue-300"
                    placeholder="Entrez le nom"
                  />
                </div>

                <div className="form-group transform hover:scale-[1.02] transition-all duration-300">
                  <label className="block text-lg md:text-xl font-semibold text-gray-700 mb-2 md:mb-3 flex items-center">
                    <span className="text-xl md:text-2xl mr-2"><FaUser /></span> Prénom
                    <span className="text-yellow-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-5 py-3 md:py-4 text-base md:text-xl rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none hover:border-blue-300"
                    placeholder="Entrez le prénom"
                  />
                </div>

                <div className="form-group transform hover:scale-[1.02] transition-all duration-300">
                  <label className="block text-lg md:text-xl font-semibold text-gray-700 mb-2 md:mb-3 flex items-center">
                    <span className="text-xl md:text-2xl mr-2"><MdEmail /></span> Email
                    <span className="text-yellow-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-5 py-3 md:py-4 text-base md:text-xl rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none hover:border-blue-300"
                    placeholder="exemple@email.com"
                  />
                </div>

                <div className="form-group transform hover:scale-[1.02] transition-all duration-300">
                  <label className="block text-lg md:text-xl font-semibold text-gray-700 mb-2 md:mb-3 flex items-center">
                    <span className="text-xl md:text-2xl mr-2"><FaLock /></span> 
                    Mot de passe
                    <span className="text-yellow-500 ml-1">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-5 py-3 md:py-4 text-base md:text-xl rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none hover:border-blue-300"
                    placeholder="••••••••"
                  />
                </div>

                <div className="form-group transform hover:scale-[1.02] transition-all duration-300">
                  <label className="block text-lg md:text-xl font-semibold text-gray-700 mb-2 md:mb-3 flex items-center">
                    <span className="text-xl md:text-2xl mr-2"><FaUserCheck /></span> Rôle
                    <span className="text-yellow-500 ml-1">*</span>
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 md:px-5 py-3 md:py-4 text-base md:text-xl rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none hover:border-blue-300 bg-white"
                  >
                    <option value="EMPLOYEE">Employé</option>
                    <option value="ADMIN">Administrateur</option>
                  </select>
                </div>

                <div className="form-group transform hover:scale-[1.02] transition-all duration-300">
                  <label className="block text-lg md:text-xl font-semibold text-gray-700 mb-2 md:mb-3 flex items-center">
                    <span className="text-xl md:text-2xl mr-2"><FaCalendarCheck /></span> Date d'embauche
                    <span className="text-yellow-500 ml-1">*</span>
                  </label>
                  <input
                    type="date"
                    name="date_embauche"
                    value={formData.date_embauche}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-5 py-3 md:py-4 text-base md:text-xl rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none hover:border-blue-300"
                  />
                </div>

                <div className="form-group transform hover:scale-[1.02] transition-all duration-300">
                  <label className="block text-lg md:text-xl font-semibold text-gray-700 mb-2 md:mb-3 flex items-center">
                    <span className="text-xl md:text-2xl mr-2"><FaCalendarDay /></span>
                    Solde de congés
                  </label>
                  <input
                    type="number"
                    name="solde_conge"
                    value={formData.solde_conge}
                    onChange={handleChange}
                    className="w-full px-3 md:px-5 py-3 md:py-4 text-base md:text-xl rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none hover:border-blue-300"
                    min="0"
                    placeholder="22"
                  />
                </div>

                <div className="form-group transform hover:scale-[1.02] transition-all duration-300">
                  <label className="block text-lg md:text-xl font-semibold text-gray-700 mb-2 md:mb-3 flex items-center">
                    <span className="text-xl md:text-2xl mr-2"><FaPhone /></span> Contact
                    <span className="text-yellow-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-5 py-3 md:py-4 text-base md:text-xl rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none hover:border-blue-300"
                    placeholder="Ex: +261 34 00 000 00"
                  />
                </div>

                <div className="md:col-span-2 transform hover:scale-[1.02] transition-all duration-300">
                  <label className="block text-lg md:text-xl font-semibold text-gray-700 mb-2 md:mb-3 flex items-center">
                    <span className="text-xl md:text-2xl mr-2"><MdOutlineTitle /></span> Poste
                    <span className="text-yellow-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="poste"
                    value={formData.poste}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-5 py-3 md:py-4 text-base md:text-xl rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none hover:border-blue-300"
                    placeholder="Entrez le poste"
                  />
                </div>

                <div className="md:col-span-2 transform hover:scale-[1.02] transition-all duration-300">
                  <label className="block text-lg md:text-xl font-semibold text-gray-700 mb-2 md:mb-3 flex items-center">
                    <span className="text-xl md:text-2xl mr-2"><FaCloudUploadAlt /></span>
                    Photo de profil
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="w-full flex items-center justify-center px-3 md:px-5 py-3 md:py-4 text-base md:text-xl rounded-lg border-2 border-dashed border-blue-400 hover:border-blue-600 cursor-pointer bg-blue-50 hover:bg-blue-100 transition-all duration-300"
                      >
                        <FaCloudUploadAlt className="mr-2" />
                        Choisir une image
                      </label>
                    </div>
                    {formData.image_preview && (
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-400">
                        <img
                          src={formData.image_preview}
                          alt="Aperçu"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 md:pt-8 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-4 md:px-8 py-3 md:py-4 text-base md:text-xl rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  <FaTimes className="inline mr-2" /> Annuler
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 md:px-8 py-3 md:py-4 text-base md:text-xl rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaPlus className="inline mr-2" /> Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    
  );
};

export default EmployeesForm;