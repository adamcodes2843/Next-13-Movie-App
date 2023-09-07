'use client'

import VoteCounter from "./VoteCounter"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import CommentButton from "./CommentButton"
import CommentSection from "./CommentSection"
import { useSearchParams } from "next/navigation"

export default function ReviewItem({rating, voteCount, movie, title, reviewText, reviewId, darkMode, userId, reviewUserId, comments, upVotes, downVotes, movies}:any) {
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
        if (movieId) {
         let movieChoice = movies.filter((option:any) => String(option.id) === movieId)
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
            fetch(`http://localhost:3000/api/getCommentPreference/${id}`)
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
        <div className={`${darkMode === false ? 'bg-gray-600 hover:border-skin-base' : 'hover:border-skin-light'} text-white border-2 rounded border-skin-dark  w-full px-3 md:px-6 py-1 text-sm lg:text-base group relative`}>
            <div className={`w-full flex items-center justify-between gap-6 `}>
                <VoteCounter voteCount={voteCount} userId={userId} upVotes={upVotes} downVotes={downVotes} reviewId={reviewId}/>
                <div className="flex flex-col justify-center items-center text-center gap-1 mt-4">
                    <p className="xl:text-xl">{movie}</p>
                    <p className={`text-skin-light`}>{title}</p>
                    <button type="button" onClick={() => setShowInfo(!showInfo)} className={`w-full opacity-0 mx-auto group-hover:opacity-50 ${!showInfo ? 'bottom-0' : 'rotate-180 duration-300'}`}>
                        <FontAwesomeIcon icon={faAngleDown} className="w-5 h-5" />
                    </button>
                </div>
                <p className={`${darkMode === false ? 'border-skin-light' : 'border-skin-dark'} border-2 rounded-full h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 flex justify-center items-center text-xl group-hover:border-skin-light`}>{rating}</p>
            </div>
            <div className={`${!showInfo && 'hidden'} border-t-[1px] mt-2 border-skin-dark w-5/6 mx-auto py-3`}>
                <p className={`text-center mx-3`}>{reviewText}</p>
                { allowComments && <CommentButton commentCount={comments?.length} setShowComments={setShowComments} showComments={showComments} /> }
                {showComments && allowComments && <CommentSection comments={comments} userId={userId} reviewId={reviewId} setShowComments={setShowComments} />}
            </div>
        </div>
        }
        </li>
    )
}