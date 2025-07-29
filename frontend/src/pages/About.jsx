import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="px-6 py-12 max-w-7xl mx-auto text-gray-800">
      
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-3xl sm:text-4xl font-bold">
          ABOUT <span className="text-blue-500">US</span>
        </p>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row items-center gap-10">
        
        {/* Image */}
        <div className="flex-1">
          <img 
            src={assets.about_image} 
            alt="About Prescripto" 
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>

        {/* Text */}
        <div className="flex-1 space-y-5">
          <p>
            Welcome to <span className="font-semibold text-blue-500">Prescripto</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you are booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <div>
            <p className="font-bold text-lg">Our Vision</p>
            <p>
              Our vision is to create a seamless healthcare experience for every individual by bridging the gap between patients and medical professionals. We aim to simplify the process of healthcare access through real-time scheduling, secure medical record management, doctor availability tracking, and personalized care insights—empowering users to take control of their health journey.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US Section */}
      <div className="w-full mt-16">
        <p className="text-2xl sm:text-3xl font-bold text-center mb-8">
          WHY <span className="text-blue-500">CHOOSE US</span>
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-6 rounded-xl shadow text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <b className="text-lg block mb-2">Efficiency:</b>
            <p className="text-sm text-gray-700">
              Book appointments and access health records in just a few clicks—no long queues or delays.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl shadow text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <b className="text-lg block mb-2">Convenience:</b>
            <p className="text-sm text-gray-700">
              Manage your healthcare anytime, anywhere from our easy-to-use web platform.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl shadow text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <b className="text-lg block mb-2">Personalization:</b>
            <p className="text-sm text-gray-700">
              Get tailored doctor recommendations and notifications based on your health needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
