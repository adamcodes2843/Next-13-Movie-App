'use client'

import {useState, useContext} from 'react'
import { AppContext } from '../Context-Provider'

const SeenIt = () => {
    const {setWatchedMovies, watchedMovies}:any = useContext(AppContext)
    const [checked, setChecked] = useState(false)

    const checkHandler = () => {
        if (!checked) {
          setWatchedMovies(watchedMovies + 1)
          setChecked(true)
        }
        else if (checked) {
          setWatchedMovies(watchedMovies - 1)
          setChecked(false)
        }
    }

  return (
    <div>
        <input 
            checked={checked}
            onChange={checkHandler}
            id="seenMovie" 
            type="checkbox" 
            className="absolute bottom-2 right-2 w-6 h-6 hover:cursor-pointer bg-green-100 hover:bg-green-600 hover:ring-white border-green-600 rounded-full focus:ring-green-200 active:bg-green-200 text-green-600"></input>
    </div>
    
  )
}

export default SeenIt