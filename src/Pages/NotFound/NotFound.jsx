import React from 'react'
import food404 from "../../assets/holding-signboard-404-not-found-cute-pear-cartoon-vector.jpg"
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='flex items-center flex-col justify-center min-h-screen bg-white dark:bg-gray-900'>
      <img src={food404} alt="404 Img" className='w-1/2 rounded-2xl' />
      <h2 className='text-3xl font-sans text-gray-900 dark:text-gray-200 mt-4'>
        Back To <Link to='/' className='text-lime-600 hover:text-lime-400'>Home</Link>
      </h2>
    </div>
  )
}
