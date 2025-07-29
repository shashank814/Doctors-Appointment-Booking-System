import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      
      if(state === 'Sign Up') {

        const {data} = await axios.post(backendUrl + '/api/user/register',{name,password,email})
        if(data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
         const {data} = await axios.post(backendUrl + '/api/user/login',{password,email})
        if(data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
       toast.error(error.message)
    }
    }

    useEffect(()=>{
      if(token) {
        navigate('/')
      }
    }, [token])

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6">
        
        <div className="text-center">
          <p className="text-2xl font-semibold mb-1">
            {state === 'Sign Up' ? "Create Account" : "Login"}
          </p>
          <p className="text-sm text-gray-600">
            Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment
          </p>
        </div>

        {state === 'Sign Up' && (
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
        >
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600">
          {state === 'Sign Up' ? "Already have an account?" : "Don't have an account?"}
          <span
            className="text-blue-500 cursor-pointer ml-1"
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
          >
            {state === 'Sign Up' ? "Login here" : "Sign up"}
          </span>
        </p>
      </div>
    </form>
  )
}

export default Login
