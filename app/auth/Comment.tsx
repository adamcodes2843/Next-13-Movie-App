'use client'
import { useEffect, useState } from "react"

interface commentType {
    displayName: string,
    name: string
}

const Comment = ({comment, darkMode}:any) => {
    const [commenter, setCommenter] = useState<commentType>({
        displayName: '',
        name: ''
    })

    useEffect(() => {
        getDisplayName(comment?.userId)
    }, [])

    async function getDisplayName(id:string) {
        fetch(`http://localhost:3000/api/getCommenter/${id}`)
        .then(res => {
            if(!res.ok) {
                throw Error('could not fetch the data for that resource')
            }
            return res.json()
        })
        .then(data => {
            setCommenter(data)
        })
    }
    
  return (
    <li className={`flex flex-col md:flex-row justify-between items-start mb-3 md:mb-0 gap-1 md:gap-12`}>
            <div className={`flex flex-col items-start`}>
                <p className={`${darkMode === false ? 'text-skin-base font-semibold' : 'text-skin-light'}`}>{commenter.displayName ? commenter.displayName : commenter.name ? commenter.name : 'unknown'}</p>
                <p className={`opacity-40`}>{String(comment.dateTimePosted).split(' ').slice(1,4).join('-')}</p>
            </div>
            <p className={`text-left md:text-right`}>{comment.comment}</p>
    </li>
  )
}

export default Comment