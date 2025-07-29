import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const MyAppointments = () => {

  const { backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0]+ " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const navigate = useNavigate()


  const getUserAppointments = async () => {

    try {

      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
     try {
      
      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId},{headers:{token}})
      if(data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
      
     } catch (error) {
      console.log(error);
      toast.error(error.message)
     }
  }

  const initPay = (order) => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) =>{
        console.log(response);

        try {

          const {data} = await axios.post(backendUrl + '/api/user/verifyRazorpay',response,{headers:{token}})
          if(data.success) {
            getUserAppointments()
            navigate('/my-appointments')
          }
          
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }

      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()

  }

  const appointmentRazorpay = async (appointmentId) => {

    try {

      const {data} = await axios.post(backendUrl + '/api/user/payment-razorpay',{appointmentId},{headers:{token}})

      if (data.success) {
        
        initPay(data.order)

      }
      
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <p className="text-2xl font-bold text-gray-800 mb-6">My Appointments</p>

      <div className="grid gap-6">
        {appointments.slice(0, 3).map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row gap-4">

            {/* Doctor Image */}
            <div className="w-full sm:w-1/4 flex justify-center items-center bg-blue-100">
              <img src={item.docData.image} alt='' className="w-32 h-32 object-cover rounded-full" />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 space-y-1 text-gray-700">
              <p className="text-lg font-semibold text-gray-900">{item.docData.name}</p>
              <p className="text-sm text-blue-600">{item.docData.speciality}</p>
              <p className="text-sm font-medium mt-2">Address:</p>
              <p className="text-sm">{item.docData.address.line1}</p>
              <p className="text-sm">{item.docData.address.line2}</p>
              <p className="text-sm mt-2">
                <span className="font-medium text-gray-800">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col justify-center items-start sm:items-end gap-2">
              {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button> }
              {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={()=>appointmentRazorpay(item._id)}className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition">
                Pay Online
              </button>}
              {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition">
                Cancel Appointment
              </button>}
              {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>}
              {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500 '>Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
