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

  // Fonction pour récupérer les employés
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/employees');
      
      // Vérifier si la réponse a la structure {success: true, data: Array}
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

  // État de chargement
  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </AdminLayout>
    );
  }

  // Affichage de l'erreur
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

  // Formater la date pour l'affichage
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  // Dans la partie actions du tableau, ajoutez les gestionnaires d'événements
  const handleEdit = (employeeId) => {
    navigate(`/employees/edit/${employeeId}`);
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      try {
        await axios.delete(`http://localhost:8080/api/employees/${employeeId}`);
        fetchEmployees(); // Rafraîchir la liste après suppression
      } catch (err) {
        setError('Erreur lors de la suppression de l\'employé');
        console.error('Erreur:', err);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow">
        {/* En-tête avec titre et actions */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold text-gray-900">Gestion des employés</h1>
            <button 
              onClick={() => navigate('/employees/new')} 
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <RiAddLine className="mr-2" />
              Ajouter un employé
            </button>
          </div>

          {/* Barre de recherche */}
          <div className="mt-4">
            <div className="relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un employé..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Tableau */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prénom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'embauche</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poste</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(employees) && employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{employee.nom}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{employee.prenom}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{employee.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${employee.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                      {employee.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formatDate(employee.date_embauche)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{employee.poste}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleEdit(employee.id)} 
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                      title="Modifier"
                    >
                      <RiEditLine className="inline-block w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(employee.id)} 
                      className="text-red-600 hover:text-red-900"
                      title="Supprimer"
                    >
                      <RiDeleteBinLine className="inline-block w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Afficher un message si aucun employé n'est trouvé */}
        {Array.isArray(employees) && employees.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">Aucun employé trouvé</p>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Affichage de 1 à {employees.length} sur {employees.length} employés
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Précédent
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EmployeesPage; 