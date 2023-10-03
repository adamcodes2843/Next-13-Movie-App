'use client'

import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useContext, useState, useEffect } from 'react'
import { AppContext, ContextInterface } from '../Context-Provider'
import Link from 'next/link'

type SearchObjectType = {
  title: string,
  id: number
}

interface SearchAndFilterInterface {
  darkMode: boolean,
  view: string,
  searchList: SearchObjectType[]
}

const SearchAndFilter = ({darkMode, view, searchList}:SearchAndFilterInterface) => {
  const [searchWord, setSearchWord] = useState<string>('')
  const {popup, setPopup}:ContextInterface = useContext(AppContext)
  
  useEffect(() => {
    if (searchWord.length > 0) {
      setPopup(false)
    }
  }, [searchWord])
  
  return (
    <div className={`sticky top-2 z-30`}>
    <div className={`${view === 'card' ? 'md:mb-6' : 'mb-12'} lg:mx-auto ml-12 mr-11 rounded-lg flex items-center lg:max-w-3xl xl:max-w-4xl ${popup && popup !== 'searchPopup' && 'opacity-30'} ${darkMode !== false && 'text-black'}`}>
          <input 
          name="search"
          placeholder="Search highlighted movies..."
          value={searchWord}
          className={`${darkMode === false ? 'bg-gray-300 border-skin-base text-skin-dark' : 'bg-black border-skin-dark text-white'} border-l-2 border-b-2 border-t-2 w-full h-9 rounded-l-lg pl-4 focus:outline-none cursor-pointer`}
          onChange={(e) => setSearchWord(e.target.value)}
          />
          <div className={`h-9 w-9 ${darkMode === false ? 'bg-gray-300 border-skin-base' : ' bg-black border-skin-dark'} rounded-r-lg border-r-2 border-b-2 border-t-2 flex items-center justify-center`}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={`opacity-50 h-4 w-4 ${darkMode === false ? 'text-black' : 'text-white'}`}/>
          </div>
      </div>
        <div className={`${!searchWord && 'hidden'} absolute top-12 w-full`}>
          <div className={`${!searchWord && 'hidden'} border-2 rounded-lg p-4 bg-black ${darkMode === false ? 'bg-gray-300 border-skin-base text-skin-dark': 'bg-black bg-opacity-95 border-skin-dark text-white'} lg:mx-auto ml-12 mr-11 flex items-center lg:max-w-3xl xl:max-w-4xl`}>
            <ul className={`flex flex-col gap-1`}>
              {
              searchList.filter(movie => movie?.title?.slice(0, searchWord.length).toLowerCase() === searchWord.toLowerCase()).map(movie => (
                <li key={Math.random()} className={`${darkMode === false ? 'hover:text-skin-base hover:font-semibold' : 'hover:text-skin-light'}`}>
                  <Link href={`/${movie.id}`}>{movie.title}</Link>
                </li>
              ))
              }
              {
              searchList.filter(movie => movie?.title?.slice(0, searchWord.length).toLowerCase() === searchWord.toLowerCase()).length === 0 && 
              <li key={Math.random()} className={`opacity-70 text-red-600`}>
                Your movie is not found in the current top 20 list.
              </li>
              }
            </ul>
          </div>
        </div>
      </div>
  )
}

export default SearchAndFilter