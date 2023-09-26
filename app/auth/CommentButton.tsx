'use client'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

interface CommentButtonProps {
  setShowComments: React.Dispatch<React.SetStateAction<boolean>>,
  showComments: boolean,
  commentCount: number,
  darkMode: boolean
}

const CommentButton = ({setShowComments, showComments, commentCount, darkMode}:CommentButtonProps) => {
  return (
    <button type="button" onClick={() => setShowComments(!showComments)} className={`absolute right-0 md:right-3 lg:right-5 bottom-3 flex gap-2 items-center py-1 mx-2 md:mx-0 px-1 md:px-3 hover:bg-opacity-40 hover:opacity-100  rounded-lg ${darkMode === false ? 'hover:bg-gray-300' : 'opacity-40 hover:bg-gray-600'}`}>
        <p className={``}>{commentCount}</p>
        <FontAwesomeIcon icon={faComment}  />
    </button>
  )
}

export default CommentButton