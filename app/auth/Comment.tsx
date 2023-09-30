import { CommentType } from "./PageTypes"

interface CommentComponentType {
    comment: CommentType,
    darkMode: boolean
}

const Comment = ({comment, darkMode}:CommentComponentType) => {
    
  return (
    <li className={`flex flex-col md:flex-row justify-between items-start mb-3 md:mb-0 gap-1 md:gap-12`}>
            <div className={`flex flex-col items-start`}>
                <p className={`${darkMode === false ? 'text-skin-base font-semibold' : 'text-skin-light'}`}>{comment.commenter}</p>
                <p className={`opacity-40`}>{String(comment.dateTimePosted).split(' ').slice(1,4).join('-')}</p>
            </div>
            <p className={`text-left md:text-right`}>{comment.comment}</p>
    </li>
  )
}

export default Comment