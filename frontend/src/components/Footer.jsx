import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="PrescripWell Logo" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            Prescripwell is your trusted platform for booking doctor appointments online. 
            We connect patients with qualified healthcare professionals, making it easier 
            to access quality medical care anytime, anywhere.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li><Link to="/" className="hover:text-blue-600 transition-colors duration-200">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-600 transition-colors duration-200">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600 transition-colors duration-200">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-600 transition-colors duration-200">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91 9326063940</li>
            <li>prescripwell@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          Copyright 2025 © PrescripWell.com — All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
