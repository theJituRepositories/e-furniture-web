import React from 'react'

import { NavLink } from 'react-router-dom'
import './navbar.css'

function Navbar () {
  return (
    <div className='navbar-brand '>
      <div className='navbar-brand-logo'>
        <img src='src/assets/images/logo.svg' alt='logo'></img>
      </div>
      <div className='navbar-brand-links'>
        <NavLink
          to={'/'}
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
        >
          Home
        </NavLink>
        <NavLink
          to={'/shop'}
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
        >
          Shop
        </NavLink>
        <NavLink
          to={'/about'}
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
        >
          About
        </NavLink>
        <NavLink
          to={'/contact'}
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
        >
          Contact
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar
