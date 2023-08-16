'use client'

import { faHouse, faComments, faMoon, faTableCells, faSun, faList, faSort, faFilter, faPalette } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Image from 'next/image'
import pizzaSlice from '../../public/assets/pizza-icon-18.png'
import { AppContext } from '../Context-Provider'
import { useContext, useState } from 'react'

const HamburgerPopup = ({session, reviews, settings}:any) => {
  const {setPopup, popup, view, setView}:any = useContext(AppContext)
  const [numberOfReviews, setNumberOfReviews] = useState<number>(3)

  const gridListMode = () => {
    if (view === "grid")  {
      setView("list")
    } else if (view === "list") {
      setView("grid")
    }
  }

  return (
    <div className={`fixed border-r-[1px] border-white left-0 w-[21rem] md:w-96 top-0 bottom-0 z-40 bg-black bg-opacity-95 rounded-r-lg px-12 pt-3 pb-6 ${popup !== 'hamburgerPopup' && 'hidden'}`}>
      <div className='flex justify-between items-center'>
      <Image src={pizzaSlice} className="bg-white rounded-full border-2" alt="pizza icon" width={32} height={32} />
      <button type='button' onClick={()=>setPopup(undefined)} className="text-lg rounded-lg hover:bg-gray-600 hover:bg-opacity-40 px-3 py-1">
        x
      </button>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div>
        <ul className="border-b-[1px] py-4">
            <li className="hover:bg-gray-600 rounded-lg hover:bg-opacity-40">
                <Link href="/" onClick={() => setPopup(undefined)} className="p-2 inline-block w-full h-full">
                <FontAwesomeIcon icon={faHouse} className="pr-6 w-5" /> 
                Home
                </Link>
            </li>
            <li className="hover:bg-gray-600 rounded-lg hover:bg-opacity-40">
                <Link href="/reviews/review-board" onClick={()=>setPopup(undefined)} className="p-2 inline-block w-full h-full">
                <FontAwesomeIcon icon={faComments} className="pr-6 w-5" /> 
                Review Board
                </Link>
            </li>
        </ul>
        <h2 className="text-sm opacity-50 py-4">Recent Reviews</h2>
        <ul className="mb-4 cursor-pointer">
          { reviews && reviews.sort((date1,date2):any => (date1.dateTimePosted - date2.dateTimePosted)).map((review):any => (
          <li key={Math.random()} className={`py-2 hover:border-skin-base border-l-2 border-l-black`}>
            <Link href='/'>
              <div className="flex gap-2 ml-2 justify-between items-center">
              <p className="text-sm">{review.movie}</p>
              <p className={`border-2 rounded-full h-8 w-8 text-center text-skin-light flex justify-center items-center`}>{review.rating}</p>
              </div>
            </Link>
          </li>
        )).slice(0,numberOfReviews)}
        </ul>
        <button type="button" className={`text-sm opacity-50 ${numberOfReviews < 9 && numberOfReviews < reviews?.length && 'hover:opacity-100'}`} disabled={numberOfReviews >= 9 || numberOfReviews > reviews?.length} onClick={() => setNumberOfReviews(numberOfReviews + 3)}>Show More</button>
        
        </div>
        <ul className="py-4 mb-3">
          <li className="hover:bg-gray-600 rounded-lg hover:bg-opacity-40">
            <button type='button' className="p-2 inline-block w-full h-full text-left">
            <FontAwesomeIcon icon={faFilter} className="pr-6 w-5" />
              Filter
            </button>
          </li>
          <li className="hover:bg-gray-600 rounded-lg hover:bg-opacity-40">
            <button type='button' className="p-2 inline-block w-full h-full text-left">
            <FontAwesomeIcon icon={faSort} className="pr-6 w-5" />
              Sort
            </button>
          </li>
          <li className="hover:bg-gray-600 rounded-lg hover:bg-opacity-40">
            { view === "grid" ?
              <button type="button" onClick={() => gridListMode()} className="p-2 inline-block w-full h-full text-left">
              <FontAwesomeIcon icon={faTableCells} className="pr-6 w-5" />
              Grid View
              </button>
              :
              <button type="button" onClick={() => gridListMode()} className="p-2 inline-block w-full h-full text-left">
              <FontAwesomeIcon icon={faList} className="pr-6 w-5" />
              List View
              </button>
            }
          </li>
          <li className="hover:bg-gray-600 rounded-lg hover:bg-opacity-40">
            <button type='button' className="p-2 inline-block w-full h-full text-left relative" disabled={!settings}>
            <FontAwesomeIcon icon={faPalette} className={`pr-6 w-5 ${!session?.user && 'opacity-40'}`} />
              <span className={`${!session?.user && 'opacity-40'}`}>Color Theme</span> <span className="text-red-600 absolute right-4">{!session?.user && 'Sign In'}</span>
            </button>
          </li>
          <li className="hover:bg-gray-600 rounded-lg hover:bg-opacity-40">
              <button type="button" /*onClick={() => darkLightMode()}*/ className={`p-2 inline-block w-full h-full text-left relative`} disabled={!settings}>
                  <FontAwesomeIcon icon={faMoon} className={`pr-6 w-5 ${!session?.user && 'opacity-40'}`} />
                  <span className={`${!session?.user && 'opacity-40'}`}>Dark Mode</span> <span className="text-red-600 absolute right-4">{!session?.user && 'Sign In'}</span>
                  </button>
                  
                  {/* <button type="button" onClick={() => darkLightMode()} className="p-2 inline-block w-full h-full text-left">
                  <FontAwesomeIcon icon={faSun} className="pr-6 w-5" />
                  Light Mode
                  </button>   */}
          </li>
        </ul>
        </div>
    </div>
  )
}

export default HamburgerPopup