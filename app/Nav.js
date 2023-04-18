'use client'

import {faBars, faMoon, faUser} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Nav = () => {
  return (
    <nav className="fixed top-3 w-full flex justify-between text-xl z-10">
        <FontAwesomeIcon icon={faBars} className="border-2 w-4 h-4 rounded p-2 left-12 fixed z-10 bg-black"/>
        <FontAwesomeIcon icon={faMoon} className="w-4 h-4 mr-4 border-2 rounded-full p-2 right-20 fixed z-10 bg-black" />
        <FontAwesomeIcon icon={faUser} className="border-2 w-4 h-4 rounded-full p-2 right-12 fixed z-10 bg-black" />
    </nav>
  )
}

export default Nav