'use client'

import {useState} from 'react'

const SeenIt = () => {
    const [isChecked, setIsChecked] = useState(false)

    const checkHandler = () => {
        setIsChecked(!isChecked)
    }

  return (
    <div>
        <input 
            checked={isChecked}
            onChange={checkHandler}
            id="seenMovie" 
            type="checkbox" 
            className="absolute bottom-2 right-2 w-6 h-6 hover:cursor-pointer bg-green-100 hover:bg-green-200 border-green-200 rounded-full focus:ring-green-200 active:bg-green-200 text-green-600"></input>
    </div>
    
  )
}

export default SeenIt