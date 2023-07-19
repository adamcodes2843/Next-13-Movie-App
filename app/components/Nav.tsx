'use client'

import {faBars, faUser} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { AppContext } from '../Context-Provider'
import { useContext } from 'react'
import HamburgerPopup from './HamburgerPopup'
import ProfilePopup from './ProfilePopup'

const Nav = () => {
  const {setPopup, popup}:any = useContext(AppContext)
  let profileClick = () => {
    if (popup !== 'profilePopup') {
      setPopup('profilePopup')
    }
    else if (popup == 'profilePopup') {
      setPopup(undefined)
    }
  }
  let hamburgerClick = () => {
    if (popup !== 'hamburgerPopup') {
      setPopup('hamburgerPopup')
    }
    else if (popup == 'hamburgerPopup') {
      setPopup(undefined)
    }
  }
  return (
    <nav className="fixed bg-gradient-to-r from-black to-gray-600 w-full h-[3.25rem] flex justify-between items-center text-xl z-20 text-white top-0 bg-opacity-90">
      <button type="button" onClick={() => hamburgerClick()} className="">
        <FontAwesomeIcon icon={faBars} className={`border-2 w-4 h-4 rounded p-2 md:left-12 left-6 fixed top-2 z-50 bg-black hover:border-green-600 border-green-800 active:border-green-200 transition duration-600`}/>
      </button>
      <HamburgerPopup popup={popup}/>
      <button type="button" onClick={() => profileClick()} className="">
        <FontAwesomeIcon icon={faUser} className="border-2 w-4 h-4 rounded-full right-6 p-2 md:right-12 top-2 fixed z-50 bg-black hover:border-green-600 border-green-800 active:border-green-200 transition duration-600" />
      </button>
      <ProfilePopup popup={popup} />
    </nav>
  )
}

export default Nav