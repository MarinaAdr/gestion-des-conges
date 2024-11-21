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
    navigate(`/employees/edit/${employeeId}`);
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
    <AdminLayout>
      <div className="bg-white rounded-lg shadow w-[98%] mx-auto p-6">
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl font-semibold text-gray-900">Gestion des employés</h1>
            <button 
              onClick={() => navigate('/employees/new')} 
              className="inline-flex text-xl items-center h-12 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RiAddLine className="mr-2" />
              Ajouter un employé
            </button>
          </div>

          <div className="mt-6 w-1/2">
            <div className="relative">
              <RiSearchLine className="absolute text-2xl left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Rechercher un employé..."
                className="w-full text-lg h-[54px] pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle px-2">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" className="bg-gray-300 text-xl px-3 py-4 text-left font-medium text-gray-900 tracking-wider w-[5%]">ID</th>
                  <th scope="col" className="bg-gray-300 text-xl px-3 py-4 text-left font-medium text-gray-900 tracking-wider w-[12%]">Nom</th>
                  <th scope="col" className="bg-gray-300 text-xl px-3 py-4 text-left font-medium text-gray-900 tracking-wider w-[12%]">Prénom</th>
                  <th scope="col" className="bg-gray-300 text-xl px-3 py-4 text-left font-medium text-gray-900 tracking-wider w-[20%]">Email</th>
                  <th scope="col" className="bg-gray-300 text-xl px-3 py-4 text-left font-medium text-gray-900 tracking-wider w-[10%]">Rôle</th>
                  <th scope="col" className="bg-gray-300 text-xl px-3 py-4 text-left font-medium text-gray-900 tracking-wider w-[15%]">Date d'embauche</th>
                  <th scope="col" className="bg-gray-300 text-xl px-3 py-4 text-left font-medium text-gray-900 tracking-wider w-[15%]">Poste</th>
                  <th scope="col" className="bg-gray-300 text-xl px-3 py-4 text-right font-medium text-gray-900 tracking-wider w-[11%]">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.isArray(currentEmployees) && currentEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-3 py-4 whitespace-nowrap text-xl text-gray-900">{employee.id}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-xl font-medium text-gray-900">{employee.nom}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-xl text-gray-900">{employee.prenom}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-xl text-gray-500">{employee.email}</td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full
                        ${employee.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                        {employee.role}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-xl text-gray-500">{formatDate(employee.date_embauche)}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-xl text-gray-500">{employee.poste}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-right text-xl font-medium">
                      <div className="flex items-center gap-3 justify-end">
                        <button
                          onClick={() => handleEdit(employee.id)}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors"
                        >
                          <RiEditLine className="w-9 h-9" />
                        </button>
                        <button
                          onClick={() => handleDelete(employee.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <RiDeleteBinLine className="w-9 h-9" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Affichage de <span className="font-medium">{indexOfFirstEmployee + 1}</span> à{' '}
              <span className="font-medium">
                {Math.min(indexOfLastEmployee, filteredEmployees.length)}
              </span>{' '}
              sur <span className="font-medium">{filteredEmployees.length}</span> employés
              {searchTerm && ` (filtré${filteredEmployees.length > 1 ? 's' : ''} sur ${employees.length} total)`}
            </div>
            <div className="flex items-center justify-between sm:justify-end">
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md px-4 py-2 text-sm font-medium ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-500 hover:bg-gray-50'
                  } ring-1 ring-inset ring-gray-300`}
                >
                  <span className="sr-only">Précédent</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
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
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                          currentPage === pageNumber
                            ? 'z-10 bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
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
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
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
                  className={`relative inline-flex items-center rounded-r-md px-4 py-2 text-sm font-medium ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-500 hover:bg-gray-50'
                  } ring-1 ring-inset ring-gray-300`}
                >
                  <span className="sr-only">Suivant</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EmployeesPage;