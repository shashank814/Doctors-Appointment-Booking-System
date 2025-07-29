import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="px-6 py-12 max-w-7xl mx-auto text-gray-800">

      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-3xl sm:text-4xl font-bold">
          CONTACT <span className="text-blue-500">US</span>
        </p>
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row items-center gap-12">

        {/* Image */}
        <div className="flex-1">
          <img 
            src={assets.contact_image} 
            alt="Contact Us" 
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-5 bg-blue-50 p-6 rounded-xl shadow-md w-full">
          <p className="text-xl font-semibold text-blue-600">OUR OFFICE</p>
          <p className="text-gray-700">
            54790 Willims Station<br />
            Suite 350, Washington, USA
          </p>
          <p className="text-gray-700">
            Tel: (415) 550-3102<br />
            Email: <a href="mailto:prescripto@gmail.com" className="text-blue-500 underline">prescripto@gmail.com</a>
          </p>
          <div className="pt-4">
            <p className="text-lg font-medium">Careers at <span className="text-blue-500">PRESCRIPTO</span></p>
            <p className="text-sm text-gray-600">
              Learn more about our teams and job openings.
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm transition">
              Explore Jobs
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact
