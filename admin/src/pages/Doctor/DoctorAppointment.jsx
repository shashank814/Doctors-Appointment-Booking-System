import React from 'react'
import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointment = () => {

  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='w-full max-w-6xl m-5'>

      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>

        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b font-medium text-gray-700'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {
          appointments.reverse().map((item, index) => (
            <div key={index} className='grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] grid-cols-1 sm:gap-3 gap-2 py-4 px-6 border-b items-center'>

              <p className='sm:text-left text-gray-700 font-medium'>{index + 1}</p>

              <div className='flex items-center gap-2'>
                <img src={item.userData.image} alt="" className='w-8 h-8 rounded-full object-cover' />
                <p className='text-gray-700'>{item.userData.name}</p>
              </div>

              <div>
                <p className='text-gray-600'>{item.payment ? 'Online' : 'Cash'}</p>
              </div>

              <p className='text-gray-600'>{calculateAge(item.userData.dob)}</p>

              <p className='text-gray-600'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

              <p className='text-gray-600'>{currency}{item.amount}</p>

              {
                item.cancelled 
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-500 text-xs font-medium'>Completed</p> 
                  : <div className='flex gap-2 justify-start sm:justify-center'>
                <img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt="" className='w-5 h-5 cursor-pointer' />
                <img onClick={()=>completeAppointment(item._id)} src={assets.tick_icon} alt="" className='w-5 h-5 cursor-pointer' />
              </div>
              }
            </div>
          ))
        }

      </div>

    </div>
  )
}

export default DoctorAppointment
