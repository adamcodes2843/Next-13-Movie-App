'use client'

import { createContext, useState } from 'react'

export const AppContext = createContext({})

export default function ContextProvider({ children }:any) {
    const [watchedMovies, setWatchedMovies] = useState<number>(0)
    const [popup, setPopup] = useState<string | undefined>(undefined) //profilePopup, hamburgerPopup, footerPopup
    const [signedIn, setSignedIn] = useState<boolean>(false)
    const [darkMode, setDarkMode] = useState<boolean>(true)
    const [view, setView] = useState<string>('grid') //grid, line

    return <AppContext.Provider value={{setWatchedMovies, watchedMovies, setPopup, popup, signedIn, setSignedIn, darkMode, setDarkMode, setView, view}}>{children}</AppContext.Provider>
}