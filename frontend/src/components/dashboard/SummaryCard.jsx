import React from 'react'

const SummaryCard = ({icon, text, number, color}) => {
  return (
    <div className='rounded h-20 gap-5 w-80  flex bg-white'>
        <div className={`text-3xl flex justify-center items-center ${color} text-white px-8`}>
            {icon}
        </div>
        <div className='pl-4 py-1 '>
            <p className='text-lg font-semibold'>{text}</p>
            <p className='text-xl font-bold text-center'>{number}</p>
        </div>
    </div>
  )
}

export default SummaryCard