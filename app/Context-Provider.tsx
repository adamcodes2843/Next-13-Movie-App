'use client'

import { createContext, useState } from 'react'

export const AppContext = createContext({})

export default function ContextProvider({ children }:any) {
    const [watchedMovies, setWatchedMovies] = useState<number>(0)
    const [popup, setPopup] = useState<string | boolean>(false) //profilePopup, hamburgerPopup, footerPopup, settingsPopup, deletePopup, searchPopup
    const [colorTheme, setColorTheme] = useState<string>('green')
    const [disableButton, setDisableButton] = useState<boolean>(false)

    return <AppContext.Provider value={{disableButton, setDisableButton, setWatchedMovies, watchedMovies, setPopup, popup, colorTheme, setColorTheme}}>{children}</AppContext.Provider>
}