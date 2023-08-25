'use client'

import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { AppContext } from '../Context-Provider'

const SearchAndFilter = ({darkMode, view}) => {
  const {popup}:any = useContext(AppContext)
  return (
    <div className={`sticky top-2 z-30 ${view === 'card' ? 'md:mb-6' : 'mb-12'} lg:mx-auto ml-12 mr-11 rounded-lg flex items-center lg:max-w-3xl xl:max-w-4xl ${popup && 'opacity-30'} ${darkMode !== false && 'text-black'}`}>
          <input 
          placeholder="Search highlighted movies..."
          className={`${darkMode === false ? 'bg-gray-300 border-skin-base text-skin-dark' : 'bg-black border-skin-dark text-white'} border-l-2 border-b-2 border-t-2 w-full h-8 rounded-l-lg pl-4 focus:outline-none cursor-pointer`}
          />
          <button className={`h-8 w-8 ${darkMode === false ? 'bg-gray-300 border-skin-base' : ' bg-black border-skin-dark'} rounded-r-lg border-r-2 border-b-2 border-t-2`}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={`opacity-50 hover:opacity-100 ${darkMode === false ? 'text-black' : 'text-white'}`}/>
          </button>
      </div>
  )
}

export default SearchAndFilter