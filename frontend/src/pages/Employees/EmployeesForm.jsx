import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
const EmployeesForm = ({ employee, onSubmit }) => {
  const navigate = useNavigate();
  
  // État initial du formulaire
  const initialFormState = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: 'EMPLOYEE',
    date_embauche: '',
    poste: ''
  };

  const [formData, setFormData] = useState(employee ? {
    nom: employee.nom || '',
    prenom: employee.prenom || '',
    email: employee.email || '',
    password: '',
    role: employee.role || 'EMPLOYEE',
    date_embauche: employee.date_embauche || '',
    poste: employee.poste || ''
  } : initialFormState);

  // Fonction pour gérer l'annulation
  const handleCancel = () => {
    setFormData(initialFormState); // Réinitialise le formulaire
    
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
    try {
      if (employee) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/employees/${employee.id}`, formData);
        toast.success('Employé modifié avec succès!');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/employees`, formData);
        toast.success('Employé créé avec succès!');
      }
      navigate('/employees');
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de l\'enregistrement');
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8 animate-fadeIn">
        <div className="max-w-5xl mx-auto">
          {/* En-tête avec effet moderne */}
          <div className="mb-8 bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600 transform hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-4xl font-bold text-gray-800 flex items-center animate-slideDown">
              <span className="bg-blue-600 text-white p-3 rounded-lg mr-4 text-2xl">
                {employee ? '✏️' : '➕'}
              </span>
              {employee ? 'Modifier un employé' : 'Ajouter un nouvel employé'}
            </h2>
            <p className="mt-3 text-xl text-gray-600 ml-16 animate-slideRight">
              Remplissez les informations ci-dessous pour {employee ? 'modifier' : 'créer'} un employé.
            </p>
          </div>

          {/* Formulaire avec design moderne */}
          <div className="bg-white rounded-xl shadow-lg p-10 border border-gray-100 hover:shadow-2xl transition-all duration-500 animate-slideUp">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Nom */}
                <div className="form-group transform hover:scale-[1.02] transition-all duration-300">
                  <label className="block text-xl font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="text-2xl mr-2">👤</span> Nom
                    <span className="text-yellow-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 text-xl rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none hover:border-blue-300"
                      placeholder="Entrez le nom"
                    />
                  </div>
                </div>

                {/* Prénom */}
                <div className="form-group transform hover:scale-[1.02] transition-all duration-300">
                  <label className="block text-xl font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="text-2xl mr-2">👤</span> Prénom
                    <span className="text-yellow-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 text-xl rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none hover:border-blue-300"
                    placeholder="Entrez le prénom"
                  />
                </div>

                {/* Email */}
                <div className="form-group transform hover:scale-[1.02] transition-all duration-300">
                  <label className="block text-xl font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="text-2xl mr-2">📧</span> Email
                    <span className="text-yellow-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 text-xl rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none hover:border-blue-300"
                    placeholder="exemple@email.com"
                  />
                </div>

                {/* Mot de passe */}
                <div className="form-group transform hover:scale-[1.02] transition-all duration-300">
                  <label className="block text-xl font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="text-2xl mr-2">🔒</span> 
                    {employee ? 'Nouveau mot de passe (optionnel)' : 'Mot de passe'}
                    {!employee && <span className="text-yellow-500 ml-1">*</span>}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!employee}
                    className="w-full px-5 py-4 text-xl rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none hover:border-blue-300"
                    placeholder="••••••••"
                  />
                </div>

                {/* Rôle */}
                <div className="form-group transform hover:scale-[1.02] transition-all duration-300">
                  <label className="block text-xl font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="text-2xl mr-2">👑</span> Rôle
                    <span className="text-yellow-500 ml-1">*</span>
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-5 py-4 text-xl rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none hover:border-blue-300 bg-white"
                  >
                    <option value="EMPLOYEE">Employé</option>
                    <option value="ADMIN">Administrateur</option>
                  </select>
                </div>

                {/* Date d'embauche */}
                <div className="form-group transform hover:scale-[1.02] transition-all duration-300">
                  <label className="block text-xl font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="text-2xl mr-2">📅</span> Date d'embauche
                    <span className="text-yellow-500 ml-1">*</span>
                  </label>
                  <input
                    type="date"
                    name="date_embauche"
                    value={formData.date_embauche}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 text-xl rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none hover:border-blue-300"
                  />
                </div>

                {/* Poste */}
                <div className="md:col-span-2 transform hover:scale-[1.02] transition-all duration-300">
                  <label className="block text-xl font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="text-2xl mr-2">💼</span> Poste
                    <span className="text-yellow-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="poste"
                    value={formData.poste}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 text-xl rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none hover:border-blue-300"
                    placeholder="Entrez le poste"
                  />
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end space-x-4 pt-8 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-8 py-4 text-xl rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  ❌ Annuler
                </button>
                <button
                  type="submit"
                  className="px-8 py-4 text-xl rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {employee ? '✏️ Modifier' : '✅ Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EmployeesForm;