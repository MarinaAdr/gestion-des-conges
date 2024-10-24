import React, { useEffect, useState } from 'react';
import SummaryCard from './SummaryCard';
import { PiUsersThree } from 'react-icons/pi';
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { BiBuildings } from 'react-icons/bi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const AdminSummary = () => {
  const [departementCount, setDepartementCount] = useState(0); 
  const [loading, setLoading] = useState(true); 
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchDepartementCount = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/departement/count', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });
        setDepartementCount(response.data.count); 
      } catch (error) {
        console.error("Erreur lors de la récupération du nombre de départements:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchDepartementCount();
  }, []); 

  const handleEmployeeListClick = () => {
    navigate('/admin-dashboard/employees'); 
  };

  const handleDepartementClick = () => {
    navigate('/admin-dashboard/departements'); 
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className='p-6'>
      <h3 className='text-3xl font-bold'>Dashboard</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-0 mt-6'>
        <div onClick={handleEmployeeListClick}>
          <SummaryCard icon={<PiUsersThree />} text="Liste des employés" number={10} color="bg-slate-300" />
        </div>
        <div onClick={handleDepartementClick}>
          <SummaryCard icon={<BiBuildings />} text="Les départements" number={departementCount} color="bg-red-400" /> 
        </div>
        <SummaryCard icon={<FaRegMoneyBill1 />} text="Salaire mensuel" number={1000} color="bg-yellow-500" />
      </div>
    </div>
  );
};

export default AdminSummary;
