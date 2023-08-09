'use client'

import { createContext, useState } from 'react'

export const AppContext = createContext({})

export default function ContextProvider({ children }:any) {
    const [watchedMovies, setWatchedMovies] = useState<number>(0)
    const [popup, setPopup] = useState<string | undefined>(undefined) //profilePopup, hamburgerPopup, footerPopup
    
    const [darkMode, setDarkMode] = useState<boolean>(true)
    const [view, setView] = useState<string>('grid') //grid, line
    const [highlightedPercent, setHighlightedPercent] = useState<string>('0')

    return <AppContext.Provider value={{setWatchedMovies, watchedMovies, setPopup, popup, darkMode, setDarkMode, setView, view, setHighlightedPercent, highlightedPercent}}>{children}</AppContext.Provider>
}