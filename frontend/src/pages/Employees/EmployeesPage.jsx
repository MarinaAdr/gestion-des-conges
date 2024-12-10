import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { RiSearchLine, RiAddLine, RiEditLine, RiDeleteBinLine } from 'react-icons/ri';
import axios from 'axios';

const EmployeesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/employees`);
      
      if (response.data.success && Array.isArray(response.data.data)) {
        setEmployees(response.data.data);
      } else {
        setError('Format de données incorrect');
        console.error('Format de données reçu:', response.data);
      }
    } catch (err) {
      setError(`Erreur lors du chargement des employés: ${err.message}`);
      console.error('Erreur complète:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [refreshKey]);

  useEffect(() => {
    if (location.state?.refresh) {
      setRefreshKey(prev => prev + 1);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erreur!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </AdminLayout>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const handleEdit = (employeeId) => {
    navigate(`/admin/employees/edit/${employeeId}`);
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/employees/${employeeId}`);
        fetchEmployees();
      } catch (err) {
        setError('Erreur lors de la suppression de l\'employé');
        console.error('Erreur:', err);
      }
    }
  };

  const filteredEmployees = employees.filter(employee => 
    employee.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.prenom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="  w-[98%] mx-auto p-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-4xl font-extrabold text-indigo-800">Gestion des employés</h1>
          <button 
            onClick={() => navigate('/admin/employees/new')} 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <RiAddLine className="mr-2 text-base" />
            <span className="text-lg font-medium">Ajouter un employé</span>
          </button>
        </div>

        <div className="mt-8 max-w-2xl">
          <div className="relative">
            <RiSearchLine className="absolute text-2xl left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Rechercher un employé..."
              className="w-full h-14 pl-12 pr-4 text-lg bg-white outline-none border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-100">
              <tr>
                <th scope="col" className="text-lg px-6 py-4 text-left font-semibold text-indigo-700 tracking-wider">ID</th>
                <th scope="col" className="bg-gray-50 text-lg px-6 py-4 text-left font-semibold text-gray-700 tracking-wider">Nom</th>
                <th scope="col" className="bg-gray-50 text-lg px-6 py-4 text-left font-semibold text-gray-700 tracking-wider">Prénom</th>
                <th scope="col" className="bg-gray-50 text-lg px-6 py-4 text-left font-semibold text-gray-700 tracking-wider">Email</th>
                <th scope="col" className="bg-gray-50 text-lg px-6 py-4 text-left font-semibold text-gray-700 tracking-wider">Rôle</th>
                <th scope="col" className="bg-gray-50 text-lg px-6 py-4 text-left font-semibold text-gray-700 tracking-wider">Date d'embauche</th>
                <th scope="col" className="bg-gray-50 text-lg px-6 py-4 text-left font-semibold text-gray-700 tracking-wider">Poste</th>
                <th scope="col" className="bg-gray-50 text-lg px-6 py-4 text-right font-semibold text-gray-700 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Array.isArray(currentEmployees) && currentEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-indigo-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-lg text-gray-900">{employee.id}</td>
                  <td className="px-6 py-4 text-lg font-medium text-gray-900">{employee.nom}</td>
                  <td className="px-6 py-4 text-lg text-gray-900">{employee.prenom}</td>
                  <td className="px-6 py-4 text-lg text-gray-500">{employee.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full
                      ${employee.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                      {employee.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-lg text-gray-500">{formatDate(employee.date_embauche)}</td>
                  <td className="px-6 py-4 text-lg text-gray-500">{employee.poste}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center gap-4 justify-end">
                      <button
                        onClick={() => handleEdit(employee.id)}
                        className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors duration-150"
                      >
                        <RiEditLine className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-150"
                      >
                        <RiDeleteBinLine className="w-6 h-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-700">
          Affichage de <span className="font-semibold">{indexOfFirstEmployee + 1}</span> à{' '}
          <span className="font-semibold">{Math.min(indexOfLastEmployee, filteredEmployees.length)}</span>{' '}
          sur <span className="font-semibold">{filteredEmployees.length}</span> employés
        </div>
        
        <nav className="inline-flex rounded-lg shadow-sm" aria-label="Pagination">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-4 py-2 rounded-l-lg text-sm font-medium ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
            } border border-gray-200`}
          >
            Précédent
          </button>
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`relative inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                    currentPage === pageNumber
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            } else if (
              pageNumber === currentPage - 2 ||
              pageNumber === currentPage + 2
            ) {
              return (
                <span
                  key={pageNumber}
                  className="relative inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700"
                >
                  ...
                </span>
              );
            }
            return null;
          })}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-4 py-2 rounded-r-lg text-sm font-medium ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
            } border border-gray-200`}
          >
            Suivant
          </button>
        </nav>
      </div>
    </div>
  );
};

export default EmployeesPage;