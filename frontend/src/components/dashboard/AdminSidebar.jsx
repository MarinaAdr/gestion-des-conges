import React from 'react';
import {NavLink} from 'react-router-dom';
import {RxDashboard} from 'react-icons/rx';
import {PiUsersThree} from 'react-icons/pi';
import {RiCalendarScheduleLine} from 'react-icons/ri';
import {FaRegMoneyBill1} from 'react-icons/fa6';
import {TbSettingsCog} from 'react-icons/tb';
import {BiBuildings} from 'react-icons/bi';
import Logo from '../../assets/logo.png'

const AdminSidebar = () => {
  return (
    <div className="bg-white h-screen fixed left-0 top-0 bottom-0 w-80">
      <div className="bg-white ">
        
          <img src={Logo} className='flex h-[120px]  mt-0 w-[620px] items-center'/>
      
      </div>
      <nav className="mt-4">
        <NavLink
          to="/admin-dashboard"
          className={({isActive}) =>
            `flex items-center px-4 py-2 hover:bg-slate-200 ${isActive ? 'bg-violet-200' : ''}`}
          end
        >
          <RxDashboard className="w-7 h-12 mr-5" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employees"
          className={({isActive}) =>
            `flex items-center px-4 py-2 hover:bg-slate-200 ${isActive ? 'bg-violet-200' : ''}`}
        >
          <PiUsersThree className="w-7 h-12 mr-4" />
          <span>Employés</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departements"
          className={({isActive}) =>
            `flex items-center px-4 py-2 hover:bg-slate-200 ${isActive ? 'bg-violet-200' : ''}`}
        >
          <BiBuildings className="w-7 h-12 mr-4" />
          <span>Départements</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/congés"
          className="flex items-center px-4 py-2 hover:bg-slate-200"
        >
          <RiCalendarScheduleLine className="w-7 h-12 mr-4" />
          <span>Congés</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/salaire"
          className="flex items-center px-4 py-2 hover:bg-slate-200"
        >
          <FaRegMoneyBill1 className="w-7 h-12 mr-4" />
          <span>Salaire</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/paramètres"
          className="flex items-center px-4 py-2 hover:bg-slate-200"
        >
          <TbSettingsCog className="w-7 h-12 mr-4" />
          <span>Paramètres</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
