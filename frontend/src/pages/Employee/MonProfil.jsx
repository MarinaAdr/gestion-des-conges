import React, { useState } from 'react';
import { HiCalendar, HiClock, HiClipboardList, HiUser, HiMail, HiOfficeBuilding, HiPhone, HiKey, HiUserGroup, HiSun } from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const MonProfil = () => {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const formattedDate = format(new Date(), 'dd MMMM', { locale: fr });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Mon Profil</h1>
        <p className="text-gray-600 bg-blue-100 rounded-full px-3 py-1">
          {formattedDate}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Section Photo de profil */}
        <div className="col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="relative w-48 h-48 mx-auto mb-4">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <HiUser className="w-20 h-20 text-gray-400" />
                </div>
              )}
            </div>
            <label className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition">
              Changer la photo
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {/* Section Informations */}
        <div className="col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
            {/* Informations personnelles */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Informations personnelles</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-gray-600">
                    <HiUser className="mr-2" /> Nom
                  </label>
                  <input
                    type="text"
                    value={user.nom}
                    readOnly
                    className="w-full p-2 border rounded-md bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-gray-600">
                    <HiUser className="mr-2" /> Prénom
                  </label>
                  <input
                    type="text"
                    value={user.prenom}
                    readOnly
                    className="w-full p-2 border rounded-md bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Contact</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-gray-600">
                    <HiMail className="mr-2" /> Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full p-2 border rounded-md bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-gray-600">
                    <HiPhone className="mr-2" /> Téléphone
                  </label>
                  <input
                    type="tel"
                    value={user.contact || 'Non renseigné'}
                    readOnly
                    className="w-full p-2 border rounded-md bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Informations professionnelles */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Informations professionnelles</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-gray-600">
                    <HiUserGroup className="mr-2" /> Rôle
                  </label>
                  <input
                    type="text"
                    value={user.role || 'Non renseigné'}
                    readOnly
                    className="w-full p-2 border rounded-md bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-gray-600">
                    <HiCalendar className="mr-2" /> Date d'embauche
                  </label>
                  <input
                    type="text"
                    value={user.date_embauche}
                    readOnly
                    className="w-full p-2 border rounded-md bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Congés et Sécurité - Structure corrigée */}
            <div className="grid grid-cols-2 gap-6">
              {/* Congés */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Congés</h2>
                <label className="flex items-center text-gray-600">
                  <HiSun className="mr-2" /> Solde congés 
                </label>
                <input
                  type="text"
                  value={`${user.solde_conges || 0} jours`}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-50"
                />
              </div>

              {/* Sécurité */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Sécurité</h2>
                <label className="flex items-center text-gray-600">
                  <HiKey className="mr-2" /> Mot de passe
                </label>
                <input
                  type="password"
                  value="••••••••"
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-50"
                />
              </div>
            </div>

            {/* Bouton Modifier */}
            <div className="flex justify-end mt-6">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonProfil;