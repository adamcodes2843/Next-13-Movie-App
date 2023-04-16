'use client'

import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const SearchAndFilter = () => {
  return (
    <div className="border-2 border-white w-11/12 md:w-1/2 sticky top-3 z-10 mb-12 mx-auto rounded-lg flex items-center">
          <input 
          placeholder="Search current popular movies..."
          className="w-full h-10 rounded-l-lg pl-4 hover:opacity-100 focus:outline-none focus:opacity-100 bg-black opacity-70"
          />
          <button className="h-10 w-10 p-2 bg-black rounded-r-lg">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white"/>
          </button>
      </div>
  )
}

export default SearchAndFilter