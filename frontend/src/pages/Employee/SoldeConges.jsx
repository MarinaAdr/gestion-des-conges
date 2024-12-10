import React, { useState, useEffect } from 'react';
import { Card, Typography, Progress } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

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
        `${import.meta.env.VITE_API_URL}/api/conges/user/${user.id}/statut/approuve`,
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
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12"
        >
          <Title level={1} className="!mb-4 md:!mb-0 !text-3xl md:!text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold">
            Solde de Congés
          </Title>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-3 bg-white rounded-full shadow-lg"
          >
            <Text className="text-lg md:text-base text-gray-700 font-medium">
              Année {new Date().getFullYear()}
            </Text>
          </motion.div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Carte des statistiques principales */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col h-full"
          >
            <Card className="flex-grow shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl border-none bg-white backdrop-blur-sm">
              <div className="space-y-6">
                {/* Total disponible */}
                <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white transform hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-white/20 rounded-xl">
                      <CalendarOutlined className="text-3xl md:text-4xl" />
                    </div>
                    <div>
                      <Text className="text-white/90 text-lg md:text-base block mb-1">Total disponible (annuel)</Text>
                      <Title level={2} className="!mb-0 !text-white !text-3xl md:!text-4xl font-bold">
                        22 jours
                      </Title>
                    </div>
                  </div>
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="p-6 rounded-2xl bg-blue-50 text-center"
                  >
                    <Text className="text-gray-600 block mb-2">Pris</Text>
                    <Text className="text-2xl md:text-3xl font-bold text-blue-600">
                      {congesPris}
                    </Text>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="p-6 rounded-2xl bg-indigo-50 text-center"
                  >
                    <Text className="text-gray-600 block mb-2">Restants</Text>
                    <Text className="text-2xl md:text-3xl font-bold text-indigo-600">
                      {soldes.restantMois}
                    </Text>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Carte avec le cercle de progression */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col h-full"
          >
            <Card className="flex-grow shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl border-none bg-white backdrop-blur-sm">
              <div className="flex flex-col items-center justify-center h-full p-6">
                <Progress 
                  type="circle"
                  percent={Math.max(0, Math.min(100, Math.round((soldes.restantMois / soldes.totalMois) * 100)))}
                  strokeColor={{
                    '0%': soldes.restantMois < 0 ? '#EF4444' : '#4F46E5',
                    '100%': soldes.restantMois < 0 ? '#DC2626' : '#6366F1',
                  }}
                  strokeWidth={12}
                  width={200}
                  format={() => (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-center"
                    >
                      <div className={`text-3xl md:text-4xl font-bold ${
                        soldes.restantMois < 0 ? 'text-red-600' : 'text-indigo-600'
                      }`}>
                        {soldes.restantMois}
                      </div>
                      <div className="text-gray-600 text-base mt-1">
                        jours restants
                      </div>
                    </motion.div>
                  )}
                />
                {soldes.restantMois < 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-center"
                  >
                    <Text className="text-red-500 text-sm">
                      Vous avez dépassé votre solde de congés
                    </Text>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Carte des derniers congés */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="md:col-span-2"
          >
            <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl border-none bg-white">
              <Title level={3} className="mb-6 text-gray-800">Derniers congés approuvés</Title>
              <div className="space-y-4">
                {conges
                  .filter(c => c.statut === 'approuve')
                  .sort((a, b) => new Date(b.date_debut) - new Date(a.date_debut))
                  .map((conge, index) => {
                    const dateDebut = new Date(conge.date_debut);
                    const dateFin = new Date(conge.date_fin);
                    let days = 0;
                    for (let d = new Date(dateDebut); d <= dateFin; d.setDate(d.getDate() + 1)) {
                      const day = d.getDay();
                      if (day !== 0 && day !== 6) {
                        days++;
                      }
                    }

                    return (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 md:p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 hover:from-slate-100 hover:to-blue-100 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 md:gap-6">
                          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
                            <CalendarOutlined className="text-2xl text-blue-600" />
                          </div>
                          <div className="flex-grow">
                            <Text className="text-base md:text-lg text-gray-700 block">
                              Du {format(new Date(conge.date_debut), 'dd/MM/yyyy')} au {format(new Date(conge.date_fin), 'dd/MM/yyyy')}
                            </Text>
                            <Text className="text-sm text-gray-500">
                              {days} jour{days > 1 ? 's' : ''} de congés
                            </Text>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SoldeConges;