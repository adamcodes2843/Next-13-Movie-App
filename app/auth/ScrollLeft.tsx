'use client'

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ScrollLeft = () => {

    let timer = undefined

    const slideLeft = () => {
        let slider = document.getElementById('movies')
        slider.scrollLeft -= 150
        timer && clearInterval(timer)
        timer = setInterval(slideLeft, 100)
    }

    const kill = () => {
        timer && clearInterval(timer)
    }

  return (
    <button onMouseEnter={() => slideLeft()} onMouseLeave={() => kill()} className="hidden md:block absolute left-0 top-[calc(50%-12rem)] h-96 w-20 bg-white text-skin-dark bg-opacity-70 2xl:bg-opacity-20 hover:bg-opacity-100 z-30 text-3xl font-bold hover:text-4xl">
        <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  )
}

export default ScrollLeft