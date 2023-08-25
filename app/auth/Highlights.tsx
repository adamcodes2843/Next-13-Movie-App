'use client'
import { useState } from "react"

const Highlights = ({reviews, darkMode}:any) => {
  const [showRated, setShowRated] = useState<string>('off')
  const highest = 'highest'
  const lowest = 'lowest'
  const off = 'off'
  
  return (
    <section className={`${darkMode === false && 'text-black'} w-full gap-2 lg:self-start`}>
            <div className="flex items-center gap-3 w-full"><h2 className="">Highlights</h2><div className={`${darkMode === false ? 'bg-black' : 'bg-white'} h-[1px] flex-grow`} /></div>
            <div className={`${darkMode === false && 'border-black bg-white'} w-full max-w-[800px] h-8 border-2 rounded-2xl p-1 relative mx-auto mt-4 mb-1`}>
                <div className={`w-[5%] h-full bg-skin-base rounded-2xl`} />
                <h2 className="absolute w-full text-center pb-[2px] left-0 bottom-0 mx-auto">5%</h2>
            </div>
            <h1 className="text-center">Do you even pizza night?</h1>
            {
              reviews && showRated ===  highest ?
              <div>1</div>
              : reviews && showRated === lowest ?
              <div>2</div>
              :
              <div className="flex w-full gap-4 justify-around items-center mt-4">
                <button type="button" onClick={() => setShowRated(highest)} className={`${darkMode === false ? 'shadow hover:shadow-inner hover:shadow-black shadow-black bg-white' : 'bg-gray-600 shadow-inner hover:shadow-none bg-opacity-30'} text-center p-4 flex-grow shadow-gray-600`}>
                    All Time<br />Highest Rated
                </button>
                <button type="button" onClick={() => setShowRated(lowest)} className={`${darkMode === false ? 'shadow hover:shadow-inner hover:shadow-black shadow-black bg-white' : 'bg-gray-600 shadow-inner hover:shadow-none bg-opacity-30'} text-center p-4 flex-grow shadow-gray-600`}>
                    All Time<br />Lowest Rated
                </button>
            </div>
            }     
    </section>
  )
}

export default Highlights