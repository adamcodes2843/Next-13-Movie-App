'use client'

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ClickLeft = () => {
    const clickedLeft = () => {
        let slider = document.getElementById('movies')
        if (slider){
          slider.scrollLeft -= 345
        } 
    }

  return (
    <button type="button" onClick={() => clickedLeft()} className="block md:hidden absolute left-0 top-[calc(50%-12.8rem)] h-96 w-12 md:w-20 bg-white text-skin-dark bg-opacity-70 2xl:bg-opacity-20 z-30 text-3xl font-bold hover:text-4xl hover:bg-opacity-100">
        <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  )
}

export default ClickLeft