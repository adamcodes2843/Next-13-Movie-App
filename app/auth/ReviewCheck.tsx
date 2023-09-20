'use client'

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from 'react'
import Link from "next/link"

const ReviewCheck = ({movies, reviews, darkMode}:any) => {
    const [count, setCount] = useState<number | string>('off') 
    const searchParams = useSearchParams()!
    let movieId = searchParams.get('movie')
    let selected = movies.filter(movie => String(movie.id) === movieId)[0]

    useEffect(() => {
        if (movieId) {
            setCount(reviews.filter(review => review.movie === selected.title).length)
        } else {
            setCount('off')
        }
    }, [movieId])

  return (
    <>
        
        {count === 0 && 
            <div className={`flex flex-col items-center gap-6 lg:mt-12`}>
                <p className={`text-2xl ${darkMode === false && 'text-black'}`}>Be the first to review</p>
                <Link href={`/${movieId}`} className={`p-4 text-center rounded-full flex justify-center items-center bg-skin-base hover:bg-skin-dark active:bg-skin-base`}>{selected?.title}</Link>
            </div>
        }  
    </>
  )
}

export default ReviewCheck