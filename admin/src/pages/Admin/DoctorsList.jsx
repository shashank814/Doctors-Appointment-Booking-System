import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const {doctors, aToken, getAllDoctors, changeAvailablity } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
          doctors.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:bg-blue-400 transition duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 space-y-1">
                <p className="font-semibold text-lg">{item.name}</p>
                <p className="text-gray-600">{item.speciality}</p>
                <div className="flex items-center gap-2 mt-2">
                  <input onChange={()=>changeAvailablity(item._id)}
                    type="checkbox"
                    checked={item.available}
                    readOnly
                  />
                  <p className="text-sm text-gray-700">Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList
