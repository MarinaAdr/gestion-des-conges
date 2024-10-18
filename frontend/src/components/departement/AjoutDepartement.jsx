import React from 'react';

const AjoutDepartement = () => {
  return (
    <div className="max-w-3xl mx-auto mt-[150px] bg-white p-8 rounded-md shadow-md w-96">
      <div>
        <h2 className="text-2xl font-bold mb-6">Nouveau département</h2>
        <form>
          <div>
            <label
              htmlFor="nom_departement"
              className="text-m font-medium text-gray-700"
            >
              Nom du département
            </label>
            <input
              type="text"
              placeholder="Nom département"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md outline-none"
            />
          </div>
          <div className="mt-3">
            <label
              htmlFor="description"
              className="block text-m font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            {' '}Créer{' '}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AjoutDepartement;
