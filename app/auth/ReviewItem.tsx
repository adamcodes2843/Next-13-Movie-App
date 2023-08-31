'use client'

import VoteCounter from "./VoteCounter"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function ReviewItem({rating, voteCount, movie, title, reviewText, darkMode}:any) {
    const [showInfo, setShowInfo] = useState(false)
    return(
        <li key={Math.random()} className={`${darkMode === false ? 'bg-gray-600 hover:border-skin-base' : 'hover:border-skin-light'} text-white border-2 rounded border-skin-dark  w-full px-3 md:px-6 py-1 text-sm lg:text-base group relative`}>
            <div className={`w-full flex items-center justify-between gap-6 `}>
                <VoteCounter voteCount={voteCount} />
                <div className="flex flex-col justify-center items-center text-center gap-1 mt-4">
                    <p className="xl:text-xl">{movie}</p>
                    <p className={`text-skin-light`}>{title}</p>
                    <button type="button" onClick={() => setShowInfo(!showInfo)} className={`w-full opacity-0 mx-auto group-hover:opacity-50 ${!showInfo ? 'bottom-0' : 'rotate-180 duration-300'}`}>
                        <FontAwesomeIcon icon={faAngleDown} className="w-5 h-5" />
                    </button>
                </div>
                <p className={`${darkMode === false ? 'border-skin-light' : 'border-skin-dark'} border-2 rounded-full h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 flex justify-center items-center text-xl`}>{rating}</p>
            </div>
            <div className={`${!showInfo && 'hidden'} border-t-[1px] mt-2 border-skin-dark w-5/6 mx-auto p-3`}>
                <p className={`text-center`}>{reviewText}</p>
            </div>
        </li>
    )
}