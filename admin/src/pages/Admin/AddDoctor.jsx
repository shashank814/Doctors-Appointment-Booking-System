import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

    const [docImg,setDocImg] = useState(false)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [experience,setExperience] = useState('1 Year')
    const [fees,setFees] = useState('')
    const [about,setAbout] = useState('')
    const [speciality,setSpeciality] = useState('General Physician')
    const [degree,setDegree] = useState('')
    const [address1,setAddress1] = useState('')
    const [address2,setAddress2] = useState('')

    const { backendUrl, aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if(!docImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData()

            formData.append('image',docImg)
            formData.append('name',name)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('experience',experience)
            formData.append('fees',fees)
            formData.append('about',about)
            formData.append('speciality',speciality)
            formData.append('degree',degree)
            formData.append('address',JSON.stringify({line1:address1,line2:address2}))

            // console log formData
            formData.forEach((value,key)=>{
                console.log(`${key} : ${value}`);
            })

            const {data} = await axios.post(backendUrl + '/api/admin/add-doctor',formData, {headers:{aToken}})

            if(data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        }
    }

  return (
    <form onSubmit={onSubmitHandler} className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Top-left aligned title */}
      <p className="text-2xl font-semibold">Add Doctor</p>

      <div className="grid gap-6">
        {/* Upload Section */}
        <div className="flex items-center gap-4">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
              className="w-20 h-20 object-cover rounded-full"
            />
          </label>
          <input onChange={(e)=> setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p className="text-sm text-gray-600">Upload Doctor Picture</p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Your name</p>
              <input onChange={(e) => setName(e.target.value)} value={name}
                type="text"
                placeholder="Name"
                required
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Doctor Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email}
                type="email"
                placeholder="Email"
                required
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Doctor Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password}
                type="password"
                placeholder="Password"
                required
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} required className="w-full border p-2 rounded-md">
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
              </select>
            </div>
            <div>
              <p className="text-sm font-medium">Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees}
                type="number"
                placeholder="fees"
                required
                className="w-full border p-2 rounded-md"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} required className="w-full border p-2 rounded-md">
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div>
              <p className="text-sm font-medium">Education</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree}
                type="text"
                placeholder="Education"
                required
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Address</p>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1}
                type="text"
                placeholder="address 1"
                required
                className="w-full border p-2 rounded-md"
              />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2}
                type="text"
                placeholder="address 2"
                required
                className="w-full border p-2 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">About Doctor</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about}
            placeholder="write about doctor"
            rows={5}
            className="w-full border p-2 rounded-md resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full md:w-fit bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Doctor
        </button>
      </div>
    </form>
  )
}

export default AddDoctor
