'use client'
import { useContext } from 'react'
import { AppContext, ContextInterface } from '../Context-Provider'

interface NameButtonType {
  name: string,
  displayName: string,
  darkMode: boolean
}

const NameButton = ({name, displayName, darkMode}:NameButtonType) => {
  const {setPopup}:ContextInterface = useContext(AppContext)
  return (
    <button type="button" disabled={!name && !displayName} onClick={() => setPopup('settingsPopup')} className={`${darkMode === false ? 'bg-white' : 'bg-black'} lg:bg-opacity-0 my-1 bg-opacity-70 rounded-xl py-2 hover:shadow-gray-600 w-3/4 lg:w-auto text-center lg:mr-auto overflow-hidden`}>
      <h1 className={`${darkMode === false ? 'text-black hover:text-skin-base' : 'hover:text-skin-light'} text-2xl lg:text-4xl `}>{displayName ? displayName : name ? name : 'username'}</h1>
    </button>
  )
}

export default NameButton