import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const {user} = useAuth()
  return (
    <div className='flex justify-between items-center h-12 bg-[#3bb8d8] px-20'>
        <p>Bienvenue {user.name}</p>
        <button className='py-1 bg-[#3bb8d8] hover:bg-blue-400 text-white transition-colors'>Logout</button>
    </div>
  )
}

export default Navbar