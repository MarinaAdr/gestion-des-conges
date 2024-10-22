import React from 'react'
import SummaryCard from './SummaryCard'
import {PiUsersThree} from 'react-icons/pi';
import {RiCalendarScheduleLine} from 'react-icons/ri';
import { FaRegMoneyBill1 } from "react-icons/fa6";
import {TbSettingsCog} from 'react-icons/tb';
import {BiBuildings} from 'react-icons/bi';

const AdminSummary = () => {
  return (
    <div className='p-6'>
        <h3 className='text-3xl font-bold '>Dashboard</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-0 mt-6'>
            <SummaryCard icon={<PiUsersThree/>} text="Liste des employés" number={10} color="bg-slate-300"/>
            <SummaryCard icon={<BiBuildings/>} text="Les départements" number={3} color="bg-red-400"/>
            <SummaryCard icon={<FaRegMoneyBill1/>} text="Salaire mensuel" number={1000} color="bg-yellow-500"/>
        </div>
    </div>
  )
}

export default AdminSummary