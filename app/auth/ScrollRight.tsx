'use client'

import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ScrollRight = () => {

    let timer:any = undefined

    const slideRight = () => {
        let slider = document.getElementById('movies')
        if (slider) {
          slider.scrollLeft += 150
          timer && clearInterval(timer)
          timer = setInterval(slideRight, 100)
        }
    }

    const kill = () => {
        timer && clearInterval(timer)
    }

  return (
    <button type="button" onMouseEnter={() => slideRight()} onMouseLeave={() => kill()} className={`hidden md:block absolute bg-white right-0 top-[calc(50%-12rem)] h-96 w-20 text-skin-dark z-30 text-3xl font-bold hover:text-4xl bg-opacity-70 2xl:bg-opacity-20 hover:bg-opacity-100`}>
        <FontAwesomeIcon icon={faChevronRight} />
    </button>
  )
}

export default ScrollRight