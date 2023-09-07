'use client'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingSVG from './LoadingSVG'

interface CommentDataType {
    comment: string,
    userId: string,
    reviewId: string
}

const CommentSection = ({reviewId, setShowComments, userId, comments}:any) => {
    const [newComment, setNewComment] = useState<string>('')
    const [showSaving, setShowSaving] = useState<boolean>(false)
    const router = useRouter()

    const handleComments = (reviewId:string, userId:string, comment:string) => {
        let data = {reviewId, userId, comment}
        createUserComment(data)
        setShowSaving(true)
        setTimeout(() => {
            router.refresh()
        }, 500)
        setTimeout(() => {
            setShowSaving(false)
        }, 2000)
    }

    async function createUserComment(data: CommentDataType) {
        try {
            fetch(`http://localhost:3000/api/createComment`, {
                body: JSON.stringify(data),
                headers: {
                    'Content-Type' : 'application/json'
                },
                method: 'POST'
            })
            .then((response) => response.json())
            .then((json) => console.log(json))
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <section className={`mt-3 mb-8 xl:mb-6 text-center border-skin-dark border-2 rounded-xl px-3 pt-3 md:p-3 xl:mx-3`}>
        <div className={`flex justify-between items-center pb-3`}>
            <div />
            <button type='button' onClick={() => setShowComments(false)} className="text-lg opacity-70 hover:opacity-100 rounded-lg hover:bg-gray-600 hover:bg-opacity-40 w-6 h-5 p-2 md:p-0 md:w-12 md:h-10 flex justify-center items-center">
              x
            </button>
        </div>
        <ul className={`text-sm flex flex-col gap-3 mx-3 md:mx-6 md:mr-16 xl:mx-16`}>
            {
            comments.length ?
            comments?.map((comment:any) => (
                <li key={Math.random()} className={`flex flex-col md:flex-row justify-between items-start mb-3 md:mb-0 gap-1 md:gap-12`}>
                    <div className={`flex flex-col items-start`}>
                        <p className={`text-skin-light`}>KosmicMicrowave</p>
                        <p className={`opacity-40`}>{String(comment.dateTimePosted).split(' ').slice(1,4).join('-')}</p>
                    </div>
                    <p className={`text-left md:text-right`}>{comment.comment}</p>
                </li>
            ))
            :
            <li className={`text-base opacity-40 py-3 md:py-0`}>No Comments</li>
            }
        </ul>
        <div className={`flex flex-col md:flex-row gap-3 items-center justify-between my-3 md:my-6`}>
            <textarea 
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            maxLength={800}
            placeholder="Make a comment"
            className={`bg-black w-11/12 mx-auto py-3 rounded-lg focus:border-skin-light hover:border-skin-light focus:outline-skin-base focus:ring-0 border-2 border-skin-base resize-none md:ml-6 xl:ml-16`} 
            />
            {
                !showSaving ?
                <>
                    <button type="button" disabled={!newComment.length || !userId} onClick={() => handleComments(reviewId, userId, newComment)} className={`hidden md:block rounded-lg hover:bg-gray-600 hover:bg-opacity-40 w-12 h-10 hover:text-skin-light text-skin-base`}>
                    <FontAwesomeIcon icon={faAngleRight} className={`w-5 h-5`} />
                    </button>
                    <button type="button" disabled={!newComment.length || !userId} onClick={() => handleComments(reviewId, userId, newComment)} className={`md:hidden rounded-lg hover:bg-gray-600 hover:bg-opacity-40 py-2 px-3 ${!newComment.length && 'opacity-40'}`}>Submit</button>
                </>
                :
                <p className={`w-12 h-10 rounded-lg flex justify-center items-center`}>
                    <LoadingSVG />
                </p>
            }
        </div>
    </section>
  )
}

export default CommentSection