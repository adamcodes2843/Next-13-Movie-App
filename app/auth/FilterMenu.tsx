'use client'
import { useState } from "react"

interface FilterMenuProps {
    setShowFilter: React.Dispatch<React.SetStateAction<boolean>>,
    setNumberOfReviews: React.Dispatch<React.SetStateAction<number>>
}

const FilterMenu = ({setShowFilter, setNumberOfReviews}:FilterMenuProps) => {
    const [reviewFilter , setReviewFilter] = useState<string>('Show')
    const [ratingFilter, setRatingFilter] = useState('0')

    const handleReviewFilter = () => {
       if (reviewFilter === 'Show') {
            setReviewFilter('Hide')
        }
        if (reviewFilter === 'Hide') {
            setReviewFilter('Only')
        } 
        if (reviewFilter === 'Only') {
            setReviewFilter('Show')
        }
    }
    const handleCancel = () => {
        setShowFilter(false)
        setNumberOfReviews(3)
    }

  return (
    <div className={`flex flex-col pb-3 px-6 w-full gap-3`}>
        <div className={`flex flex-col w-full`}>
            <label className="flex items-center justify-between">Average Rating
            <p className="text-xl">{'>'}</p>
            <input type="text" value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)} maxLength={2} className={`ml-3 md:ml-0 w-20 text-center h-8 bg-black border-2 focus:ring-0 focus:border-skin-base rounded hover:border-skin-base cursor-pointer ${Number.isNaN(Number(ratingFilter)) || ratingFilter.length < 1 ? 'border-red-600' : 'border-white'}`} />
            </label>
        </div>
        <div className={`flex items-center justify-between`}>
            <p>Reviewed</p>
            <button type="button" onClick={() => handleReviewFilter()} className="flex flex-col justify-center items-center w-20 h-8 text-center bg-black border-white border-2 rounded hover:border-skin-base">{reviewFilter}</button>
        </div>
        <div className="flex justify-around items-center gap-3">
            <button type="button" onClick={() => handleCancel()} className="bg-black px-6 py-1 rounded hover:opacity-100 opacity-50">Cancel</button>
            <button type="button" disabled={Number.isNaN(Number(ratingFilter)) || ratingFilter.length < 1 ? true : false} className="bg-black px-6 py-1 rounded hover:opacity-100 opacity-50">Submit</button>
        </div>
    </div>
  )
}

export default FilterMenu