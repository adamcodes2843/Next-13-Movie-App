'use client'
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from 'react'
import { MovieType, UserObject } from "./PageTypes"

interface UserItemInterface {
    postDate: Date,
    reviewUserId: string,
    movies:  MovieType[],
    movie: string,
    darkMode: boolean
}

export default function UserItem({postDate, reviewUserId, movies, movie, darkMode}: UserItemInterface) {
    const [userInfo, setUserInfo] = useState<UserObject | null>(null)
    const [showReview, setShowReview] = useState<boolean>(true)
    const searchParams = useSearchParams()!
    let movieId = searchParams.get('movie')
    useEffect(() => {
        findReviewer(reviewUserId)
    }, [movieId])

    async function findReviewer(id:string) {
        fetch(`http://localhost:3000/api/getReviewer/${id}`)
        .then(response => {
            if(!response.ok) {
                throw Error('could not fetch the data for that resource')
            }
            return response.json()
        })
        .then(data => {
            setUserInfo(data)
        })
        if (movieId) {
            let movieChoice = movies.filter((option) => String(option.id) === movieId)
            if (movieChoice[0].title === movie) {
               setShowReview(true)
            } else {
               setShowReview(false)
            }
           } 
           if (!movieId) {
               setShowReview(true)
           }
    }
    
    return (
        <li key={Math.random()}>
            {showReview && 
            <div className={`bg-opacity-40 bg-gradient-to-r from-skin-dark p-3 flex justify-between gap-3 text-sm md:text-base mb-2`}>
                <p>{userInfo?.displayName}</p>
                <p className={`${darkMode === false && 'text-skin-base'}`}>{String(postDate).split(' ').slice(1,4).join('-')}</p>
            </div>
            }
        </li>
    )
}