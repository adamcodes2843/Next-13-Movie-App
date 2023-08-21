'use client'

import {faBars} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { AppContext } from '../Context-Provider'
import { useContext } from 'react'

const HamburgerButton = () => {
    const {popup, setPopup}:any = useContext(AppContext)

    let hamburgerClick = () => {
    if (popup !== 'hamburgerPopup') {
      setPopup('hamburgerPopup')
    }
    else if (popup == 'hamburgerPopup') {
      setPopup(false)
    }
  }

  return (
    <button type="button" onClick={() => hamburgerClick()} className="">
        <FontAwesomeIcon icon={faBars} className={`border-2 w-4 h-4 rounded p-2 md:left-12 left-6 fixed top-2 z-50 bg-black hover:border-skin-base border-skin-dark active:border-skin-light`}/>
    </button>
  )
}

export default HamburgerButton