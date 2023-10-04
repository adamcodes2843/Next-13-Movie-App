'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"
import LoadingSVG from "./LoadingSVG"

interface DeleteItemPorps {
    id: string,
    item: string,
    darkMode: boolean
}

const DeleteItem = ({id, item, darkMode}:DeleteItemPorps) => {
    const [ showSaving, setShowSaving ] = useState<boolean>(false)
    const router = useRouter()

    const handleDeleteItem = (id:string) => {
        setShowSaving(true)
        deleteItem(id, item)
        setTimeout(()=> {
             setShowSaving(false)
        }, 1500)
    }

    async function deleteItem (id:string, item:string) {
        try {
            await fetch(`/api/deleteItem/${id}`, {
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            })
            router.refresh()
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    {
        !showSaving ?
        <button type='button' onClick={() => handleDeleteItem(id)} className={`text-lg ${darkMode === false ? 'hover:bg-gray-300' : 'hover:bg-gray-600'} bg-opacity-20 hover:bg-opacity-40 rounded-lg w-8 h-8 text-red-600`}>
            x
        </button>
        :
        <p className={`w-8 h-8 rounded-lg flex justify-center items-center`}>
            <LoadingSVG />
        </p>
    }
    </>
  )
}

export default DeleteItem