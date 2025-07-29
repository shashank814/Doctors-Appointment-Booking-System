import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 px-4 sm:px-6 md:px-10 lg:px-16 py-10 mt-16">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row flex-wrap justify-between gap-8 md:gap-12 mb-10">
        
        {/* Left Section */}
        <div className="md:w-[40%] space-y-4">
          <img src={assets.logo} alt="Prescripto Logo" className="h-10" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente, odio? Itaque nostrum earum temporibus delectus eveniet, tenetur totam quod ut.
          </p>
        </div>

        {/* Center Section */}
        <div className="w-full sm:w-auto">
          <p className="font-semibold text-lg mb-2">COMPANY</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-blue-500 cursor-pointer transition">Home</li>
            <li className="hover:text-blue-500 cursor-pointer transition">About us</li>
            <li className="hover:text-blue-500 cursor-pointer transition">Contact us</li>
            <li className="hover:text-blue-500 cursor-pointer transition">Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-auto">
          <p className="font-semibold text-lg mb-2">GET IN TOUCH</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>+1-212-345-53</li>
            <li>prescripto@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t pt-6 text-center text-sm text-gray-500">
        &copy; 2025 Prescripto — All Rights Reserved
      </div>
    </footer>
  )
}

export default Footer
