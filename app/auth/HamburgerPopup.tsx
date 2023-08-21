'use client'

import { faHouse, faComments, faMoon, faTableCells, faSun, faList, faSort, faFilter, faRightLeft } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Image from 'next/image'
import pizzaSlice from '../../public/assets/pizza-icon-18.png'
import { AppContext } from '../Context-Provider'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingSVG from './LoadingSVG'

const HamburgerPopup = ({session, reviews, settings}:any) => {
  const {setPopup, popup, setDisableButton, disableButton}:any = useContext(AppContext)
  const [numberOfReviews, setNumberOfReviews] = useState<number>(3)
  const [showSaving, setShowSaving] = useState<boolean | string>(false)
  const router = useRouter()

  const handleDarkMode = (id:string, data:boolean) => {
    updateDarkMode(id, data)
    router.refresh()
    setShowSaving('dark')
    setDisableButton(true)
    setTimeout(() => {
      setShowSaving(false)
      setDisableButton(false)
    }, 1500)
  }

  const gridListMode = (id: string, data:string) => {
    updateView(id, data)
    router.refresh()
    setShowSaving('view')
    setDisableButton(true)
    setTimeout(() => {
      setShowSaving(false)
      setDisableButton(false)
    }, 1500)
  }

  async function updateDarkMode(id:string, data:boolean) {
    try{
      fetch(`api/darkModeSwitch/${id}`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PATCH'
      })
      .then((response) => response.json())
      .then((json) => console.log(json))
    } catch (error) {
      console.log(error)
    }
  }

  async function updateView(id:string, data:string) {
    try{
      fetch(`api/viewSwitch/${id}`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PATCH'
      })
      .then((response) => response.json())
      .then((json) => console.log(json))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={`fixed border-r-[1px] border-white left-0 w-[21rem] md:w-96 top-0 bottom-0 z-40 bg-black bg-opacity-95 rounded-r-lg px-12 pt-3 pb-6 ${popup !== 'hamburgerPopup' && 'hidden'}`}>
      <div className='flex justify-between items-center'>
      <Image src={pizzaSlice} className="bg-white rounded-full border-2" alt="pizza icon" width={32} height={32} />
      <button type='button' onClick={()=>setPopup(false)} className="text-lg rounded-lg hover:bg-gray-600 hover:bg-opacity-40 px-3 py-1">
        x
      </button>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div>
        <ul className="border-b-[1px] py-4">
            <li className="hover:bg-gray-600 rounded-lg hover:bg-opacity-40">
                <Link href="/" onClick={() => setPopup(false)} className="p-2 inline-block w-full h-full">
                <FontAwesomeIcon icon={faHouse} className="pr-6 w-5" /> 
                Home
                </Link>
            </li>
            <li className="hover:bg-gray-600 rounded-lg hover:bg-opacity-40">
                <Link href="/reviews/review-board" onClick={()=>setPopup(false)} className="p-2 inline-block w-full h-full">
                <FontAwesomeIcon icon={faComments} className="pr-6 w-5" /> 
                Review Board
                </Link>
            </li>
        </ul>
        <h2 className="text-sm opacity-50 py-4">Recent Reviews</h2>
        <ul className="mb-4 cursor-pointer">
          { reviews && reviews.sort((date1,date2):any => (date1.dateTimePosted - date2.dateTimePosted)).map((review):any => (
          <li key={Math.random()} className={`py-2 hover:border-skin-base border-l-2 border-l-transparent`}>
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
            { settings?.view === "grid" || !session?.user ?
              <button type="button" disabled={!settings || disableButton} onClick={() => gridListMode(settings?.userId, 'list')} className="p-2 inline-block w-full h-full text-left relative">
              <FontAwesomeIcon icon={faTableCells} className={`pr-6 w-5 ${!session?.user && 'opacity-40'}`} />
              <span className={`${!session?.user && 'opacity-40'}`}>Grid View</span> <span className="text-red-600 absolute right-4">{!session?.user && 'Sign In'}{showSaving === 'view' && <LoadingSVG />}</span>
              </button>
              : settings?.view === 'list' ?
              <button type="button" disabled={disableButton} onClick={() => gridListMode(settings?.userId, 'card')} className="p-2 inline-block w-full h-full text-left relative">
              <FontAwesomeIcon icon={faList} className="pr-6 w-5" />
              <span>List View</span><span className='absolute right-4'>{showSaving === 'view' && <LoadingSVG />}</span>
              </button>
              : 
              <button type="button" disabled={disableButton} onClick={() => gridListMode(settings?.userId, 'grid')} className="p-2 inline-block w-full h-full text-left relative">
              <FontAwesomeIcon icon={faRightLeft} className="pr-6 w-5" />
              <span>Card View</span><span className='absolute right-4'>{showSaving === 'view' && <LoadingSVG />}</span>
              </button>
            }
          </li>
          <li className="hover:bg-gray-600 rounded-lg hover:bg-opacity-40">
            <button type="button" onClick={() => handleDarkMode(settings?.userId, !settings?.darkMode)} className={`p-2 inline-block w-full h-full text-left relative`} disabled={!settings || disableButton}>
              {
                settings?.darkMode || !session?.user ?
                <>
                  <FontAwesomeIcon icon={faMoon} className={`pr-6 w-5 ${!session?.user && 'opacity-40'}`} />
                  <span className={`${!session?.user && 'opacity-40'}`}>Dark Mode</span> <span className="text-red-600 absolute right-4">{!session?.user && 'Sign In'}{showSaving === 'dark' && <LoadingSVG />}</span>
                </>
                :
                <>
                  <FontAwesomeIcon icon={faSun} className="pr-6 w-5" />
                  <span>Light Mode</span><span className="absolute right-4">{showSaving === 'dark' && <LoadingSVG />}</span>
                </>
              }  
            </button>
          </li>
        </ul>
        </div>
    </div>
  )
}

export default HamburgerPopup