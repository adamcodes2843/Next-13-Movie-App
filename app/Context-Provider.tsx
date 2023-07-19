'use client'

import { createContext, useState } from 'react'

export const AppContext = createContext({})

export default function ContextProvider({ children }:any) {
    const [watchedMovies, setWatchedMovies] = useState<number>(0)
    const [popup, setPopup] = useState<string | undefined>(undefined)

    console.log(watchedMovies)

    return <AppContext.Provider value={{setWatchedMovies, watchedMovies, setPopup, popup}}>{children}</AppContext.Provider>
}