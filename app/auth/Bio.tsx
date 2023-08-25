'use client'
import { useContext } from 'react'
import { AppContext } from '../Context-Provider'

const Bio = ({favoriteMovie, favoritePizza, darkMode}:any) => {
  const {setPopup}:any = useContext(AppContext)
  return (
    <section className={`${darkMode === false && 'text-black'} w-full gap-2 lg:self-start`}>
        <div className="flex items-center gap-4"><h2 className="">Bio</h2><div className={`${darkMode === false ? 'bg-black' : 'bg-white'} flex-grow h-[1px]`} /></div>
        <div className="flex w-full mt-4 gap-2"><h3 className="md:w-1/4 w-1/2">Favorite Movie:</h3> <button type="button" onClick={() => setPopup('settingsPopup')} className={`${darkMode === false ? 'bg-white hover:text-skin-base' : 'bg-gray-600 hover:text-skin-light bg-opacity-50'} w-3/4 rounded-t border-t-2 border-skin-base`}>{favoriteMovie ? favoriteMovie : 'None'}</button></div>
        <div className="flex w-full mb-4 gap-2"><h3 className="md:w-1/4 w-1/2">Favorite Pizza:</h3> <button type="button" onClick={() => setPopup('settingsPopup')} className={`${darkMode === false ? 'bg-white hover:text-skin-base' : 'bg-gray-600 hover:text-skin-light bg-opacity-50'} w-3/4 border-b-2 rounded-b border-skin-base`}>{favoritePizza ? favoritePizza : 'None'}</button></div>
    </section>
  )
}

export default Bio