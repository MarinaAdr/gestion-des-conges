import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const {user} = useAuth()
  return (
    <div className='flex justify-between items-center h-12 bg-[#3bb8d8] px-20'>
        <p className='text-white text-xl'>Bienvenue {user.name}</p>
        <button className='px-2 py-1 bg-[#3bb8d8] hover:bg-[#3bc8d8] text-white transition-colors'>Logout</button>
    </div>
  )
}

export default Navbar