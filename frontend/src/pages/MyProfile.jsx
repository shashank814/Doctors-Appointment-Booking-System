// import React, { useState } from 'react'
// import { assets } from '../assets/assets'

// const MyProfile = () => {
//   const [userData, setUserData] = useState({
//     name: "Edward Vincent",
//     image: assets.profile_pic,
//     email: 'richardjames@gmail.com',
//     phone: '+1 123 456 789',
//     address: {
//       line1: "57th Cross, Richmond",
//       line2: "Circle, Church Road, London"
//     },
//     gender: 'Male',
//     dob: '2000-01-20'
//   })

//   const [isEdit, setIsEdit] = useState(true)

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
//       <div className="flex items-center gap-6">
//         <img src={userData.image} alt="Profile" className="w-24 h-24 object-cover rounded-full" />
//         <div className="flex-1">
//           {
//             isEdit ? (
//               <input
//                 type="text"
//                 value={userData.name}
//                 onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
//                 className="border px-4 py-2 rounded w-full"
//               />
//             ) : (
//               <p className="text-xl font-semibold">{userData.name}</p>
//             )
//           }
//         </div>
//       </div>

//       <hr className="my-6" />

//       <div className="space-y-4">
//         <p className="text-lg font-semibold text-gray-700">CONTACT INFORMATION</p>

//         <div>
//           <p className="text-sm text-gray-600 font-medium">Email ID:</p>
//           <p className="text-gray-800">{userData.email}</p>
//         </div>

//         <div>
//           <p className="text-sm text-gray-600 font-medium">Phone:</p>
//           {
//             isEdit ? (
//               <input
//                 type="text"
//                 value={userData.phone}
//                 onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
//                 className="border px-4 py-2 rounded w-full"
//               />
//             ) : (
//               <p className="text-gray-800">{userData.phone}</p>
//             )
//           }
//         </div>

//         <div>
//           <p className="text-sm text-gray-600 font-medium">Address:</p>
//           {
//             isEdit ? (
//               <div className="space-y-2">
//                 <input
//                   type="text"
//                   value={userData.address.line1}
//                   onChange={(e) => setUserData(prev => ({
//                     ...prev,
//                     address: {
//                       ...prev.address,
//                       line1: e.target.value
//                     }
//                   }))}
//                   className="border px-4 py-2 rounded w-full"
//                 />
//                 <input
//                   type="text"
//                   value={userData.address.line2}
//                   onChange={(e) => setUserData(prev => ({
//                     ...prev,
//                     address: {
//                       ...prev.address,
//                       line2: e.target.value
//                     }
//                   }))}
//                   className="border px-4 py-2 rounded w-full"
//                 />
//               </div>
//             ) : (
//               <p className="text-gray-800">
//                 {userData.address.line1}
//                 <br />
//                 {userData.address.line2}
//               </p>
//             )
//           }
//         </div>
//       </div>

//       <div className="mt-8 space-y-4">
//         <p className="text-lg font-semibold text-gray-700">BASIC INFORMATION</p>
//         <div>
//           <p className="text-sm text-gray-600 font-medium">Gender:</p>
//           {
//             isEdit ? (
//               <select
//                 onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
//                 value={userData.gender}
//                 className="border px-4 py-2 rounded w-full"
//               >
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             ) : (
//               <p>{userData.gender}</p>
//             )
//           }
//         </div>

//         <div>
//           <p className="text-sm text-gray-600 font-medium">Birthday:</p>
//           {
//             isEdit ? (
//               <input
//                 type="date"
//                 onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
//                 value={userData.dob}
//                 className="border px-4 py-2 rounded w-full"
//               />
//             ) : (
//               <p>{userData.dob}</p>
//             )
//           }
//         </div>
//       </div>

//       {/* Edit/Save Button at Bottom */}
//       <div className="mt-8 flex justify-end">
//         <button
//           onClick={() => setIsEdit(!isEdit)}
//           className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
//         >
//           {isEdit ? "Save Information" : "Edit Information"}
//         </button>
//       </div>
//     </div>
//   )
// }

// export default MyProfile


import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(true)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {

      const formData = new FormData()

      formData.append("name", userData.name)
      formData.append("phone", userData.phone)
      formData.append("dob", userData.dob)
      formData.append("gender", userData.gender)
      formData.append("address", JSON.stringify(userData.address))

      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return userData && (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <div className="flex items-center gap-6">
        {
          isEdit ? (
            <label htmlFor="image">
              <div className="relative w-24 h-24">
                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full"
                />
                {!image && (
                  <img
                    src={assets.upload_icon}
                    alt="Upload Icon"
                    className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full p-1"
                  />
                )}
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img className="w-36 rounded" src={userData.image} alt="Profile" />
          )
        }
        <div className="flex-1">
          {
            isEdit ? (
              <input
                type="text"
                value={userData.name}
                onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                className="border px-4 py-2 rounded w-full"
              />
            ) : (
              <p className="text-xl font-semibold">{userData.name}</p>
            )
          }
        </div>
      </div>

      <hr className="my-6" />

      <div className="space-y-4">
        <p className="text-lg font-semibold text-gray-700">CONTACT INFORMATION</p>

        <div>
          <p className="text-sm text-gray-600 font-medium">Email ID:</p>
          <p className="text-gray-800">{userData.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600 font-medium">Phone:</p>
          {
            isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                className="border px-4 py-2 rounded w-full"
              />
            ) : (
              <p className="text-gray-800">{userData.phone}</p>
            )
          }
        </div>

        <div>
          <p className="text-sm text-gray-600 font-medium">Address:</p>
          {
            isEdit ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line1: e.target.value
                    }
                  }))}
                  className="border px-4 py-2 rounded w-full"
                />
                <input
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line2: e.target.value
                    }
                  }))}
                  className="border px-4 py-2 rounded w-full"
                />
              </div>
            ) : (
              <p className="text-gray-800">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )
          }
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <p className="text-lg font-semibold text-gray-700">BASIC INFORMATION</p>
        <div>
          <p className="text-sm text-gray-600 font-medium">Gender:</p>
          {
            isEdit ? (
              <select
                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                value={userData.gender}
                className="border px-4 py-2 rounded w-full"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )
          }
        </div>

        <div>
          <p className="text-sm text-gray-600 font-medium">Birthday:</p>
          {
            isEdit ? (
              <input
                type="date"
                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                value={userData.dob}
                className="border px-4 py-2 rounded w-full"
              />
            ) : (
              <p>{userData.dob}</p>
            )
          }
        </div>
      </div>

      {/* Edit/Save Button at Bottom */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => {
            if (isEdit) {
              updateUserProfileData()
            } else {
              setIsEdit(true)
            }
          }}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
        >
          {isEdit ? "Save Information" : "Edit Information"}
        </button>
      </div>

    </div>
  )
}

export default MyProfile







// // ✅ Fetch user profile from backend
// useEffect(() => {
//   const fetchProfile = async () => {
//     const token = localStorage.getItem('token') // or from context if needed

//     try {
//       const res = await fetch('/api/user/get-profile', {
//         method: 'GET',
//         headers: {
//           token: token
//         }
//       })

//       const data = await res.json()

//       if (data.success) {
//         setUserData(prev => ({
//           ...prev,
//           ...data.userData
//         }))
//       } else {
//         console.error('Profile fetch failed:', data.message)
//       }

//     } catch (error) {
//       console.error('Error fetching profile:', error.message)
//     }
//   }

//   fetchProfile()
// }, [])