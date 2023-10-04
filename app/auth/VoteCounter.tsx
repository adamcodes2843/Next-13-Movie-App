'use client'

import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect, useContext } from 'react'
import { AppContext, ContextInterface } from '../Context-Provider'

interface VoteData {
    count: number | undefined,
    dvList: string[],
    uvList: string[]
}

interface VoteCounterProps {
    darkMode: boolean,
    userId: string,
    upVotes: string[],
    downVotes: string[],
    reviewId: string
}

const VoteCounter = ({darkMode, userId, upVotes, downVotes, reviewId}:VoteCounterProps) => {
    const {setDisableButton, disableButton}:ContextInterface = useContext(AppContext)
    const [count, setCount] = useState<number | undefined>(upVotes.length && downVotes.length ? upVotes.length - downVotes.length : !upVotes.length && downVotes.length ? 0 - downVotes.length : upVotes.length && !downVotes.length ? upVotes.length : undefined)
    const [curVote, setCurVote] = useState<string>(downVotes?.includes(userId) ? 'down' : upVotes?.includes(userId) ? 'up' : 'off')
    let uvList = upVotes ? upVotes : []
    let dvList = downVotes ? downVotes : []

    useEffect(() => {
        setCount(uvList.length - dvList.length)
    }, [])

    function handleVote (button:string, x:string) {

        if (button === 'downButton') {
            if (x === 'down') {
                dvList = (dvList?.filter((user) => user !== userId))
                uvList = (uvList?.filter((user) => user !== userId))
                setCurVote('off')
            } else if (x === 'off') {
                //dvList?.push(userId)
                if (!dvList.includes(userId)){
                    dvList = [...dvList, userId]
                }
                uvList = (uvList?.filter((user) => user !== userId))
                setCurVote('down')
            } else if (x === 'up') {
                uvList = uvList?.filter((user) => user !== userId)
                //dvList?.push(userId)
                if (!dvList.includes(userId)){
                    dvList = [...dvList, userId]
                }
                setCurVote('down')
            }
        }
        else if (button === 'upButton') {
            if (x === 'up') {
                uvList = uvList?.filter((user) => user !== userId)
                dvList = (dvList?.filter((user) => user !== userId))
                setCurVote('off')
            } else if (x === 'off') {
                //uvList?.push(userId[0])
                if (!uvList.includes(userId)){
                    uvList = [...uvList, userId]
                }
                dvList = (dvList?.filter((user) => user !== userId))
                setCurVote('up')
            } else if (x === 'down') {
                dvList  = dvList?.filter((user) => user !== userId)
                //uvList?.push(userId[0])
                if (!uvList.includes(userId)){
                    uvList = [...uvList, userId]
                }
                setCurVote('up')
            }
        }
        setCount(uvList.length - dvList.length)
        let data = {count: uvList.length - dvList.length, uvList, dvList}
        setDisableButton(true)
        console.log(data)
        changeVote(reviewId, data)
        setTimeout(() => {
            setDisableButton(false)
        }, 1500)
    }

    async function changeVote(id:string, data: VoteData) {
        try {
            fetch(`/api/updateVote/${id}`, {
              body: JSON.stringify(data),
              headers: {
                'Content-Type': 'application/json'
              }, 
              method: 'PATCH'
            })
            .then((response) => response.json())
            .then((json) => console.log(json))
          } catch (error) {
            console.log(error)
          }
    }
  return (
    <div className={`flex flex-col items-start justify-center w-10 md:w-12 lg:w-16`}>
        <div className={`flex flex-col justify-between items-center my-2`}>
        <button type="button" disabled={!userId || disableButton} onClick={() => handleVote('upButton', curVote)} className="cursor-pointer"><FontAwesomeIcon icon={faAngleUp} className={`w-6 h-6 md:w-8 md:h-8 ${curVote === 'up' && darkMode === false ? 'text-skin-base' : curVote === 'up' && darkMode !== false ? 'text-skin-light' : 'text-skin-dark'} ${disableButton && 'cursor-default'}`} /></button>
        <p className={`${darkMode === false ? 'text-skin-base font-semibold' : 'text-skin-light'}`}>{count}</p>
        <button type="button" disabled={!userId || disableButton} onClick={() => handleVote('downButton', curVote)} className="cursor-pointer"><FontAwesomeIcon icon={faAngleDown} className={`w-6 h-6 md:w-8 md:h-8 ${curVote === 'down' && darkMode === false ? 'text-skin-base' : curVote === 'down' && darkMode !== false ? 'text-skin-light' : 'text-skin-dark'} ${disableButton && 'cursor-default'}`} /></button>
        </div>
    </div>
  )
}

export default VoteCounter