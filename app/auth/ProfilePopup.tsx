'use client'

import { faUser, faStar, faGear, faRightFromBracket, faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { signIn, signOut } from "next-auth/react"
import { useState, useContext } from 'react'
import { AppContext } from '../Context-Provider'

const ProfilePopup = ({session, reviews, comments, id, name, displayName}) => {
  const [showStats, setShowStats] = useState<boolean>(false)
  const {popup, setPopup }:any = useContext(AppContext)

  const karmaCounter = () => {
    if (session) {
        let reviewVotes = 0
        let commentVotes = 0
        if (reviews) {
            reviewVotes = reviews.reduce((acc:number, curr:any) => acc + curr.voteCount, 0)
        }
        // if (comments) {
        //     commentVotes = comments.reduce((acc:number, curr:any) => acc + curr.voteCount, 0)
        // }
        return reviewVotes + commentVotes
    } else {
        return 0
    }
}

  const level = () => {
    let totalXP = 0
    if (reviews){
      let reviewXP = 0
      let commentXP = 0
      let karmaXP = 0
      if (reviews) {
          reviewXP = reviews.length * 150
      }
      if (comments) {
          commentXP = comments.length * 10
      }
      if (reviews || comments) {
          karmaXP = Math.floor(karmaCounter() / 10) * 50
      }
      totalXP = reviewXP + commentXP + karmaXP
    }
    return Math.floor(totalXP / 150)
  }
  
  return (
    <div className={`fixed flex flex-col border-l-[1px] border-white right-0 w-[21rem] md:w-96 top-0 bottom-0 z-40 bg-black bg-opacity-95 rounded-l-lg px-12 pt-3 pb-3 ${popup !== 'profilePopup' && 'hidden'}`}>
      <div className='flex justify-between items-center'>
      <div className={`border-2 rounded-lg px-3 py-1 border-skin-light ${!session?.user && 'opacity-0'}`}>
      {displayName ? displayName : name ? name : ''}
      </div>
      <button type='button' onClick={()=>setPopup(false)} className="text-lg rounded-lg hover:bg-gray-600 hover:bg-opacity-40 px-3 py-1">
        x
      </button>
      </div>
      <ul className={`border-b-[1px] py-4 ${!session?.user && 'hidden'}`}>
        <li className="hover:bg-gray-600 rounded-lg hover:bg-opacity-40">
        <Link href={`/profile`} onClick={()=>setPopup(false)} className="p-2 inline-block w-full h-full">
        <FontAwesomeIcon icon={faUser} className="mr-6 w-5" />
          Your Profile
        </Link>
        </li>
        <li className="hover:bg-gray-600 rounded-lg hover:bg-opacity-40">
        <Link href="/reviews/review-history" onClick={()=>setPopup(false)} className="p-2 inline-block w-full h-full">
        <FontAwesomeIcon icon={faStar} className="mr-6 w-5" />
          Your Reviews
        </Link>
        </li>
        <li className="hover:bg-gray-600 rounded-lg hover:bg-opacity-40">
        <Link href="/reviews/comment-history" onClick={() => setPopup(false)} className="p-2 inline-block w-full h-full">
        <FontAwesomeIcon icon={faComment} className="mr-6 w-5" />
          Your Comments
        </Link>
        </li>
      </ul>
      <div className={`flex justify-between items-center pt-4 ${!session?.user && 'hidden'}`}>
      <h2 className={`text-sm opacity-50 ${!session?.user && 'hidden'}`}>Pizza Night Stats</h2>
      <button type="button" onClick={() => setShowStats(!showStats)}  className={`text-lg py-1 px-3 rounded-lg hover:bg-gray-600 hover:bg-opacity-40 ${!session?.user && 'hidden'}`}>{showStats ? '-' : '+'}</button>
      </div>
      {showStats && 
      <div className="pt-4">
        <h2 className="text-sm text-center flex justify-between hover:border-skin-base hover:bg-opacity-20 hover:bg-gray-600 mr-3 py-1 px-2 border-l-2 border-transparent">
          Level 
          <span className="text-skin-light">{level()}</span>
        </h2>
        <ul className={`pr-[0.65rem] text-sm flex flex-col ${!session?.user && 'hidden'}`}>
        <li className="flex justify-between items-center hover:border-skin-base cursor-default py-1 px-2 border-l-2 border-transparent hover:bg-opacity-20 hover:bg-gray-600">
          <p>Reviews</p>
          <p className="text-skin-light">{reviews ?  reviews.length : '0'}</p>
        </li>
        <li className="flex justify-between items-center hover:border-skin-base cursor-default py-1 px-2 border-l-2 border-transparent hover:bg-opacity-20 hover:bg-gray-600">
          <p>Comments</p>
          <p className="text-skin-light">{comments ? comments.length : '0'}</p>
        </li>
        <li className="flex justify-between items-center hover:border-skin-base cursor-default py-1 px-2 border-l-2 border-transparent hover:bg-opacity-20 hover:bg-gray-600">
          <p>Karma</p>
          <p className="text-skin-light">{karmaCounter()}</p>
        </li>
        <li className="flex justify-between items-center hover:border-skin-base cursor-default py-1 px-2 border-l-2 border-transparent hover:bg-opacity-20 hover:bg-gray-600">
          <p>Average Rating</p>
          <p className="text-skin-light">{reviews ? Math.round(reviews.reduce((acc:number, curr:any) => acc + curr.rating, 0) / reviews.length) : '0'}</p>
        </li>
      </ul>
      </div>
      }
      
        <button type="button" onClick={() => setPopup('settingsPopup')} className={` hover:bg-gray-600 rounded-lg hover:bg-opacity-40 p-2 text-left mt-auto ${!session?.user && 'hidden'} w-full`} >
        <FontAwesomeIcon icon={faGear} className="mr-6 w-5" />
        Settings
        </button>
        {
          !session?.user ? 
          <button type='button' onClick={() => signIn()} className={`hover:bg-gray-600 rounded-lg hover:bg-opacity-40 p-2 my-4 text-3xl h-full text-center w-full`}>
            Sign In
          </button> :
          <button type="button" onClick={() => signOut()} className="hover:bg-gray-600 rounded-lg hover:bg-opacity-40 p-2 text-left">
          <FontAwesomeIcon icon={faRightFromBracket} className="mr-6 w-5" />Sign Out
          </button>
        }
    </div>
  )
}

export default ProfilePopup