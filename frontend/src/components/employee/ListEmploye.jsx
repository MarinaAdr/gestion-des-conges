import React from 'react';
import { Link } from 'react-router-dom';

const ListEmploye = () => {
  return (
    <div className="mt-10 bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with title and description */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-slate-900">Gestion des employés</h2>
            <p className="text-sm text-slate-500">Gérez et organisez vos employés</p>
          </div>
        </div>

        {/* Search bar and New Employee button */}
        <div className="flex items-center justify-between">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Rechercher par nom"
            className="pl-4 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            // onChange={filtrerEmploye}
          />

          {/* New Employee button */}
          <Link
            to="/admin-dashboard/ajout-employe"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nouveau 
          </Link>
        </div>

        {/* Placeholder for employee list */}
        <div className="bg-white mt-5 rounded-xl shadow-sm overflow-hidden">
          {/* Add your employee table or data here */}
          <div className="p-8 text-center text-slate-500">
            Aucun employé trouvé
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListEmploye;
