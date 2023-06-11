import React, {useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'
import SliderContext from '../../slider/sliderContext'

function Navbar() {
  const { setIsliderConstrained } = useContext(SliderContext)
  const handleLinkClick = () => {
    setIsliderConstrained(true);
  }
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
          onClick={handleLinkClick}
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }

        >
          Shop
        </NavLink>
        <NavLink
          to={'/about'}
          onClick={handleLinkClick}
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }

        >
          About
        </NavLink>
        <NavLink
          to={'/contact'}
          onClick={handleLinkClick}
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
        >
          Contact
        </NavLink>
        <NavLink
          to={'/signup'}
          onClick={handleLinkClick}
  className={({ isActive, isPending }) =>
    isPending ? 'pending' : isActive ? 'active' : ''
  }
>
  SignUp
</NavLink>

      </div>
    </div>
  )
}

export default Navbar
