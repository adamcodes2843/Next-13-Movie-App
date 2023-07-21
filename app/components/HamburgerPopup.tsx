'use client'

import { faHouse, faComments, faMoon, faTableCells } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Image from 'next/image'
import pizzaSlice from '../../public/assets/pizza-icon-18.png'

const HamburgerPopup = ({popup, setPopup}:any) => {
    
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
                <Link href="/" className="p-2 inline-block w-full h-full">
                <FontAwesomeIcon icon={faHouse} className="pr-6 w-5" /> 
                Home
                </Link>
            </li>
            <li className="hover:bg-gray-600 rounded-lg hover:bg-opacity-40">
                <Link href="/reviews/review-board" className="p-2 inline-block w-full h-full">
                <FontAwesomeIcon icon={faComments} className="pr-6 w-5" /> 
                Review Board
                </Link>
            </li>
        </ul>
        <h2 className="text-sm opacity-50 py-4">Recent Reviews</h2>
        <button type="button" className="text-sm opacity-50">Show More</button>
        </div>
        <ul className="py-4 mb-3">
          <li className="hover:bg-gray-600 rounded-lg hover:bg-opacity-40">
            <button type="button" className="p-2 inline-block w-full h-full text-left">
            <FontAwesomeIcon icon={faMoon} className="pr-6 w-5" />
            Dark Mode
            </button>
          </li>
          <li className="hover:bg-gray-600 rounded-lg hover:bg-opacity-40">
            <button type="button" className="p-2 inline-block w-full h-full text-left">
            <FontAwesomeIcon icon={faTableCells} className="pr-6 w-5" />
            Grid View
            </button>
          </li>
        </ul>
        </div>
    </div>
  )
}

export default HamburgerPopup