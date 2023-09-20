'use client'
import { useRouter } from "next/navigation"

const DeleteItem = ({id, item, darkMode}) => {
    const router = useRouter()

    const handleDeleteItem = (id:string) => {
        deleteItem(id, item)
        setTimeout(()=> {
            router.refresh()
        }, 1000)
    }

    async function deleteItem (id:string, item:string) {
        try {
            fetch(`http://localhost:3000/api/deleteItem/${id}`, {
                body: JSON.stringify(item),
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
    <button type='button' onClick={() => handleDeleteItem(id)} className={`text-lg ${darkMode === false ? 'hover:bg-gray-300' : 'hover:bg-gray-600'} bg-opacity-20 hover:bg-opacity-40 rounded-lg w-8 h-8 text-red-600`}>
        x
    </button>
  )
}

export default DeleteItem