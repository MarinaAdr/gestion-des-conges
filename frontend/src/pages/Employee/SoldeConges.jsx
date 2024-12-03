import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Progress } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const { Title, Text } = Typography;

const SoldeConges = () => {
  const { user } = useAuth();
  const [employeeData, setEmployeeData] = useState(null);
  const [conges, setConges] = useState([]);

  // Fonction pour récupérer les données de l'employé
  const fetchEmployeeData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/employees/${user.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setEmployeeData(response.data.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données employé:', error);
      toast.error('Erreur lors de la récupération des données employé');
    }
  };

  // Ajout de la fonction pour récupérer les congés
  const fetchConges = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/conges/user/${user.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setConges(response.data.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des congés:', error);
      toast.error('Erreur lors de la récupération des congés');
    }
  };

  useEffect(() => {
    fetchEmployeeData();
    fetchConges();
  }, [user.id]);

  // Calcul des congés pris (approuvés)
  const congesPris = conges
    .filter(c => c.statut === 'approuve')
    .reduce((total, conge) => {
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

  // Mise à jour du soldes object
  const soldes = {
    totalMois: employeeData ? employeeData.solde_conge : 0,
    restantMois: employeeData ? employeeData.solde_conge - congesPris : 0,
    totalAnnee: 30,
    restantAnnee: 22,
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Title level={1} className="!mb-0 !text-4xl bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Solde de Congés
          </Title>
          <div className="px-6 py-3 bg-white/80 rounded-full shadow-lg">
            <Text className="text-xl text-gray-700 font-medium">
              Année {new Date().getFullYear()}
            </Text>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Carte principale */}
          <Card 
            className="shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl border-none bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm"
          >
            <div className="space-y-8">
              {/* Total disponible */}
              <div className="p-8 rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 text-white transform hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/25 rounded-xl">
                    <CalendarOutlined className="text-4xl" />
                  </div>
                  <div>
                    <Text className="text-white/90 text-xl block mb-1">Total disponible (annuel)</Text>
                    <Title level={1} className="!mb-0 !text-white !text-5xl">
                      22 jours
                    </Title>
                  </div>
                </div>
              </div>

              {/* Statistiques */}
              <div className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                <div className="text-center px-6">
                  <Text className="text-gray-600 text-lg block mb-2">Pris</Text>
                  <Text className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {congesPris}
                  </Text>
                </div>
                <div className="h-16 w-px bg-gradient-to-b from-blue-200 to-purple-200"></div>
                <div className="text-center px-6">
                  <Text className="text-gray-600 text-lg block mb-2">Restants</Text>
                  <Text className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {soldes.restantMois}
                  </Text>
                </div>
              </div>
            </div>
          </Card>

          {/* Carte avec le cercle de progression */}
          <Card 
            className="shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl border-none bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center justify-center h-full p-6">
              <Progress 
                type="circle"
                percent={Math.round((soldes.restantMois / soldes.totalMois) * 100)}
                strokeColor={{
                  '0%': '#4F46E5',
                  '100%': '#818CF8',
                }}
                strokeWidth={12}
                width={240}
                format={() => (
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {soldes.restantMois}
                    </div>
                    <div className="text-gray-600 text-lg">jours restants</div>
                  </div>
                )}
              />
              
              <div className="mt-8 text-center">
                <div className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full">
                  <Text className="text-xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {Math.round((soldes.restantMois / soldes.totalMois) * 100)}% disponible
                  </Text>
                </div>
              </div>
            </div>
          </Card>

          {/* Carte des derniers congés */}
          <Card 
            className="md:col-span-2 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl border-none"
          >
            <Title level={3} className="mb-8 text-gray-800">Derniers congés approuvés</Title>
            <div className="space-y-6">
              {conges
                .filter(c => c.statut === 'approuve')
                .sort((a, b) => new Date(b.date_debut) - new Date(a.date_debut)) // Tri par date décroissante
                .slice(0, 3)
                .map((conge, index) => {
                  // Calcul du nombre de jours pour chaque congé
                  const dateDebut = new Date(conge.date_debut);
                  const dateFin = new Date(conge.date_fin);
                  let days = 0;
                  for (let d = new Date(dateDebut); d <= dateFin; d.setDate(d.getDate() + 1)) {
                    const day = d.getDay();
                    if (day !== 0 && day !== 6) { // Exclure les week-ends
                      days++;
                    }
                  }

                  return (
                    <div 
                      key={index}
                      className="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-indigo-50/50 to-purple-50/50 hover:from-indigo-100/50 hover:to-purple-100/50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl">
                        <CalendarOutlined className="text-2xl text-indigo-600" />
                      </div>
                      <div className="flex-grow">
                        <Text className="text-xl text-gray-700 block">
                          Du {format(new Date(conge.date_debut), 'dd/MM/yyyy')} au {format(new Date(conge.date_fin), 'dd/MM/yyyy')}
                        </Text>
                        <Text className="text-sm text-gray-500">
                          {days} jour{days > 1 ? 's' : ''} de congés
                        </Text>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SoldeConges;