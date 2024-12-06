import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArchivesDemandes = () => {
  const [demandes, setDemandes] = useState([]);
  const [statuts] = useState({
    'en_attente': 'En attente',
    'approuve': 'Approuvé',
    'refuse': 'Refusé'
  });
  const [selectedStatut, setSelectedStatut] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      setLoading(true);
      setError(null);
      
      try {
        const demandesResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/conges`, 
          { headers: { 'Authorization': `Bearer ${token}` }}
        );

        setDemandes(demandesResponse.data.data);
      } catch (error) {
        setError('Erreur lors de la récupération des données. Veuillez réessayer plus tard.');
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Formater la date pour l'affichage
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  // Calculer les demandes filtrées
  const filteredDemandes = demandes.filter(demande => 
    !selectedStatut || demande.statut === selectedStatut
  );

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(filteredDemandes.length / itemsPerPage);

  // Obtenir les demandes pour la page courante
  const getCurrentPageDemandes = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDemandes.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* En-tête avec animation fade-in */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Archives des demandes de congés
          </h1>
          <span className="text-lg text-gray-500">
            Total: {demandes.length} demandes
          </span>
        </div>

        {/* Filtre avec animation */}
        <div className="mb-8 animate-slide-in">
          <select
            className="w-full sm:w-72 px-5 py-4 text-lg text-gray-700 bg-white border border-gray-200 
                     rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                     transition-all duration-300 ease-in-out hover:border-blue-300"
            value={selectedStatut}
            onChange={(e) => setSelectedStatut(e.target.value)}
          >
            <option value="">Tous les statuts</option>
            {Object.entries(statuts).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        {error && (
          <div className="mb-8 p-5 bg-red-50 border-l-4 border-red-400 text-lg text-red-700 
                        animate-shake">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-10 py-5 text-left text-base font-medium text-gray-500 uppercase tracking-wider bg-gray-50/50">
                      Employé
                    </th>
                    <th className="px-10 py-5 text-left text-base font-medium text-gray-500 uppercase tracking-wider bg-gray-50/50">
                      Date de début
                    </th>
                    <th className="px-10 py-5 text-left text-base font-medium text-gray-500 uppercase tracking-wider bg-gray-50/50">
                      Date de fin
                    </th>
                    <th className="px-10 py-5 text-left text-base font-medium text-gray-500 uppercase tracking-wider bg-gray-50/50">
                      Motif
                    </th>
                    <th className="px-10 py-5 text-left text-base font-medium text-gray-500 uppercase tracking-wider bg-gray-50/50">
                      Statut
                    </th>
                    <th className="px-10 py-5 text-left text-base font-medium text-gray-500 uppercase tracking-wider bg-gray-50/50">
                      Date d'envoi de la demande
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {getCurrentPageDemandes().map((demande, index) => (
                    <tr key={demande.id} 
                        className="hover:bg-gray-50/50 transition-colors duration-150"
                        style={{ 
                          animation: `fadeIn 0.5s ease-out ${index * 0.1}s`,
                          opacity: 0,
                          animationFillMode: 'forwards'
                        }}>
                      <td className="px-10 py-6">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center 
                                      text-blue-600 text-lg font-medium transition-transform duration-300 
                                      hover:scale-110">
                            {`${demande.prenom[0]}${demande.nom[0]}`}
                          </div>
                          <div className="ml-5">
                            <div className="text-lg font-medium text-gray-900">{`${demande.prenom} ${demande.nom}`}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-lg text-gray-600">{formatDate(demande.date_debut)}</td>
                      <td className="px-10 py-6 text-lg text-gray-600">{formatDate(demande.date_fin)}</td>
                      <td className="px-10 py-6">
                        <div className="text-lg text-gray-600 max-w-xs truncate">{demande.motif}</div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`inline-flex text-base px-4 py-2 rounded-full font-medium
                          transition-all duration-300 hover:scale-105
                          ${demande.statut === 'approuve' ? 'bg-green-50 text-green-700 hover:bg-green-100' : 
                            demande.statut === 'refuse' ? 'bg-red-50 text-red-700 hover:bg-red-100' : 
                            'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'}`}>
                          {statuts[demande.statut]}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-lg text-gray-600">{formatDate(demande.date_creation)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination avec animations */}
              <div className="px-10 py-6 border-t border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                  <div className="text-base text-gray-500">
                    Affichage de {Math.min(currentPage * itemsPerPage, filteredDemandes.length)} sur {filteredDemandes.length} demandes
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-6 py-3 text-base font-medium rounded-lg transition-all duration-300
                        ${currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50 hover:scale-105 border border-gray-300'
                        }`}
                    >
                      Précédent
                    </button>
                    <div className="flex space-x-2">
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`px-6 py-3 text-base font-medium rounded-lg transition-all duration-300
                            ${currentPage === index + 1
                              ? 'bg-blue-500 text-white scale-105'
                              : 'bg-white text-gray-700 hover:bg-gray-50 hover:scale-105 border border-gray-300'
                            }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-6 py-3 text-base font-medium rounded-lg transition-all duration-300
                        ${currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50 hover:scale-105 border border-gray-300'
                        }`}
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Ajout des styles d'animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out;
  }
  
  .animate-slide-in {
    animation: fadeIn 0.5s ease-out;
  }
  
  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }
`;
document.head.appendChild(style);

export default ArchivesDemandes;