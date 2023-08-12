'use client'
import {useState}from 'react'

const ColorSelection = ({showColors}) => {
    const [colorIndicator, setColorIndicator] = useState<string>('')
    const colorSelection = [ 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
  return (
    <>
        <ul className={`${!showColors && 'hidden'} flex flex-wrap gap-2 px-6 justify-center items-center cursor-pointer mt-4`}>
        {colorSelection.map(color => (
            <li key={Math.random()} onMouseOver={() => setColorIndicator(color)} onMouseOut={() => setColorIndicator('')} className={`bg-${color}-600 w-8 h-8 border-2 rounded-full`}>
            <button type="button" className='h-full w-full'></button>
            </li>
        ))}
        </ul>
        <div className={`${!showColors && 'hidden'} w-full h-4 text-center`}>{colorIndicator.charAt(0).toUpperCase() + colorIndicator.slice(1)}</div>
    </>
  )
}

export default ColorSelection