'use client'

import { useState } from "react"

const ChoiceBoard = ({choices}:any) => {
    const [showSelect, setShowSelect] = useState<boolean>(false)
  return (
    <div className={`p-3 md:px-12 rounded-lg border-4 border-skin-dark hover:border-skin-light md:max-w-sm mt-6 pb-6`}>
        <h2 className={`text-2xl font-bold text-center my-3`}>Select Movie</h2>
        <div className={`flex justify-around py-3`}>
          <button type="button" onClick={() => setShowSelect(false)} className={`${!showSelect ? 'bg-gray-600 bg-opacity-40' : 'opacity-70'} hover:bg-gray-600 hover:opacity-100 rounded-lg hover:bg-opacity-40 p-2 w-20`}>All</button>
          <button type="button" onClick={() => setShowSelect(true)} className={`${showSelect ? 'bg-gray-600 bg-opacity-40' : 'opacity-70'} hover:bg-gray-600 hover:opacity-100 rounded-lg hover:bg-opacity-40 p-2 w-20`}>Select</button>
        </div>
        {
            showSelect &&
            <ul className={`flex flex-col items-center pb-3 cursor-pointer`}>
                {
                    choices.map((name:any, i:number) => (
                    <li key={'option-' + i} className={`hover:bg-gray-600 rounded-lg hover:bg-opacity-40 w-full text-center p-2`}>
                        <button>
                            {name.title}
                        </button>
                    </li>
                    ))
                }
            </ul>
        }
        
      </div>
  )
}

export default ChoiceBoard