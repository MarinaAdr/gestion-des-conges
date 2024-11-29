import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa6";
import { MdOutlineTitle } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { LuPencilLine } from "react-icons/lu";



const EmployeeModify = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: 'EMPLOYEE',
    date_embauche: '',
    poste: ''
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        console.log('Fetching employee with ID:', id);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/employees/${id}`);
        console.log('Employee data received:', response.data);
        
        const employeeData = response.data.data;
        
        const formattedDate = employeeData.date_embauche ? 
          new Date(employeeData.date_embauche).toISOString().split('T')[0] : '';

        setFormData({
          nom: employeeData.nom || '',
          prenom: employeeData.prenom || '',
          email: employeeData.email || '',
          password: '',
          role: employeeData.role || 'EMPLOYEE',
          date_embauche: formattedDate,
          poste: employeeData.poste || ''
        });
        setLoading(false);
      } catch (error) {
        console.error('Detailed error:', error.response || error);
        toast.error('Erreur lors de la récupération des données de l\'employé');
        navigate('/employees');
      }
    };

    if (id) {
      fetchEmployee();
    }
  }, [id, navigate]);

  const handleCancel = () => {
    navigate('/employees');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation des champs requis
    if (!formData.nom || !formData.prenom || !formData.email) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Veuillez entrer une adresse email valide');
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        ...(formData.password ? { password: formData.password } : {})
      };

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/employees/${id}`,
        dataToSend
      );
      
      toast.success('Employé modifié avec succès');
      navigate('/employees');
    } catch (error) {
      console.error('Erreur:', error);
      const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de la modification';
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    
      <div className="min-h-screen md:mr-80 bg-gradient-to-br from-blue-50 to-white py-4 md:py-8 px-2 sm:px-4 md:px-6 lg:px-8 animate-fadeIn">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4 md:mb-8 bg-white p-4 md:p-8 rounded-xl shadow-lg border-l-4 border-blue-600 transform hover:scale-[1.02] transition-all duration-300">
            <button
              onClick={() => navigate('/employees')}
              className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <FaArrowLeft className="mr-2" />
              <span>Retour à la liste</span>
            </button>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 flex items-center flex-wrap animate-slideDown">
              <span className="bg-blue-600 text-white p-2 md:p-3 rounded-lg mr-3 md:mr-4 text-xl md:text-2xl">
                ✏️
              </span>
              Modifier un employé
            </h2>
            <p className="mt-2 md:mt-3 text-lg md:text-xl text-gray-600 ml-4 md:ml-16 animate-slideRight">
              Modifiez les informations de l'employé ci-dessous.
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
                    {formData.password ? 'Nouveau mot de passe (optionnel)' : 'Mot de passe'}
                    {!formData.password && <span className="text-yellow-500 ml-1">*</span>}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!formData.password}
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
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 md:pt-8 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-4 md:px-8 py-3 md:py-4 text-base md:text-xl rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  ❌ Annuler
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 md:px-8 py-3 md:py-4 text-base md:text-xl rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <LuPencilLine className="mr-2 " /> Modifier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    
  );
};

export default EmployeeModify;