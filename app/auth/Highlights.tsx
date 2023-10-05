'use client'
import { useState } from "react"
import { ReviewsType } from "./PageTypes"
import { quoteList } from '../auth/quoteList'

interface HighlightsType {
  reviews: ReviewsType,
  darkMode: boolean,
  heighestRating: number,
  lowestRating: number,
  reviewed: number
}

const Highlights = ({reviews, darkMode, heighestRating, lowestRating, reviewed}:HighlightsType) => {
  const [showRated, setShowRated] = useState<string>('off')
  const highest = 'highest'
  const lowest = 'lowest'
  const off = 'off'

  let heighestReviews = reviews?.filter(review => review.rating === heighestRating)
  let lowestReviews = reviews?.filter(review => review.rating === lowestRating)
  let reviewPercent = reviewed  ? `${(String(reviewed / 20 * 100))}%` : '0%'
  
  return (
    <section className={`${darkMode === false && 'text-black'} w-full lg:self-start h-[12.5rem] flex flex-col justify-between`}>
            <div className="flex items-center gap-3 w-full"><h2 className="">Highlights</h2><div className={`${darkMode === false ? 'bg-black' : 'bg-white bg-opacity-70'} h-[1px] flex-grow`} /></div>
            {
              showRated === off ?
              <>
                <div className={`${darkMode === false && 'border-black bg-white bg-opacity-70'} w-full max-w-[800px] h-8 border-2 rounded-2xl p-1 relative mx-auto mt-4 mb-1`}>
                  <div className={`h-full bg-skin-base rounded-2xl`} style={{width: reviewPercent}} />
                  <h2 className="absolute w-full text-center pb-[2px] left-0 bottom-0 mx-auto">{reviewPercent}</h2>
                </div>
                <h1 className="text-center">{quoteList[reviewed]}</h1>
              </> 
              :
              showRated === highest ?
              <div className={`w-full flex justify-center items-center text-center gap-3 mt-4 p-1 text-xl`}>
                <p className={`text-xl`}>{reviews.length > 0 ? heighestReviews[0].movie : "No reviews"}</p>
                <p className={`h-8 w-8 border-2 rounded-full ${darkMode === false ? 'border-skin-base' : 'border-skin-light'} `}>{reviews.length > 0 && heighestReviews[0].rating}</p>
              </div>
              :
              <div className={`w-full flex justify-center items-center text-center gap-3 mt-4 p-1 text-xl`}>
                <p className={`text-xl`}>{reviews.length > 0 ? lowestReviews[0].movie : "No reviews"}</p>
                <p className={`h-8 w-8 border-2 rounded-full ${darkMode === false ? 'border-skin-base' : 'border-skin-light'} `}>{reviews.length > 0 && lowestReviews[0].rating}</p>
              </div>
            }
              <div className="flex w-full gap-4 justify-around items-center mt-4">
                <button type="button" onClick={() => setShowRated(showRated !== highest ? highest : off)} className={`${darkMode === false ? 'shadow hover:shadow-inner hover:shadow-black shadow-black bg-white bg-opacity-70' : 'bg-gray-600 shadow-inner hover:shadow-none bg-opacity-30'} text-center p-4 flex-grow shadow-gray-600`}>
                    All Time<br />Highest Rated
                </button>
                <button type="button" onClick={() => setShowRated(showRated !== lowest ? lowest : off)} className={`${darkMode === false ? 'shadow hover:shadow-inner hover:shadow-black shadow-black bg-white bg-opacity-70' : 'bg-gray-600 shadow-inner hover:shadow-none bg-opacity-30'} text-center p-4 flex-grow shadow-gray-600`}>
                    All Time<br />Lowest Rated
                </button>
            </div>    
    </section>
  )
}

export default Highlights