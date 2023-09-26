'use client'
import { useState } from "react"

interface SortMenuType {
    setShowSort: React.Dispatch<React.SetStateAction<boolean>>,
    setNumberOfReviews: React.Dispatch<React.SetStateAction<number>>
}

const SortMenu = ({setShowSort, setNumberOfReviews}:SortMenuType) => {
    const [sortDirection, setSortDirection] = useState<string>('High > Low')
    const [using, setUsing] = useState<string>('popularity')

    const handleSortDirection = () => {
        if (sortDirection === 'High > Low') {
            setSortDirection('Low > High')
        } else if (sortDirection === 'Low > High') {
            setSortDirection('High > Low')
        }
    }

    const handleSortBy = () => {
        switch (using) {
            case 'rating':
                setUsing('vote Count')
                break;
            case "vote Count":
                setUsing('name')
                break;
            case "name":
                setUsing('release')
                break;
            case "release":
                setUsing('popularity')
                break;
            case "popularity":
                setUsing('rating')
        }
    }

    const handleCancel = () => {
        setShowSort(false)
        setNumberOfReviews(3)
    }

  return (
    <div className={`flex flex-col pb-3 px-6 w-full gap-3`}>
        <div className={`flex justify-between items-center`}>
            <p>From</p>
            <button type="button" onClick={() => handleSortDirection()} className={`border-2 rounded hover:border-skin-base h-8 w-28`}>{sortDirection}</button>
        </div>
        <div className={`flex justify-between items-center`}>
            <p>Using</p>
            <button type="button" onClick={() => handleSortBy()} className={`border-2 rounded hover:border-skin-base h-8 w-28`}>{using.charAt(0).toUpperCase() + using.slice(1)}</button>
        </div>
        <div className="flex justify-around items-center gap-3">
            <button type="button" onClick={() => handleCancel()} className="bg-black px-6 py-1 rounded hover:opacity-100 opacity-50">Cancel</button>
            <button type="button" className="bg-black px-6 py-1 rounded hover:opacity-100 opacity-50">Submit</button>
        </div>
    </div>
  )
}

export default SortMenu