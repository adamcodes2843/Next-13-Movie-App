'use client'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface CommentDataType {
    comment: string,
    userId: string,
    reviewId: string
}

const CommentSection = ({reviewId, setShowComments, userId, comments, userImage, displayName}:any) => {
    const [newComment, setNewComment] = useState<string>('')
    const router = useRouter()

    const handleComments = (reviewId:string, userId:string, comment:string) => {
        let data = {reviewId, userId, comment}
        createUserComment(data)
        setTimeout(() => {
            router.refresh()
        }, 1500)
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
    console.log(comments)
  return (
    <section className={`mt-3 text-center rounded-lg`}>
        <div className={`flex justify-between items-center pb-3`}>
            <div />
            <button type='button' onClick={() => setShowComments(false)} className="text-lg opacity-70 hover:opacity-100 rounded-lg hover:bg-gray-600 hover:bg-opacity-40 w-12 h-10">
              x
            </button>
        </div>
        <ul>
            {
            comments &&
            comments?.map((comment:any) => (
                <li key={Math.random()}>
                    {comment.comment}
                </li>
            ))
            }
        </ul>
        <div className={`flex gap-3 items-center justify-between`}>
            <textarea 
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            maxLength={800}
            placeholder="Make a comment"
            className={`bg-black w-11/12 mx-auto py-3 rounded-lg focus:border-skin-light hover:border-skin-light focus:outline-skin-base focus:ring-0 border-2 border-skin-base resize-none ml-16`} 
            />
            <button type="button" onClick={() => handleComments(reviewId, userId, newComment)} className={`rounded-lg hover:bg-gray-600 hover:bg-opacity-40 w-12 h-10 hover:text-skin-light text-skin-base`}>
                <FontAwesomeIcon icon={faAngleRight} className={`w-5 h-5`} />
            </button>
        </div>
    </section>
  )
}

export default CommentSection