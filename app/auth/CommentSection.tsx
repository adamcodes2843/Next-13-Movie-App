'use client'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faAngleRight, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useState} from 'react'
import { useRouter } from 'next/navigation'
import LoadingSVG from './LoadingSVG'
import Comment from './Comment'
import { CommentType, CommentsType } from './PageTypes'

interface CommentDataType {
    comment: string,
    userId: string,
    reviewId: string,
    commenter: string
}

interface CommentSectionProps {
    reviewId: string,
    setShowComments: React.Dispatch<React.SetStateAction<boolean>>,
    userId: string,
    comments: CommentsType,
    darkMode: boolean,
    userName: string | null,
    displayName: string | null
}

const CommentSection = ({reviewId, setShowComments, userId, comments, darkMode, userName, displayName}:CommentSectionProps) => {
    const [textField, setTextField] = useState<string>('')
    const [showSaving, setShowSaving] = useState<boolean>(false)
    const router = useRouter()

    const handleComments = (reviewId:string, userId:string, comment:string) => {
        let commenter = displayName ? displayName : userName ? userName : 'unknown'
        let data = {reviewId, userId, comment, commenter}
        createUserComment(data)
        setShowSaving(true)
        setTimeout(() => {
            setShowSaving(false)
        }, 2000)
    }
    
    async function createUserComment(data: CommentDataType) {
        try {
            await fetch(`http://localhost:3000/api/createComment`, {
                body: JSON.stringify(data),
                headers: {
                    'Content-Type' : 'application/json'
                },
                method: 'POST'
            })
            .then((response) => response.json())
            .then((json) => console.log(json))
            router.refresh()
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <section className={`mt-3 mb-8 xl:mb-6 text-center border-skin-dark ${darkMode === false && 'bg-white hover:border-skin-base'} border-2 rounded-xl px-3 pt-3 md:p-3 xl:mx-3`}>
        <div className={`flex justify-between items-center pb-3`}>
            <div />
            <button type='button' onClick={() => setShowComments(false)} className={`opacity-70 hover:opacity-100 rounded-lg hover:bg-opacity-40 w-8 h-8 p-1 md:p-0 md:w-8 md:h-8 flex md:mr-2 justify-center items-center ${darkMode === false ? 'hover:bg-gray-300' : 'hover:bg-gray-600'}`}>
              <FontAwesomeIcon icon={faMinus} className={`text-sm`} />
            </button>
        </div>
        <ul className={`text-sm flex flex-col gap-3 mx-3 md:mx-6 md:mr-16 xl:mx-16`}>
            {
            comments?.length ?
            comments?.map((comment:CommentType) => (
                <Comment darkMode={darkMode}  comment={comment} key={Math.random()} /> 
            ))
            :
            <li key='commentless' className={`text-base opacity-40 py-3 md:py-0`}>No Comments</li>
            }
        </ul>
        <div className={`flex flex-col md:flex-row gap-3 items-center justify-between my-3 md:my-6`}>
            <textarea 
            name="comment"
            onChange={(e) => setTextField(e.target.value)}
            value={textField}
            maxLength={800}
            placeholder="Make a comment"
            className={`${darkMode === false ? 'bg-white bg-opacity-5 border-skin-dark hover:border-skin-base focus:border-skin-base' : 'bg-black border-skin-base focus:border-skin-light hover:border-skin-light focus:outline-skin-base'}  w-11/12 mx-auto py-3 rounded-lg focus:ring-0 border-2  resize-none md:ml-6 xl:ml-16`} 
            />
            {
                !showSaving ?
                <>
                    <button type="button" disabled={!textField.length || !userId} onClick={() => handleComments(reviewId, userId, textField)} className={`hidden md:block rounded-lg ${darkMode === false ? 'hover:bg-gray-300' : 'hover:bg-gray-600 hover:text-skin-light'} hover:bg-opacity-40 w-12 h-10 text-skin-base`}>
                    <FontAwesomeIcon icon={faAngleRight} className={`w-5 h-5`} />
                    </button>
                    <button type="button" disabled={!textField.length || !userId} onClick={() => handleComments(reviewId, userId, textField)} className={`md:hidden rounded-lg ${darkMode === false ? 'hover:bg-gray-300' : 'hover:bg-gray-600'}  hover:bg-opacity-40 py-2 px-3 ${!textField.length && 'opacity-40'}`}>Submit</button>
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