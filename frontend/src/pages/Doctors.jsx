// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'

// const Doctors = () => {
//     const { speciality } = useParams()
//     const [filterDoc, setFilterDoc] = useState([])
//     const navigate = useNavigate()
//     const [showFilter,setShowFilter] = useState(false)

//     const { doctors } = useContext(AppContext)

//     const applyFilter = () => {
//         if (speciality) {
//             setFilterDoc(
//                 doctors.filter(
//                     (doc) =>
//                         doc.speciality?.toLowerCase().replace(/\s+/g, '') ===
//                         speciality.toLowerCase().replace(/\s+/g, '')
//                 )
//             )
//         } else {
//             setFilterDoc(doctors)
//         }
//     }

//     useEffect(() => {
//         applyFilter()
//     }, [doctors, speciality])

//     return (
//         <div>
//             <p className='text-gray-600'>Browse through the doctors specialist.</p>
//             <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
//                 <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-blue-700 text-white' : ''}`} onClick={()=>setShowFilter(prev => !prev)}>Filters</button>
//                 <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
//                     <p onClick={() => speciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General Physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General Physician" ? "bg-indigo-100 text-black" : ""}`}>General Physician</p>
//                     <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
//                     <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
//                     <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
//                     <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
//                     <p onClick={() => speciality === 'GastroenteroLogist' ? navigate('/doctors') : navigate('/doctors/GastroenteroLogist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "GastroenteroLogist" ? "bg-indigo-100 text-black" : ""}`}>GastroenteroLogist</p>
//                 </div>

//                 <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6'>
//                     {
//                         filterDoc.map((item, index) => (
//                             <div
//                                 onClick={() => navigate(`/appointment/${item._id}`)}
//                                 key={index}
//                                 className="bg-blue-50 rounded-xl shadow hover:shadow-md transition p-4 flex flex-col items-center text-center"
//                             >
//                                 <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-full mb-4" />
//                                 <div>
//                                     <div className="flex items-center justify-center gap-2 mb-1">
//                                         <p className="w-2 h-2 bg-green-500 rounded-full"></p>
//                                         <p className="text-xs text-green-600">Available</p>
//                                     </div>
//                                     <p className="font-medium">{item.name}</p>
//                                     <p className="text-sm text-gray-500">{item.speciality}</p>
//                                 </div>
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Doctors

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()
  const [showFilter, setShowFilter] = useState(false)

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(
        doctors.filter(
          (doc) =>
            doc.speciality?.toLowerCase().replace(/\s+/g, '') ===
              speciality.toLowerCase().replace(/\s+/g, '') &&
            doc
        )
      )
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className="px-4 sm:px-8 py-6">
      <p className="text-gray-600">Browse through the doctors specialist.</p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Toggle filter button on small screens */}
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? 'bg-blue-700 text-white' : ''
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>

        {/* Filters */}
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? 'flex' : 'hidden sm:flex'
          }`}
        >
          {[
            'General Physician',
            'Gynecologist',
            'Dermatologist',
            'Pediatricians',
            'Neurologist',
            'GastroenteroLogist',
          ].map((spec) => (
            <p
              key={spec}
              onClick={() =>
                speciality === spec
                  ? navigate('/doctors')
                  : navigate(`/doctors/${spec}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === spec ? 'bg-indigo-100 text-black' : ''
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctor cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => {
                if (item.available) {
                  navigate(`/appointment/${item._id}`)
                  window.scrollTo(0, 0)
                } else {
                  toast.info('Doctor is not available at the moment.')
                }
              }}
              key={index}
              className={`bg-blue-50 rounded-xl transition p-4 flex flex-col items-center text-center cursor-pointer ${
                item.available
                  ? 'hover:shadow-md'
                  : 'opacity-60 cursor-not-allowed'
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
              <div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.available ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  ></div>
                  <p
                    className={`text-xs ${
                      item.available ? 'text-green-600' : 'text-gray-500'
                    }`}
                  >
                    {item.available ? 'Available' : 'Not Available'}
                  </p>
                </div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
