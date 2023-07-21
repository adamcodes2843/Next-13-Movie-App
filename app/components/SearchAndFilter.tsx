'use client'

import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { AppContext } from '../Context-Provider'

const SearchAndFilter = () => {
  const {popup}:any = useContext(AppContext)
  return (
    <div className={`sticky top-2 z-30 mb-12 lg:mx-auto ml-12 mr-11 rounded-lg flex items-center lg:max-w-3xl xl:max-w-4xl border-2 ${popup && 'opacity-30'}`}>
          <input 
          placeholder="Search top 20 movies..."
          className="border-white w-full h-8 rounded-l-lg pl-4 focus:outline-none bg-black cursor-pointer"
          />
          <button className="h-8 w-8 bg-black rounded-r-lg border-white">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white"/>
          </button>
      </div>
  )
}

export default SearchAndFilter