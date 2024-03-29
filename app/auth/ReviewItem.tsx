'use client'

import VoteCounter from "./VoteCounter"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import CommentButton from "./CommentButton"
import CommentSection from "./CommentSection"
import { useSearchParams } from "next/navigation"
import DeleteItem from "./DeleteItem"
import { CommentsType, MovieType } from "./PageTypes"

interface ReviewItemInterface {
    rating: number,
    movie: string,
    title: string,
    reviewText: string,
    reviewId: string,
    darkMode: boolean,
    userId: string,
    reviewUserId: string,
    comments:  CommentsType,
    upVotes: string[],
    downVotes: string[],
    movies?: MovieType[]
    displayName: string | null,
    userName: string | null
}

export default function ReviewItem({rating, movie, title, reviewText, reviewId, darkMode, userId, reviewUserId, comments, upVotes, downVotes, movies, displayName, userName}:ReviewItemInterface) {
    const searchParams = useSearchParams()!
    const [showInfo, setShowInfo] = useState<boolean>(false)
    const [showComments, setShowComments] = useState<boolean>(false)
    const [allowComments, setAllowComments] = useState<boolean>(true)
    const [showReview, setShowReview] = useState<boolean>(true)

    let movieId = searchParams.get('movie')
    
    useEffect(() => {
        findCommentPreference(reviewUserId)
    }, [showInfo])

    useEffect(() => {
        if (movieId && movies) {
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
    }, [movieId])

    async function findCommentPreference(id:string) {
            fetch(`https://pizza-night-highlights.vercel.app/api/getCommentPreference/${id}`)
            .then(response => {
                if(!response.ok) {
                    throw Error('could not fetch the data for theat resource')
                }
                return response.json()
            })
            .then(data => {
                setAllowComments(data.allowComments)
            })
    }

    return(
        <li key={Math.random()}>
        {
            showReview &&
        <div className={`${darkMode === false ? 'bg-white bg-opacity-70 hover:border-skin-base text-skin-dark' : 'text-white hover:border-skin-light'}  border-2 rounded border-skin-dark  w-full px-3 md:px-6 py-1 text-sm lg:text-base group relative`}>
            <div className={`w-full flex items-center justify-between gap-6 `}>
                <VoteCounter userId={userId} upVotes={upVotes} downVotes={downVotes} reviewId={reviewId} darkMode={darkMode} />
                <div className="flex flex-col justify-center items-center text-center gap-1 mt-4">
                    <p className={`${darkMode === false && 'font-semibold'} xl:text-xl`}>{movie}</p>
                    <p className={`${darkMode === false ? "text-skin-base" : "text-skin-light"}`}>{title}</p>
                    <button type="button" onClick={() => setShowInfo(!showInfo)} className={`w-full opacity-0 mx-auto ${darkMode !== false ? 'group-hover:opacity-50' : 'group-hover:opacity-100'} ${!showInfo ? 'bottom-0' : 'rotate-180 duration-300'}`}>
                        <FontAwesomeIcon icon={faAngleDown} className="w-5 h-5" />
                    </button>
                </div>
                <p className={`${darkMode === false ? 'border-skin-base font-semibold' : 'border-skin-dark group-hover:border-skin-light'} border-2 rounded-full h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 flex justify-center items-center text-xl`}>{rating}</p>
            </div>
            <div className={`${!showInfo && 'hidden'} border-t-[1px] mt-2 border-skin-dark w-5/6 mx-auto py-3`}>
                <p className={`text-center mx-3`}>{reviewText}</p>
                { reviewUserId === userId && 
                    <div className={`absolute left-2 md:left-6 lg:left-[1.6rem] bottom-3 rounded-lg opacity-70 hover:opacity-100`}>
                        <DeleteItem id={reviewId} item={'review'} darkMode={darkMode} />
                    </div>
                }
                { allowComments && <CommentButton commentCount={comments?.length} setShowComments={setShowComments} showComments={showComments} darkMode={darkMode} /> }
                {showComments && allowComments && 
                    <CommentSection darkMode={darkMode} comments={comments} userId={userId} reviewId={reviewId} setShowComments={setShowComments} displayName={displayName} userName={userName}/>
                    }
            </div>
        </div>
        }
        </li>
    )
}