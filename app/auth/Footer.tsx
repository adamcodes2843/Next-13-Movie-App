"use client"

import { useContext, useEffect } from "react"
import { AppContext } from "../Context-Provider"


const Footer = ({reviewed}:any) => {
    const {popup, setPopup, setHighlightedPercent, highlightedPercent}:any = useContext(AppContext)

  useEffect(() => {
    if (reviewed) {
      setHighlightedPercent(String((Number(reviewed) / 20) * 100))
    }
  }, [])
    
  console.log(highlightedPercent)
  return (
    <footer className={`fixed z-30 bg-black bg-opacity-95 bottom-0 left-0 h-32 lg:h-36 w-full border-t-[1px] border-white flex flex-col justify-start items-center animate-closeFooter`}>
        <h1 className="text-lg text-green-200 mt-2 lg:mt-4">Review Highlights</h1>
        <h3 className="text-xl mb-2">Do you Even Pizza Night?</h3>
        <div className="w-11/12 lg:w-1/2 max-w-[800px] h-8 border-2 rounded-2xl p-1 relative">
          <div className={`w-[5%] h-full bg-green-600 rounded-2xl`} />
          <h2 className="absolute text-white w-full text-center pb-[2px] left-0 bottom-0 mx-auto">{highlightedPercent ? String(highlightedPercent) : '0'}%</h2>
        </div>
    </footer>
  )
}

export default Footer

//${popup !== 'footerPopup' && 'hidden'}