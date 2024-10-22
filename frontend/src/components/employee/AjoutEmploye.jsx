import React from 'react';

const AjoutEmploye = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Ajouter un nouvel employé
      </h2>
      <form action="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* nom */}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Name

            </label>
            <input
              type="text"
              name="name"
              placeholder="Entrer votre nom"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* email */}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Email

            </label>
            <input
              type="email"
              name="email"
              placeholder="Entrer votre email"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Employe Id */}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Employé Id

            </label>
            <input
              type="text"
              name="employeeId"
              placeholder="Votre Id"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* date de naissance  */}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Date de naissance

            </label>
            <input
              type="date"
              name="dateDeNaissance"
              placeholder="00/00/00"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Genre */}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Genre

            </label>
            <select
              name="genre"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Choisir</option>
              <option value="masculin">masculin</option>
              <option value="féminin">féminin</option>
            </select>
          </div>

          {/* désignation */}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Désignation

            </label>
            <input
              type="text"
              name="designation"
              placeholder="Désignation"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Départements */}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Département

            </label>
            <select
              name="departement"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Choisir votre département</option>
            </select>

          </div>

          {/* salaire */}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Salaire

            </label>
            <input
              type="number"
              name="salaire"
              placeholder="Salaire"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* mot de passe */}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Mot de passe

            </label>
            <input
              type="password"
              name="password"
              placeholder="**********"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* role */}
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Role

            </label>
            <select
              name="role"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Choisir role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employé</option>
            </select>
          </div>
          {/* Profile  */}

          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Importer un profil

            </label>
            <input
              type="file"
              name="image"
              placeholder="Importer"
              accept="image/*"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>

        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Ajouter
        </button>
      </form>

    </div>
  );
};

export default AjoutEmploye;
