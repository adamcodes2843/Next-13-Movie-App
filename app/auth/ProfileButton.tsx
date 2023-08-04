'use client'

import {faUser} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { AppContext } from '../Context-Provider'
import { useContext } from 'react'

const ProfileButton = () => {
    const {popup, setPopup}:any = useContext(AppContext)
    
    let profileClick = () => {
        if (popup !== 'profilePopup') {
          setPopup('profilePopup')
        }
        else if (popup == 'profilePopup') {
          setPopup(undefined)
        }
      }

  return (
    <button type="button" onClick={() => profileClick()} className="">
        <FontAwesomeIcon icon={faUser} className="border-2 w-4 h-4 rounded-full right-6 p-2 md:right-12 top-2 fixed z-50 bg-black hover:border-green-600 border-green-800 active:border-green-200 transition duration-600" />
    </button>
  )
}

export default ProfileButton