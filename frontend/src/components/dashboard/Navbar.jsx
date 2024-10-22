import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const {user} = useAuth()
  return (
    <div className='flex justify-between shadow-md items-center h-[70px] bg-white px-20'>
        <p className='font-pacific text-xl'>Bienvenue {user.name}</p>
        <button className='px-2 h-10  py-1 bg-violet-400 hover:bg-violet-500 text-white transition-colors rounded'>Se déconnecter</button>
    </div>
  )
}

export default Navbar