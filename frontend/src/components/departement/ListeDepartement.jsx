import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { DepartementButton } from '../../utils/DepartementHelper';
import axios from 'axios';
import { Spinner } from "@material-tailwind/react";

const ListeDepartement = () => {
  const [departements, setDepartements] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filtreDepartements, setFiltreDepartements] = useState([]);

  const onSupprimerDepartement = async (id) => {
    try {
      // Appel à l'API pour supprimer le département
      const response = await axios.delete(`http://localhost:8080/api/departement/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        // Mise à jour des états locaux seulement après confirmation de la suppression
        const nouveauxDepartements = departements.filter(dep => dep._id !== id)
          .map((dep, index) => ({
            ...dep,
            sno: index + 1
          }));
        
        setDepartements(nouveauxDepartements);
        setFiltreDepartements(nouveauxDepartements);
        
        // Notification de succès optionnelle
        alert('Département supprimé avec succès');
      }
    } catch (error) {
      // Gestion des erreurs
      const messageErreur = error.response?.data?.error || 'Erreur lors de la suppression du département';
      alert(messageErreur);
    }
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.sno,
      sortable: true
    },
    {
      name: "Nom département",
      selector: (row) => row.nom_departement,
      sortable: true
    },
    {
      name: "Action",
      cell: (row) => (
        <DepartementButton 
          _id={row._id}
          onSupprimerDepartement={onSupprimerDepartement}
        />
      )
    }
  ];

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
          setFiltreDepartements(data);
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

  const filtrerDepartement = (e) => {
    const records = departements.filter((dep) => 
      dep.nom_departement.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFiltreDepartements(records);
  };

   // Styles personnalisés pour DataTable
   const customStyles = {
    table: {
      style: {
        backgroundColor: 'white',
        borderRadius: '0.75rem',
      },
    },
    headRow: {
      style: {
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        color: '#64748b',
        fontSize: '0.875rem',
        fontWeight: 500,
      },
    },
    headCells: {
      style: {
        padding: '16px 24px',
      },
    },
    cells: {
      style: {
        padding: '16px 24px',
        color: '#475569',
      },
    },
    rows: {
      style: {
        '&:not(:last-of-type)': {
          borderBottom: '1px solid #f1f5f9',
        },
        '&:hover': {
          backgroundColor: '#f8fafc',
        },
      },
    },
    pagination: {
      style: {
        borderTop: '1px solid #e2e8f0',
        padding: '16px 24px',
      },
    },
  };

  return (
    <div className="mt-10  bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {depLoading ? (
          <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-violet-600 border-t-transparent"></div>
              <span>
              <Spinner className="h-12 w-12" />
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* En-tête avec titre et description */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-slate-900">Gestion des départements</h2>
                <p className="text-sm text-slate-500">Gérez et organisez vos départements</p>
              </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                {/* Barre de recherche */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher par nom..."
                    className="pl-4 pr-4 py-2 rounded-lg  border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                    onChange={filtrerDepartement}
                  />
                </div>

                {/* Bouton Nouveau */}
                <Link
                  to="/admin-dashboard/ajout-departement"
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
           

            {/* Table avec effet de carte */}
            <div className="bg-white mt-5 rounded-xl shadow-sm overflow-hidden">
              <DataTable 
                columns={columns}
                data={filtreDepartements}
                pagination
                customStyles={customStyles}
                noDataComponent={
                  <div className="flex flex-col items-center justify-center p-8 text-slate-500">
                    <p>Aucun département trouvé</p>
                  </div>
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListeDepartement;