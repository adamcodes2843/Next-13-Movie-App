'use client'

import { createContext, useState } from 'react'

export type PopupString = "profilePopup" | "hamburgerPopup" | "footerPopup" | "settingsPopup" | "deletePopup" | "searchPopup"

export interface ContextInterface {
    popup: boolean | PopupString,
    setPopup: React.Dispatch<React.SetStateAction<boolean | PopupString>>,
    disableButton: boolean,
    setDisableButton: React.Dispatch<React.SetStateAction<boolean>> 
}

const initialContext = {
    popup: false,
    setPopup: () => {},
    disableButton: false,
    setDisableButton: () => {}
}

export const AppContext = createContext<ContextInterface>(initialContext)

export default function ContextProvider({ children }) {
    const [popup, setPopup] = useState<PopupString | boolean>(false)
    const [disableButton, setDisableButton] = useState<boolean>(false)
    
    return <AppContext.Provider value={{disableButton, setDisableButton, setPopup, popup}}>{children}</AppContext.Provider>
}