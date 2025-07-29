// import React, { useContext, useEffect, useState } from 'react'
// import { AppContext } from '../context/AppContext'
// import { useNavigate } from 'react-router-dom'

// const RelatedDoctors = ({speciality,docId}) => {

//     const {doctors} = useContext(AppContext)
//     const navigate = useNavigate()

//     const [relDoc,setRelDocs] = useState([])

//     useEffect(()=>{
//         if(doctors.length > 0 && speciality) {
//             const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
//             setRelDocs(doctorsData)
//         }
//     }, [doctors,speciality,docId])

//   return (
//     <div>
//         <div className="px-6 py-12 text-gray-800">
//       <h1 className="text-3xl font-semibold mb-2">Top Doctors To Book</h1>
//       <p className="text-sm text-gray-600 mb-6">
//         Simply browse through our extensive list of trusted doctors.
//       </p>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//         {relDoc.slice(0, 5).map((item, index) => (
//           <div onClick={()=> {navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
//             key={index}
//             className="bg-blue-50 rounded-xl shadow hover:shadow-md transition p-4 flex flex-col items-center text-center"
//           >
//             <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-full mb-4" />

//             <div>
//               <div className="flex items-center justify-center gap-2 mb-1">
//                 <p className="w-2 h-2 bg-green-500 rounded-full"></p>
//                 <p className="text-xs text-green-600">Available</p>
//               </div>
//               <p className="font-medium">{item.name}</p>
//               <p className="text-sm text-gray-500">{item.speciality}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div onClick={()=> {navigate('/doctors'); scrollTo(0,0)}} className="flex justify-center mt-8">
//         <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm transition">
//           More
//         </button>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default RelatedDoctors

import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()

  const [relDoc, setRelDocs] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      )
      setRelDocs(doctorsData)
    }
  }, [doctors, speciality, docId])

  return (
    <div className="px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-semibold mb-2">Top Doctors To Book</h1>
      <p className="text-sm text-gray-600 mb-6">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              if (item.available) {
                navigate(`/appointment/${item._id}`)
                scrollTo(0, 0)
              } else {
                toast.info('Doctor is not available at the moment.')
              }
            }}
            key={index}
            className={`bg-blue-50 rounded-xl shadow transition p-4 flex flex-col items-center text-center cursor-pointer 
              ${item.available ? 'hover:shadow-md' : 'opacity-60 cursor-not-allowed'}`}
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

      <div
        onClick={() => {
          navigate('/doctors')
          scrollTo(0, 0)
        }}
        className="flex justify-center mt-8"
      >
        <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm transition">
          More
        </button>
      </div>
    </div>
  )
}

export default RelatedDoctors
