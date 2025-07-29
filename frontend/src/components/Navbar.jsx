// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// import { NavLink, useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'

// const Navbar = () => {
//   const navigate = useNavigate()
//   const [showMenu, setShowMenu] = useState(false)
//   const [showDropdown, setShowDropdown] = useState(false)
//   const {token,setToken} = useContext(AppContext)

//   const logout = () => {
//     setToken('false')
//     localStorage.removeItem('token')
//   }

//   return (
//     <div className="bg-white shadow-md px-6 py-4 relative z-30">
//       <div className="flex justify-between items-center">
//         {/* Logo */}
//         <img
//           onClick={() => navigate('/')}
//           src={assets.logo}
//           alt="Logo"
//           className="h-10 cursor-pointer"
//         />

//         {/* Desktop Links */}
//         <div className="hidden md:flex items-center space-x-6">
//           <NavLink
//             to="/"
//             className="text-gray-700 hover:text-blue-500 font-medium relative group"
//           >
//             <div>HOME</div>
//             <span className="block w-0 group-hover:w-full h-0.5 bg-blue-500 transition-all duration-300"></span>
//           </NavLink>

//           <NavLink
//             to="/doctors"
//             className="text-gray-700 hover:text-blue-500 font-medium relative group"
//           >
//             <div>ALL DOCTORS</div>
//             <span className="block w-0 group-hover:w-full h-0.5 bg-blue-500 transition-all duration-300"></span>
//           </NavLink>

//           <NavLink
//             to="/about"
//             className="text-gray-700 hover:text-blue-700 font-medium relative group"
//           >
//             <div>ABOUT</div>
//             <span className="block w-0 group-hover:w-full h-0.5 bg-blue-700 transition-all duration-300"></span>
//           </NavLink>

//           <NavLink
//             to="/contact"
//             className="text-gray-700 hover:text-blue-700 font-medium relative group"
//           >
//             <div>CONTACT</div>
//             <span className="block w-0 group-hover:w-full h-0.5 bg-blue-700 transition-all duration-300"></span>
//           </NavLink>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           {token ? (
//             <div
//               className="relative"
//               onMouseEnter={() => setShowDropdown(true)}
//               onMouseLeave={() => setShowDropdown(false)}
//             >
//               <div
//                 className="flex items-center gap-2 cursor-pointer group"
//                 onClick={() => setShowDropdown(prev => !prev)}
//               >
//                 <img className="w-8 h-8 rounded-full" src={assets.profile_pic} alt="profile" />
//                 <img className="w-2.5" src={assets.dropdown_icon} alt="dropdown" />
//               </div>

//               {showDropdown && (
//                 <div
//                   className="absolute right-0 pt-4 z-20 bg-stone-100 rounded-md shadow-md p-4 flex flex-col gap-3 text-gray-600 text-sm min-w-48"
//                 >
//                   <p onClick={() => { navigate('/my-profile'); setShowDropdown(false) }} className="hover:text-black cursor-pointer">My Profile</p>
//                   <p onClick={() => { navigate('/my-appointments'); setShowDropdown(false) }} className="hover:text-black cursor-pointer">My Appointments</p>
//                   <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <button
//               onClick={() => navigate('/login')}
//               className="bg-blue-700 text-white px-6 py-2 rounded-full font-medium hidden md:block"
//             >
//               Create Account
//             </button>
//           )}

//           {/* Hamburger Menu Icon */}
//           <img
//             onClick={() => setShowMenu(true)}
//             src={assets.menu_icon}
//             alt="menu"
//             className="w-6 h-6 cursor-pointer md:hidden"
//           />
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ${showMenu ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
//         <div className="flex items-center justify-between px-6 py-4 border-b">
//           <img src={assets.logo} alt="Logo" className="h-10" />
//           <img
//             src={assets.cross_icon}
//             alt="Close"
//             className="w-6 h-6 cursor-pointer"
//             onClick={() => setShowMenu(false)}
//           />
//         </div>
//         <div className="flex flex-col gap-6 p-6 text-gray-700 font-medium">
//           <NavLink onClick={() => setShowMenu(false)} to="/">Home</NavLink>
//           <NavLink onClick={() => setShowMenu(false)} to="/doctors">All Doctors</NavLink>
//           <NavLink onClick={() => setShowMenu(false)} to="/about">About</NavLink>
//           <NavLink onClick={() => setShowMenu(false)} to="/contact">Contact</NavLink>

//           {!token && (
//             <button
//               onClick={() => {
//                 navigate('/login')
//                 setShowMenu(false)
//               }}
//               className="bg-blue-700 text-white px-6 py-2 rounded-full"
//             >
//               Create Account
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar


import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const {token,setToken,userData} = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <div className="bg-white shadow-md px-6 py-4 relative z-30">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          src={assets.logo}
          alt="Logo"
          className="h-10 cursor-pointer"
        />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className="text-gray-700 hover:text-blue-500 font-medium relative group"
          >
            <div>HOME</div>
            <span className="block w-0 group-hover:w-full h-0.5 bg-blue-500 transition-all duration-300"></span>
          </NavLink>

          <NavLink
            to="/doctors"
            className="text-gray-700 hover:text-blue-500 font-medium relative group"
          >
            <div>ALL DOCTORS</div>
            <span className="block w-0 group-hover:w-full h-0.5 bg-blue-500 transition-all duration-300"></span>
          </NavLink>

          <NavLink
            to="/about"
            className="text-gray-700 hover:text-blue-700 font-medium relative group"
          >
            <div>ABOUT</div>
            <span className="block w-0 group-hover:w-full h-0.5 bg-blue-700 transition-all duration-300"></span>
          </NavLink>

          <NavLink
            to="/contact"
            className="text-gray-700 hover:text-blue-700 font-medium relative group"
          >
            <div>CONTACT</div>
            <span className="block w-0 group-hover:w-full h-0.5 bg-blue-700 transition-all duration-300"></span>
          </NavLink>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {token ? (
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setShowDropdown(prev => !prev)}
              >
                <img className="w-8 h-8 rounded-full" src={userData?.image ? userData.image : assets.profile_pic} alt="profile" />
                <img className="w-2.5" src={assets.dropdown_icon} alt="dropdown" />
              </div>

              {showDropdown && (
                <div
                  className="absolute right-0 pt-4 z-20 bg-stone-100 rounded-md shadow-md p-4 flex flex-col gap-3 text-gray-600 text-sm min-w-48"
                >
                  <p onClick={() => { navigate('/my-profile'); setShowDropdown(false) }} className="hover:text-black cursor-pointer">My Profile</p>
                  <p onClick={() => { navigate('/my-appointments'); setShowDropdown(false) }} className="hover:text-black cursor-pointer">My Appointments</p>
                  <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-700 text-white px-6 py-2 rounded-full font-medium hidden md:block"
            >
              Create Account
            </button>
          )}

          {/* Hamburger Menu Icon */}
          <img
            onClick={() => setShowMenu(true)}
            src={assets.menu_icon}
            alt="menu"
            className="w-6 h-6 cursor-pointer md:hidden"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ${showMenu ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <img src={assets.logo} alt="Logo" className="h-10" />
          <img
            src={assets.cross_icon}
            alt="Close"
            className="w-6 h-6 cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
        </div>
        <div className="flex flex-col gap-6 p-6 text-gray-700 font-medium">
          <NavLink onClick={() => setShowMenu(false)} to="/">Home</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/doctors">All Doctors</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/about">About</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/contact">Contact</NavLink>

          {!token && (
            <button
              onClick={() => {
                navigate('/login')
                setShowMenu(false)
              }}
              className="bg-blue-700 text-white px-6 py-2 rounded-full"
            >
              Create Account
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
