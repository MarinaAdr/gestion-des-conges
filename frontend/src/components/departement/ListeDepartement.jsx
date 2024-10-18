import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartementButton } from '../../utils/DepartementHelper';
import axios from 'axios';

const ListeDepartement = () => {
  const [departements, setDepartements] = useState([]);
  const [depLoading, setDepLoading] = useState(false);

  useEffect(() => {
    const fetchDepartements = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/departements', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.departements.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            nom_departement: dep.nom_departement,
            action: <DepartementButton />,
          }));
          setDepartements(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartements();
  }, []);

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-7">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Gestion des départements</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Rechercher par nom"
              className="px-4 py-0.5"
            />
            <Link
              to="/admin-dashboard/ajout-departement"
              className="px-4 py-1 bg-slate-300 rounded text-white"
            >
              Nouveau
            </Link>
          </div>
          <div className='mt-5'>
            <DataTable columns={columns} data={departements} />
          </div>
        </div>
      )}
    </>
  );
};

export default ListeDepartement;
