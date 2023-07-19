"use client"

import { useContext } from "react"
import { AppContext } from "../Context-Provider"


const Footer = () => {
    const {popup, setPopup}:any = useContext(AppContext)

  return (
    <footer className={`fixed z-30 bg-black bg-opacity-95 bottom-0 left-0 h-24 w-full border-t-[1px] border-white ${popup !== 'footerPopup' && 'hidden'}`}>
        <div className=""></div>
    </footer>
  )
}

export default Footer