import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-12 bg-blue-700 to-white">
            {/* Left Section */}
            <div className="md:w-1/2 space-y-6">
                <p className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    Book Appointment <br /> With Trusted Doctors
                </p>

                <div className="flex items-start space-x-4">
                    <img src={assets.group_profiles} alt="Group Profiles" className="h-12 w-12 object-contain" />
                    <p className="text-black">
                        Simply browse through our extensive list of trusted doctors,
                        <br className="hidden sm:block" />
                        schedule your appointment hassle-free.
                    </p>
                </div>

                <a
                    href="#speciality"
                    className="inline-flex items-center bg-white px-4 py-2 rounded-full text-gray-600 text-sm hover:scale-105 transition-transform duration-300"
                >
                    Book Appointment
                    <img src={assets.arrow_icon} alt="Arrow" className="ml-2 h-5 w-5" />
                </a>
            </div>

            {/* Right Section */}
            <div className="md:w-1/2 mt-10 md:mt-0">
                <img src={assets.header_img} alt="Header" className="w-full h-auto" />
            </div>
        </div>
    )
}

export default Header
