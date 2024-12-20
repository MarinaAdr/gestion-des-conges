import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Table } from '../../components/Table';
import { FiDownload } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';

const AdminDashboard = () => {
  const [leaveOverview, setLeaveOverview] = useState({
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0
  });

  const fetchCongesStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/conges`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Compter les congés par statut
      const stats = response.data.data.reduce((acc, conge) => {
        switch (conge.statut) {
          case 'en_attente':
            acc.pendingRequests++;
            break;
          case 'approuve':
            acc.approvedRequests++;
            break;
          case 'refuse':
            acc.rejectedRequests++;
            break;
        }
        return acc;
      }, {
        pendingRequests: 0,
        approvedRequests: 0,
        rejectedRequests: 0
      });

      setLeaveOverview(stats);
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      toast.error('Erreur lors de la récupération des statistiques');
    }
  };

  useEffect(() => {
    fetchCongesStats();
  }, []);

  // Modifier la structure des données employés
  const [employeeBalances, setEmployeeBalances] = useState([]);
  const [employeeConges, setEmployeeConges] = useState({});

  // Fonction pour calculer les jours de congés pris
  const calculateTakenDays = (conges) => {
    return conges.reduce((total, conge) => {
      const dateDebut = new Date(conge.date_debut);
      const dateFin = new Date(conge.date_fin);
      let days = 0;
      for (let d = new Date(dateDebut); d <= dateFin; d.setDate(d.getDate() + 1)) {
        const day = d.getDay();
        if (day !== 0 && day !== 6) { // Exclure les week-ends
          days++;
        }
      }
      return total + days;
    }, 0);
  };

  // Fonction pour récupérer les congés approuvés pour chaque employé
  const fetchEmployeeConges = async (employeeId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/conges/user/${employeeId}/statut/approuve`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des congés pour l'employé ${employeeId}:`, error);
      return [];
    }
  };

  const fetchEmployeeBalances = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/employees`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setEmployeeBalances(response.data.data);

      // Récupérer les congés pour chaque employé
      const congesPromises = response.data.data.map(employee => 
        fetchEmployeeConges(employee.id)
      );
      const congesResults = await Promise.all(congesPromises);
      
      // Créer un objet avec les congés pris par employé
      const congesMap = {};
      response.data.data.forEach((employee, index) => {
        congesMap[employee.id] = calculateTakenDays(congesResults[index]);
      });
      setEmployeeConges(congesMap);

    } catch (error) {
      console.error('Erreur lors de la récupération des soldes:', error);
      toast.error('Erreur lors de la récupération des soldes');
    }
  };

  useEffect(() => {
    fetchEmployeeBalances();
  }, []);

  const handleExportData = () => {
    try {
      // Préparer les données pour l'export
      const dataToExport = employeeBalances.map(employee => ({
        'Nom': employee.nom,
        'Prénom': employee.prenom,
        'Solde de congé': employee.solde_conge || 10,
        'Jours restants': employee.jours_restants || 10,
      }));

      // Créer un nouveau classeur
      const wb = XLSX.utils.book_new();
      
      // Convertir les données en feuille de calcul
      const ws = XLSX.utils.json_to_sheet(dataToExport);

      // Ajuster la largeur des colonnes
      const colWidths = [
        { wch: 20 }, // Nom
        { wch: 20 }, // Prénom
        { wch: 15 }, // Solde de congé
        { wch: 15 }, // Jours restants
      ];
      ws['!cols'] = colWidths;

      // Styliser l'en-tête
      const range = XLSX.utils.decode_range(ws['!ref']);
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const address = XLSX.utils.encode_col(C) + "1";
        if (!ws[address]) continue;
        ws[address].s = {
          font: { bold: true },
          fill: { fgColor: { rgb: "EFEFEF" } },
        };
      }

      // Ajouter la feuille au classeur
      XLSX.utils.book_append_sheet(wb, ws, "Liste des employés");

      // Générer le fichier Excel et le télécharger
      const date = new Date().toISOString().split('T')[0];
      XLSX.writeFile(wb, `liste_employes_${date}.xlsx`);

      // Notification de succès
      toast.success('Export Excel réussi !');
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      toast.error('Une erreur est survenue lors de l\'export');
    }
  };

  return (
    <div className="space-y-8 p-8 bg-gray-50">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Tableau de bord des congés
        </h1>
        <Button 
          onClick={handleExportData}
          className="flex items-center gap-2  hover:bg-gray-50 text-gray-700 shadow-sm"
        >
          <FiDownload className="w-5 h-5" /> Exporter les données
        </Button>
      </div>

      {/* Vue d'ensemble des congés */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-amber-50 to-white transform transition-all hover:scale-105 border-l-4 border-amber-500">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold text-gray-700">Demandes en attente</h3>
              <div className="p-3 bg-amber-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-amber-600">{leaveOverview.pendingRequests}</p>
            <p className="text-sm text-gray-500 mt-2">demandes à traiter</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-white transform transition-all hover:scale-105 border-l-4 border-green-500">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold text-gray-700">Demandes approuvées</h3>
              <div className="p-3 bg-green-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-green-600">{leaveOverview.approvedRequests}</p>
            <p className="text-sm text-gray-500 mt-2">demandes validées</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-white transform transition-all hover:scale-105 border-l-4 border-red-500">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold text-gray-700">Demandes rejetées</h3>
              <div className="p-3 bg-red-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-red-600">{leaveOverview.rejectedRequests}</p>
            <p className="text-sm text-gray-500 mt-2">demandes refusées</p>
          </div>
        </Card>
      </div>

      {/* Liste des employés */}
      <Card className="shadow-xl bg-white rounded-xl">
        <div className="p-8 ">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Liste des employés</h2>
            <div className="flex gap-2">
              <span className="text-base text-gray-500">Total: {employeeBalances.length} employés</span>
            </div>
          </div>
          <div className="overflow-x-auto  rounded-lg border border-gray-100">
            <Table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50">
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Prénom</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Solde de congé</th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Jours restants</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {employeeBalances.map((employee) => {
                  const congesPris = employeeConges[employee.id] || 0;
                  const joursRestants = congesPris > 0 ? 22 - congesPris : 22;
                  
                  return (
                    <tr key={employee.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
                            <span className="text-blue-700 font-medium text-sm">
                              {employee.nom.charAt(0)}{employee.prenom.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-ml font-medium text-gray-900">{employee.nom}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-md text-gray-900">{employee.prenom}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {employee.solde_conge || 10} jours
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                          joursRestants > 5 
                            ? 'bg-green-50 text-green-700 border border-green-100'
                            : 'bg-orange-50 text-orange-700 border border-orange-100'
                        }`}>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {joursRestants} jours
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;