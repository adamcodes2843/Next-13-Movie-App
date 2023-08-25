'use client'

import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ScrollRight = () => {

    let timer = undefined

    const slideRight = () => {
        let slider = document.getElementById('movies')
        slider.scrollLeft += 150
        timer && clearInterval(timer)
        timer = setInterval(slideRight, 100)
    }

    const kill = () => {
        timer && clearInterval(timer)
    }

  return (
    <button type="button" onMouseEnter={() => slideRight()} onMouseLeave={() => kill()} className="hidden md:block absolute right-0 top-[calc(50%-12rem)] h-96 w-20 bg-white text-skin-dark bg-opacity-70 2xl:bg-opacity-20 z-30 text-3xl font-bold hover:text-4xl hover:bg-opacity-100">
        <FontAwesomeIcon icon={faChevronRight} />
    </button>
  )
}

export default ScrollRight