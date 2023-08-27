'use client'

import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'

const VoteCounter = ({voteCount}:any) => {
    const [vote, setVote] = useState<string>('up')
    const [count, setCount] = useState<number>(1)
    
    useEffect(() => {
        setCount(voteCount)
    }, [])

    const handleUpVote = (x:string) => {
        if (x === 'up') {
            setVote('off')
            setCount(count - 1)
        } else if (x === 'off') {
            setVote('up')
            setCount(count + 1)
        } else if (x === 'down') {
            setVote('up')
            setCount(count + 2)
        }
    } 
    const handleDownVote = (x:string) => {
        if (x === 'down') {
            setVote('off')
            setCount(count + 1)
        } else if (x === 'off') {
            setVote('down')
            setCount(count - 1)
        } else if (x === 'up') {
            setVote('down')
            setCount(count - 2)
        }
    }

  return (
    <div className={`flex flex-col justify-between items-center my-2`}>
        <button type="button" onClick={() => handleUpVote(vote)} className="cursor-pointer"><FontAwesomeIcon icon={faAngleUp} className={`w-6 h-6 md:w-8 md:h-8 ${vote === 'up' ? 'text-skin-light' : 'text-skin-dark'} hover:text-skin-light active:text-skin-dark`} /></button>
        <p className={`text-skin-light`}>{count}</p>
        <button type="button" onClick={() => handleDownVote(vote)} className="cursor-pointer"><FontAwesomeIcon icon={faAngleDown} className={`w-6 h-6 md:w-8 md:h-8 ${vote === 'down' ? 'text-skin-light' : 'text-skin-dark'} hover:text-skin-light active:text-skin-dark`} /></button>
    </div>
  )
}

export default VoteCounter