'use client'

import {faUser} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { AppContext } from '../Context-Provider'
import { useContext } from 'react'
import Image from 'next/image'

const ProfileButton = ({session, colorTheme}) => {
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
        {
          session?.user?.image ?
          <Image src={session.user.image} alt="user image and profile dropdown button" className={`w-[2.3rem] h-[2.3rem] border-2 rounded-full right-6 md:right-12 top-2 fixed z-50 bg-black hover:border-skin-base border-skin-dark active:border-skin-light transition duration-600`} width={36} height={36} /> :
          <FontAwesomeIcon icon={faUser} className={`border-2 w-4 h-4 rounded-full right-6 p-2 md:right-12 top-2 fixed z-50 bg-black hover:border-skin-base border-skin-dark active:border-skin-light transition duration-600`} />
        }
        
    </button>
  )
}

export default ProfileButton