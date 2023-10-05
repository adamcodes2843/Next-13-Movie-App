'use client'
import {useState, useContext} from 'react'
import { AppContext, ContextInterface } from '../Context-Provider'
import { useRouter } from 'next/navigation'

interface ColorSelectionProps {
  showColors: boolean,
  id: string, 
  setShowColors: React.Dispatch<React.SetStateAction<boolean>>,
  setShowSaving: React.Dispatch<React.SetStateAction<boolean>>
}

const ColorSelection = ({showColors, id, setShowColors, setShowSaving}:ColorSelectionProps) => {
    const {setDisableButton}:ContextInterface = useContext(AppContext)
    const [colorIndicator, setColorIndicator] = useState<string>('')
    const router = useRouter()

  const handleColorUpdate = (id:string, color:string) => {
    updateColor(id, color)
    setShowColors(false)
    setShowSaving(true)
    setDisableButton(true)
    setTimeout(() => {
      setShowSaving(false)
      setDisableButton(false)
    }, 1500)
  }

  async function updateColor(id:string, data:string) {
    try{
      await fetch(`https://pizza-night-highlights.vercel.app/api/updateColorTheme/${id}`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH'
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
        router.refresh()
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <>
        <ul className={`${!showColors && 'hidden'} flex flex-wrap gap-2 px-6 justify-center items-center cursor-pointer mt-4`}>
            <li key={Math.random()} onMouseOver={() => setColorIndicator('red')} onMouseOut={() => setColorIndicator('')} className={`bg-red-600 w-8 h-8 border-2 rounded-full`}>
            <button type="button" onClick={()=> handleColorUpdate(id,'theme-red')} className='h-full w-full'></button>
            </li>
            <li key={Math.random()} onMouseOver={() => setColorIndicator('orange')} onMouseOut={() => setColorIndicator('')} className={`bg-orange-600 w-8 h-8 border-2 rounded-full`}>
            <button type="button" onClick={()=> handleColorUpdate(id,'theme-orange')} className='h-full w-full'></button>
            </li>
            <li key={Math.random()} onMouseOver={() => setColorIndicator('amber')} onMouseOut={() => setColorIndicator('')} className={`bg-amber-600 w-8 h-8 border-2 rounded-full`}>
            <button type="button" onClick={()=> handleColorUpdate(id,'theme-amber')} className='h-full w-full'></button>
            </li>
            <li key={Math.random()} onMouseOver={() => setColorIndicator('yellow')} onMouseOut={() => setColorIndicator('')} className={`bg-yellow-600 w-8 h-8 border-2 rounded-full`}>
            <button type="button" onClick={()=> handleColorUpdate(id,'theme-yellow')} className='h-full w-full'></button>
            </li>
            <li key={Math.random()} onMouseOver={() => setColorIndicator('lime')} onMouseOut={() => setColorIndicator('')} className={`bg-lime-600 w-8 h-8 border-2 rounded-full`}>
            <button type="button" onClick={()=> handleColorUpdate(id,'theme-lime')} className='h-full w-full'></button>
            </li>
            <li key={Math.random()} onMouseOver={() => setColorIndicator('green')} onMouseOut={() => setColorIndicator('')} className={`bg-green-600 w-8 h-8 border-2 rounded-full`}>
            <button type="button" onClick={()=> handleColorUpdate(id,'theme-green')} className='h-full w-full'></button>
            </li>
            <li key={Math.random()} onMouseOver={() => setColorIndicator('emerald')} onMouseOut={() => setColorIndicator('')} className={`bg-emerald-600 w-8 h-8 border-2 rounded-full`}>
            <button type="button" onClick={()=> handleColorUpdate(id,'emerald')} className='h-full w-full'></button>
            </li>
            <li key={Math.random()} onMouseOver={() => setColorIndicator('teal')} onMouseOut={() => setColorIndicator('')} className={`bg-teal-600 w-8 h-8 border-2 rounded-full`}>
            <button type="button" onClick={()=> handleColorUpdate(id,'theme-teal')} className='h-full w-full'></button>
            </li>
            <li key={Math.random()} onMouseOver={() => setColorIndicator('cyan')} onMouseOut={() => setColorIndicator('')} className={`bg-cyan-600 w-8 h-8 border-2 rounded-full`}>
            <button type="button" onClick={()=> handleColorUpdate(id,'theme-cyan')} className='h-full w-full'></button>
            </li>
            <li key={Math.random()} onMouseOver={() => setColorIndicator('sky')} onMouseOut={() => setColorIndicator('')} className={`bg-sky-600 w-8 h-8 border-2 rounded-full`}>
            <button type="button" onClick={()=> handleColorUpdate(id,'theme-sky')} className='h-full w-full'></button>
            </li>
            <li key={Math.random()} onMouseOver={() => setColorIndicator('blue')} onMouseOut={() => setColorIndicator('')} className={`bg-blue-600 w-8 h-8 border-2 rounded-full`}>
            <button type="button" onClick={()=> handleColorUpdate(id,'theme-blue')} className='h-full w-full'></button>
            </li>
            <li key={Math.random()} onMouseOver={() => setColorIndicator('indigo')} onMouseOut={() => setColorIndicator('')} className={`bg-indigo-600 w-8 h-8 border-2 rounded-full`}>
            <button type="button" onClick={()=> handleColorUpdate(id,'theme-indigo')} className='h-full w-full'></button>
            </li>
            <li key={Math.random()} onMouseOver={() => setColorIndicator('violet')} onMouseOut={() => setColorIndicator('')} className={`bg-violet-600 w-8 h-8 border-2 rounded-full`}>
            <button type="button" onClick={()=> handleColorUpdate(id,'theme-violet')} className='h-full w-full'></button>
            </li>
            <li key={Math.random()} onMouseOver={() => setColorIndicator('purple')} onMouseOut={() => setColorIndicator('')} className={`bg-purple-600 w-8 h-8 border-2 rounded-full`}>
            <button type="button" onClick={()=> handleColorUpdate(id,'theme-purple')} className='h-full w-full'></button>
            </li>
            <li key={Math.random()} onMouseOver={() => setColorIndicator('fuchsia')} onMouseOut={() => setColorIndicator('')} className={`bg-fuchsia-600 w-8 h-8 border-2 rounded-full`}>
            <button type="button" onClick={()=> handleColorUpdate(id,'theme-fuchsia')} className='h-full w-full'></button>
            </li>
            <li key={Math.random()} onMouseOver={() => setColorIndicator('pink')} onMouseOut={() => setColorIndicator('')} className={`bg-pink-600 w-8 h-8 border-2 rounded-full`}>
            <button type="button" onClick={()=> handleColorUpdate(id,'theme-pink')} className='h-full w-full'></button>
            </li>
            <li key={Math.random()} onMouseOver={() => setColorIndicator('rose')} onMouseOut={() => setColorIndicator('')} className={`bg-rose-600 w-8 h-8 border-2 rounded-full`}>
            <button type="button" onClick={()=> handleColorUpdate(id, 'theme-rose')} className='h-full w-full'></button>
            </li>
        </ul>
        <div className={`${!showColors && 'hidden'} w-full h-4 text-center`}>{colorIndicator.charAt(0).toUpperCase() + colorIndicator.slice(1)}</div>
    </>
  )
}

export default ColorSelection