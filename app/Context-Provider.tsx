'use client'

import { createContext, useState } from 'react'

export const AppContext = createContext({})

export default function ContextProvider({ children }:any) {
    const [watchedMovies, setWatchedMovies] = useState<number>(0)
    const [popup, setPopup] = useState<string | undefined>(undefined) //profilePopup, hamburgerPopup, footerPopup, settingsPopup
    const [colorTheme, setColorTheme] = useState<string>('green')
    const [darkMode, setDarkMode] = useState<boolean>(true)
    const [view, setView] = useState<string>('grid') //grid, line, slide

    return <AppContext.Provider value={{setWatchedMovies, watchedMovies, setPopup, popup, darkMode, setDarkMode, setView, view, colorTheme, setColorTheme}}>{children}</AppContext.Provider>
}