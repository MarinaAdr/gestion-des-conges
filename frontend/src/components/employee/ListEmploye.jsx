import React from 'react';
import { Link } from 'react-router-dom';

const listEmploye = () => {
  return (
    <div className="p-6 bg-slate-100">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Gestion des employés</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Rechercher par nom"
          className="px-4 py-0.5"
          //   onChange={filtrerDepartement}
        />
        <Link
          to="/admin-dashboard/ajout-employe"
          className="px-4 py-1 bg-slate-300 rounded text-white"
        >
          Nouveau
        </Link>
      </div>
    </div>
  );
};

export default listEmploye;
