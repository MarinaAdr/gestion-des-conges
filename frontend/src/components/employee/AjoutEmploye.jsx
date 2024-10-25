import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AjoutEmploye = () => {
  const [departements, setDepartements] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [formData, setFormData] = useState({})

useEffect(() => {
  const fetchDepartements = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/departement', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        const data = response.data.departements.map((dep, index) => ({
          _id: dep._id,
          sno: index + 1,
          nom_departement: dep.nom_departement,
        }));
        setDepartements(data);
      }
    } catch (error) {
      const messageErreur = error.response?.data?.error || 'Erreur lors du chargement des départements';
      alert(messageErreur);
    } finally {
      setDepLoading(false);
    }
  };

  fetchDepartements();
}, []);

  const handleChange = (e) =>{
    const {name, value, files} = e.targer
    if (name === "image"){
      setFormData((prevData) => ({...prevData, [name] : files[0]}))
    } else{
      setFormData((prevData) => ({...prevData, [name] : value}))
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    const formDataObj = new FormData()
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key])
    })
    try {
      const response = await axios.post(
        'http://localhost:8080/api/employees/ajout',
        formDataObj,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        console.log(response)
        navigate('/admin-dashboard/employees');
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }

  return (
    <div className="relative bg-slate-50 max-w-4xl mx-auto mt-[70px] px-4">
      <div className="absolute -top-4 -right-4 w-full h-full bg-violet-100 rounded-lg transform rotate-2"></div>
      <div className="absolute -bottom-4 -left-4 w-full h-full bg-violet-200 rounded-lg transform -rotate-2"></div>
      
      <div className="relative bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-pacific font-bold mb-6 text-center">
          Ajouter un nouvel employé
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Entrer votre nom"
                className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-violet-500 outline-none transition-colors rounded-md"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Entrer votre email"
                className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-violet-500 outline-none transition-colors rounded-md"
                required
              />
            </div>

            {/* Employe Id */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employé Id
              </label>
              <input
                type="text"
                name="employeeId"
                onChange={handleChange}
                placeholder="Votre Id"
                className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-violet-500 outline-none transition-colors rounded-md"
                required
              />
            </div>

            {/* Date de naissance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de naissance
              </label>
              <input
                type="dateNaissance"
                onChange={handleChange}
                name="dateDeNaissance"
                className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-violet-500 outline-none transition-colors rounded-md"
                required
              />
            </div>

            {/* Genre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Genre
              </label>
              <select
                name="genre"
                onChange={handleChange}
                className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-violet-500 outline-none transition-colors rounded-md"
                required
              >
                <option value="">Choisir</option>
                <option value="masculin">Masculin</option>
                <option value="féminin">Féminin</option>
              </select>
            </div>
            
            {/* Situation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
              Situation matrimoniale
              </label>
              <select
                name="situationMatrimoniale"
                onChange={handleChange}
                className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-violet-500 outline-none transition-colors rounded-md"
                required
              >
                <option value="">Choisir un statut</option>
                <option value="marie">Marié</option>
                <option value="celibataire">Célibataire</option>
             
              </select>
            </div>

            {/* Désignation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Désignation
              </label>
              <input
                type="text"
                name="designation"
                onChange={handleChange}
                placeholder="Désignation"
                className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-violet-500 outline-none transition-colors rounded-md"
                required
              />
            </div>

            {/* Départements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Département
              </label>
              <select
                name="departement"
                onChange={handleChange}
                className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-violet-500 outline-none transition-colors rounded-md"
                required
              >
                <option value="">Choisir votre département</option>
                {departements.map(dep => (
                  <option key={dep._id} value={dep._id}>
                    {dep.nom_departement}
                  </option>
                ))}
              </select>
            </div>

            {/* Salaire */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salaire
              </label>
              <input
                type="number"
                onChange={handleChange}
                name="salaire"
                placeholder="Salaire"
                className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-violet-500 outline-none transition-colors rounded-md"
                required
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                onChange={handleChange}
                name="password"
                placeholder="****"
                className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-violet-500 outline-none transition-colors rounded-md"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rôle
              </label>
              <select
                name="role"
                onChange={handleChange}
                className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-violet-500 outline-none transition-colors rounded-md"
                required
              >
                <option value="">Choisir un rôle</option>
                <option value="admin">Admin</option>
                <option value="employee">Employé</option>
              </select>
            </div>

            {/* Profil */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Importer un profil
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-violet-500 outline-none transition-colors rounded-md"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-violet-500 hover:bg-violet-600 text-white py-3 px-4 rounded-lg transition-colors"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AjoutEmploye;