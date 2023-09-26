'use client'

import { faHouse, faComments, faMoon, faTableCells, faSun, faList, faSort, faFilter, faRightLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Image from 'next/image'
import pizzaSlice from '../../public/assets/pizza-icon-18.png'
import { AppContext, ContextInterface } from '../Context-Provider'
import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoadingSVG from './LoadingSVG'
import { ReviewsType, SessionType, SettingsType } from './PageTypes'
import FilterMenu from './FilterMenu'
import SortMenu from './SortMenu'

interface HamburgerInterface {
  session: SessionType | null,
  reviews: ReviewsType,
  settings: SettingsType,
  dbDarkMode: boolean
}

const HamburgerPopup = ({session, reviews, settings, dbDarkMode}:HamburgerInterface) => {
  const {setPopup, popup, setDisableButton, disableButton}:ContextInterface = useContext(AppContext)
  const [numberOfReviews, setNumberOfReviews] = useState<number>(3)
  const [showSaving, setShowSaving] = useState<boolean | string>(false)
  const [darkMode, setDarkMode] = useState<boolean>(true)
  const [viewMode, setViewMode] = useState<string>('')
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [showSort, setShowSort] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    setDarkMode(settings?.darkMode)
    if (settings?.view) {
      setViewMode(settings?.view)
    } else {
      setViewMode('grid')
    }
  }, [popup])
  const handleDarkMode = (id:string, data:boolean) => {
    updateDarkMode(id, data)
    setShowSaving('dark')
    setDarkMode(!darkMode)
    setDisableButton(true)
    setTimeout(() => {
      setShowSaving(false)
      setDisableButton(false)
      router.refresh()
    }, 1000)
  }

  const gridListMode = (id: string, data:string) => {
    updateView(id, data)
    router.push('/')
    setShowSaving('view')
    setDisableButton(true)
    if (data === 'grid') {
      setViewMode('grid')
    } else if (data === 'list') {
      setViewMode('list')
    } else if (data === 'card') {
      setViewMode('card')
    }
    setTimeout(() => {
      router.refresh()
      setShowSaving(false)
      setDisableButton(false)
    }, 1000)
  }
  
  const handleFilter = () => {
    if (showFilter) {
      setShowFilter(false)
      setNumberOfReviews(3)
    } else if (!showFilter) {
      setShowSort(false)
      setShowFilter(true)
      setNumberOfReviews(0)
    }
  }

  const handleSort = () => {
    if (showSort) {
      setShowSort(false)
      setNumberOfReviews(3)
    } else if (!showSort) {
      setShowFilter(false)
      setShowSort(true)
      setNumberOfReviews(0)
    }
  }

  async function updateDarkMode(id:string, data:boolean) {
    try{
      fetch(`http://localhost:3000/api/darkModeSwitch/${id}`, {
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
      fetch(`http://localhost:3000/api/viewSwitch/${id}`, {
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
    <div className={`fixed border-r-[1px] border-white left-0 w-[21rem] md:w-96 top-0 bottom-0 z-40 ${dbDarkMode === false ? 'bg-gray-600' : 'bg-black bg-opacity-95'} rounded-r-lg px-12 pt-3 pb-6 ${popup !== 'hamburgerPopup' && 'hidden'}`}>
      <div className='flex justify-between items-center'>
      <Image src={pizzaSlice} className="bg-white rounded-full border-2" alt="pizza icon" width={32} height={32} />
      <button type='button' onClick={()=>setPopup(false)} className="text-lg rounded-lg hover:bg-gray-600 hover:bg-opacity-40 px-3 py-1">
        x
      </button>
      </div>
      <div className={`flex flex-col justify-between h-full`}>
        <div>
        <ul className="border-b-[1px] py-4">
            <li className={`${dbDarkMode === false ? 'hover:bg-white' : 'hover:bg-gray-600'} rounded-lg hover:bg-opacity-40`}>
                <Link href="/" onClick={() => setPopup(false)} className="p-2 inline-block w-full h-full">
                <FontAwesomeIcon icon={faHouse} className="pr-6 w-5" /> 
                Home
                </Link>
            </li>
            <li className={`${dbDarkMode === false ? 'hover:bg-white' : 'hover:bg-gray-600'} rounded-lg hover:bg-opacity-40`}>
                <Link href="/reviews/review-board" onClick={()=> setPopup(false)} className="p-2 inline-block w-full h-full">
                <FontAwesomeIcon icon={faComments} className="pr-6 w-5" /> 
                Review Board
                </Link>
            </li>
        </ul>
        <h2 className="text-sm opacity-50 py-4">Recent Reviews</h2>
        <ul className="mb-4 hover:cursor-default">
          { reviews && reviews.sort((date1,date2) => Number(date2.dateTimePosted) - (Number(date1.dateTimePosted) )).map((review) => (
          <li key={Math.random()} className={`py-2 hover:border-skin-base border-l-2 border-l-transparent`}>
            <div>
              <div className="flex gap-2 ml-2 justify-between items-center">
              <p className="text-sm w-5/6">{review.movie}</p>
              <p className={`border-2 rounded-full h-8 w-8 text-center text-skin-light flex justify-center items-center`}>{review.rating}</p>
              </div>
            </div>
          </li>
        )).slice(0,numberOfReviews)}
        </ul>
        <button type="button" className={`text-sm opacity-50 ${numberOfReviews < 9 && numberOfReviews < reviews?.length && 'hover:opacity-100'}`} disabled={numberOfReviews >= 9 || numberOfReviews > reviews?.length || showFilter || showSort} onClick={() => setNumberOfReviews(numberOfReviews + 3)}>Show More</button>
        
        </div>
        <ul className={`py-4 mb-3`}>
          {/* <li className={`hover:bg-gray-600 ${showFilter && 'bg-gray-600 bg-opacity-40'} rounded-lg hover:bg-opacity-40`}>
            <button type='button' onClick={() => handleFilter()} className="p-2 inline-block w-full h-full text-left">
            <FontAwesomeIcon icon={faFilter} className="pr-6 w-5" />
              Filter
            </button>
            {showFilter && <FilterMenu setShowFilter={setShowFilter} setNumberOfReviews={setNumberOfReviews} />}
          </li>
          <li className={`hover:bg-gray-600 ${showSort && 'bg-gray-600 bg-opacity-40'} rounded-lg hover:bg-opacity-40`}>
            <button type='button' onClick={() => handleSort()} className="p-2 inline-block w-full h-full text-left">
            <FontAwesomeIcon icon={faSort} className="pr-6 w-5" />
              Sort
            </button>
            {showSort && <SortMenu setShowSort={setShowSort} setNumberOfReviews={setNumberOfReviews} />}
          </li> */}
          <li className={`${dbDarkMode === false ? 'hover:bg-white' : 'hover:bg-gray-600'} rounded-lg hover:bg-opacity-40`}>
            { viewMode === "grid" || !session?.user ?
              <button type="button" disabled={!settings || disableButton} onClick={() => gridListMode(settings?.userId, 'list')} className="p-2 inline-block w-full h-full text-left relative">
              <FontAwesomeIcon icon={faTableCells} className={`pr-6 w-5 ${!session?.user && 'opacity-40'}`} />
              <span className={`${!session?.user && 'opacity-40'}`}>Grid View</span> <span className="text-red-600 absolute right-4">{!session?.user && 'Sign In'}{showSaving === 'view' && <LoadingSVG />}</span>
              </button>
              : viewMode === 'list' ?
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
          <li className={`${dbDarkMode === false ? 'hover:bg-white' : 'hover:bg-gray-600'} rounded-lg hover:bg-opacity-40`}>
            <button type="button" onClick={() => handleDarkMode(settings?.userId, !settings?.darkMode)} className={`p-2 inline-block w-full h-full text-left relative`} disabled={!settings || disableButton}>
              {
                darkMode || !session?.user ?
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