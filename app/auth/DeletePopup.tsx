'use client'

import { AppContext, ContextInterface } from '../Context-Provider'
import { useContext, useState } from 'react'
import {useRouter} from 'next/navigation'
import {signOut} from 'next-auth/react'

interface DeletePopupProps {
    id: string,
    darkMode: boolean
}

const DeletePopup = ({id, darkMode}:DeletePopupProps) => {
    const {setPopup, popup, disableButton, setDisableButton}:ContextInterface = useContext(AppContext)
    const [message, setMessage] = useState("Are you sure you want to delete your account?")
    const router = useRouter()
    const handleYes = () => {
        setMessage("Thanks for hanging out. Have a good one!")
        deleteAccount(id)
        setDisableButton(true)
        setTimeout(() => {
            setDisableButton(false)
            setPopup(false)
            signOut()
            router.refresh()
        }, 2000)
    }
    async function deleteAccount(id:string) {
        try {
            fetch(`https://pizza-night-highlights.vercel.app/api/deleteUser/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className={`${popup !== 'deletePopup' && 'hidden'} ${darkMode === false ? 'bg-gray-600' : 'bg-black bg-opacity-95'} fixed  border-red-600 border-2 rounded-lg  w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] max-w-lg top-96 p-4 z-50 left-0 right-0 mx-auto`}>
        <div className={`flex justify-between items-center`}>
        <h1 className="text-red-600">Delete Account</h1>
        <button type='button' disabled={disableButton} onClick={()=> setPopup(false)} className={`text-lg rounded-lg ${darkMode === false ? 'hover:bg-gray-300' : 'hover:bg-gray-600'} hover:bg-opacity-40 px-3 py-1`}>
          x
        </button>
        </div>
        <h2 className="p-6 text-center">{message}</h2>
        <div className="flex justify-around">
            <button type="button" disabled={disableButton} onClick={() => setPopup('settingsPopup')} className={`rounded-lg ${darkMode === false ? 'hover:bg-gray-300' : 'hover:bg-gray-600'}  hover:bg-opacity-40 px-3 py-1`}>No</button>
            <button type="button" disabled={disableButton} onClick={() => handleYes()} className={`border-2 border-red-600 px-3 py-1 rounded-lg hover:bg-red-600 ${darkMode === false ? 'hover:border-white' : 'hover:border-black'} hover:bg-opacity-40 active:bg-black active:border-red-600`}>Yes</button>
        </div>
    </div>
  )
}

export default DeletePopup