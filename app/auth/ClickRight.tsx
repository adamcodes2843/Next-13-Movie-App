'use client'

import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ClickRight = () => {

    const clickedRight = () => {
        let slider = document.getElementById('movies')
        if (slider) {
          slider.scrollLeft += 345
        }
    }

  return (
    <button type="button" onClick={() => clickedRight()} className="block md:hidden absolute right-0 top-[calc(50%-12.8rem)] h-96 w-12 md:w-20 bg-white text-skin-dark bg-opacity-70 2xl:bg-opacity-20 z-30 text-3xl font-bold hover:text-4xl hover:bg-opacity-100">
        <FontAwesomeIcon icon={faChevronRight} />
    </button>
  )
}

export default ClickRight