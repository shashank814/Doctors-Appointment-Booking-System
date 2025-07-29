import React, { useContext, useEffect, useState } from 'react'
import { UNSAFE_withErrorBoundaryProps, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = () => {
    const info = doctors.find(doc => doc._id === docId)
    setDocInfo(info)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])

    // getting current date
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      //  getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      // setting end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailable) {
            // add slots to array
            timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
            })
        }

        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    try {

      const date = docSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {

        toast.error(data.message)

      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots])

  return docInfo && (
    <div className="px-4 md:px-10 lg:px-20 py-8">
      {/* Doctor Details */}
      <div className="flex flex-col md:flex-row items-center gap-10 bg-white shadow-lg rounded-xl p-6 md:p-10">

        {/* Doctor Image with Blue Background */}
        <div className="w-52 h-52 md:w-64 md:h-64 bg-blue-100 rounded-full flex items-center justify-center shadow-inner">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-44 h-44 md:w-56 md:h-56 object-cover rounded-full"
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center justify-center md:justify-start gap-2">
            {docInfo.name}
            <img src={assets.verified_icon} alt="Verified" className="w-5 h-5" />
          </h2>

          <p className="text-gray-600 text-sm sm:text-base">
            {docInfo.degree} — {docInfo.speciality}
          </p>

          <button className="bg-green-100 text-green-600 text-sm px-4 py-1 rounded-full">
            {docInfo.experience}
          </button>

          {/* About Section */}
          <div className="pt-4 border-t border-gray-200">
            <p className="font-semibold text-gray-700 flex items-center gap-1 mb-2">
              About
              <img src={assets.info_icon} alt="Info" className="w-4 h-4" />
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {docInfo.about}
            </p>
          </div>

          {/* Appointment Fee */}
          <p className="text-gray-500 font-medium mt-4">
            Appointment Fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='sm:ml-72 sm:pl-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-blue-700 text-white' : 'border border-gray-200'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-700 text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-blue-700 text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
      </div>

      {/* Listing Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment
