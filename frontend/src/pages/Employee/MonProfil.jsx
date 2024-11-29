import React, { useState } from 'react';
import { HiCalendar, HiClock, HiClipboardList, HiUser, HiMail, HiOfficeBuilding, HiPhone, HiKey, HiUserGroup, HiSun } from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import axios from 'axios';
import { toast } from 'react-toastify';

const formatDateEmbauche = (dateString) => {
  if (!dateString) return 'Non renseigné';
  return format(new Date(dateString), 'dd/MM/yyyy', { locale: fr });
};

const MonProfil = () => {
  const { user, updateUser } = useAuth();
  const [profileImage, setProfileImage] = useState(user.image || null);
  const formattedDate = format(new Date(), 'dd MMMM', { locale: fr });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom: user.nom || '',
    prenom: user.prenom || '',
    contact: user.contact || '',
    password: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Vérifier si des modifications ont été apportées
    const hasChanges = 
      formData.nom !== user.nom ||
      formData.prenom !== user.prenom ||
      formData.contact !== user.contact ||
      formData.password !== '' ||
      (document.querySelector('input[type="file"]')?.files[0] !== undefined);

    if (!hasChanges) {
      toast.info('Aucune modification effectuée');
      setIsEditing(false);
      return;
    }

    const updatedData = {
      ...formData
    };

    // Si une nouvelle image a été sélectionnée
    if (profileImage) {
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput.files[0]) {
        updatedData.image = fileInput.files[0];
        console.log('Image à envoyer:', fileInput.files[0]);  // Debug
      }
    }

    console.log('Données à envoyer:', updatedData);  // Debug
    
    const result = await updateUser(updatedData);
    
    if (result.success) {
      toast.success('Profile mis à jour avec succès');
      setIsEditing(false);
    } else {
      toast.error(result.error || 'Erreur lors de la mise à jour du profile');
    }
  };

  // Style global pour tous les inputs
  const inputClassName = `w-full p-5 border-2 rounded-xl text-xl outline-none transition-all duration-200 ${
    isEditing 
      ? 'bg-white border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
      : 'bg-blue-50 border-blue-100'
  }`;

  // Style pour les boutons
  const buttonBaseClass = "px-10 py-4 rounded-xl text-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg";
  const primaryButtonClass = `${buttonBaseClass} bg-blue-600 text-white hover:bg-blue-700 hover:scale-105`;
  const secondaryButtonClass = `${buttonBaseClass} bg-gray-500 text-white hover:bg-gray-600 hover:scale-105`;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-10">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <h1 className="text-4xl font-bold text-blue-800">Mon Profil</h1>
        <p className="text-xl text-blue-600 bg-blue-50 rounded-full px-6 py-3">
          {formattedDate}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Section Photo de profil */}
        <div className="col-span-1">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="relative w-56 h-56 mx-auto mb-6">
              {profileImage ? (
                <img
                  src={typeof profileImage === 'string' && profileImage.startsWith('blob:') 
                    ? profileImage 
                    : profileImage.startsWith('http') 
                      ? profileImage 
                      : `${import.meta.env.VITE_API_URL}/uploads/${profileImage}`}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-4 border-blue-200"
                />
              ) : (
                <div className="w-full h-full bg-blue-50 rounded-full flex items-center justify-center border-4 border-blue-200">
                  <HiUser className="w-24 h-24 text-blue-400" />
                </div>
              )}
            </div>
            <label className="bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-800 transition text-xl inline-block">
              Changer la photo
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
        </div>

        {/* Section Informations */}
        <div className="col-span-1 lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-12">
            {/* Informations personnelles */}
            <div>
              <h2 className="text-3xl font-semibold mb-8 text-blue-800 flex items-center gap-4">
                <HiUser className="w-8 h-8" /> Informations personnelles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="flex items-center text-xl font-medium text-blue-700 gap-3 mb-3">
                    <HiUser className="w-7 h-7" /> Nom
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={isEditing ? formData.nom : user.nom}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={inputClassName}
                  />
                </div>
                <div className="space-y-4">
                  <label className="flex items-center text-xl font-medium text-blue-700 gap-3 mb-3">
                    <HiUser className="w-7 h-7" /> Prénom
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={isEditing ? formData.prenom : user.prenom}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={inputClassName}
                  />
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-3xl font-semibold mb-8 text-blue-800 flex items-center gap-4">
                <HiPhone className="w-8 h-8" /> Contact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="flex items-center text-xl font-medium text-blue-700 gap-3 mb-3">
                    <HiMail className="w-7 h-7" /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    readOnly={true}
                    className="w-full p-5 border-2 rounded-xl text-xl bg-blue-50 border-blue-100 outline-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="flex items-center text-xl font-medium text-blue-700 gap-3 mb-3">
                    <HiPhone className="w-7 h-7" /> Téléphone
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={isEditing ? formData.contact : (user.contact || 'Non renseigné')}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={inputClassName}
                  />
                </div>
              </div>
            </div>

            {/* Informations professionnelles */}
            <div>
              <h2 className="text-3xl font-semibold mb-8 text-blue-800 flex items-center gap-4">
                <HiOfficeBuilding className="w-8 h-8" /> Informations professionnelles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="flex items-center text-xl font-medium text-blue-700 gap-3 mb-3">
                    <HiUserGroup className="w-7 h-7" /> Rôle
                  </label>
                  <input
                    type="text"
                    value={user.role || 'Non renseigné'}
                    readOnly
                    className="w-full p-5 border-2 rounded-xl text-xl bg-blue-50 border-blue-100 outline-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="flex items-center text-xl font-medium text-blue-700 gap-3 mb-3">
                    <HiCalendar className="w-7 h-7" /> Date d'embauche
                  </label>
                  <input
                    type="text"
                    value={formatDateEmbauche(user.date_embauche)}
                    readOnly
                    className="w-full p-5 border-2 rounded-xl text-xl bg-blue-50 border-blue-100 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Congés et Sécurité */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Congés */}
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold mb-8 text-blue-800 flex items-center gap-4">
                  <HiSun className="w-8 h-8" /> Congés
                </h2>
                <label className="flex items-center text-xl font-medium text-blue-700 gap-3 mb-3">
                  <HiSun className="w-7 h-7" /> Solde congés
                </label>
                <input
                  type="text"
                  value={`${user.solde_conge || 0} jours`}
                  readOnly
                  className="w-full p-5 border-2 rounded-xl text-xl bg-blue-50 border-blue-100 outline-none"
                />
              </div>

              {/* Sécurité */}
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold mb-8 text-blue-800 flex items-center gap-4">
                  <HiKey className="w-8 h-8" /> Sécurité
                </h2>
                <label className="flex items-center text-xl font-medium text-blue-700 gap-3 mb-3">
                  <HiKey className="w-7 h-7" /> Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={isEditing ? formData.password : '••••••••'}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  placeholder={isEditing ? "Nouveau mot de passe" : ""}
                  className={inputClassName}
                />
              </div>
            </div>

            {/* Boutons de contrôle */}
            <div className="flex flex-col md:flex-row justify-end gap-6 pt-8">
              {isEditing ? (
                <>
                  <button 
                    type="button"
                    onClick={() => setIsEditing(false)} 
                    className={secondaryButtonClass}
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit"
                    className={primaryButtonClass}
                  >
                    Enregistrer
                  </button>
                </>
              ) : (
                <button 
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className={primaryButtonClass}
                >
                  Modifier
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MonProfil;