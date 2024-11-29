import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Table } from '../../components/Table';
import { FiDownload } from 'react-icons/fi';

const AdminDashboard = () => {
  // Vous devrez ajouter ces données depuis votre API
  const leaveOverview = {
    pendingRequests: 5,
    approvedRequests: 12,
    rejectedRequests: 2
  };

  const employeeBalances = [
    { id: 1, name: "Dupont Jean", paidLeave: 25, sickLeave: 12, remainingDays: 15 },
    // Ajoutez plus d'employés ici
  ];

  const handleExportData = () => {
    // Implémentez la logique d'export ici
    console.log("Exporting data...");
  };

  return (
    
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord des congés</h1>
          <Button 
            onClick={handleExportData}
            className="flex items-center gap-2"
          >
            <FiDownload /> Exporter les données
          </Button>
        </div>

        {/* Vue d'ensemble des congés */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <div className="p-4">
              <h3 className="font-medium text-gray-500">Demandes en attente</h3>
              <p className="text-2xl font-bold text-indigo-600">{leaveOverview.pendingRequests}</p>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <h3 className="font-medium text-gray-500">Demandes approuvées</h3>
              <p className="text-2xl font-bold text-green-600">{leaveOverview.approvedRequests}</p>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <h3 className="font-medium text-gray-500">Demandes rejetées</h3>
              <p className="text-2xl font-bold text-red-600">{leaveOverview.rejectedRequests}</p>
            </div>
          </Card>
        </div>

        {/* Suivi des soldes de congés */}
        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Soldes de congés par employé</h2>
            <div className="overflow-x-auto">
              <Table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Congés payés</th>
                    <th>Congés maladie</th>
                    <th>Jours restants</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeBalances.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.name}</td>
                      <td>{employee.paidLeave} jours</td>
                      <td>{employee.sickLeave} jours</td>
                      <td>{employee.remainingDays} jours</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Card>
      </div>
    
  );
};

export default AdminDashboard;