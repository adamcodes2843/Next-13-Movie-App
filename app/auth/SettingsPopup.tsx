'use client'
import { AppContext } from '../Context-Provider'
import { useContext, useState } from 'react'
import { faTrash, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import ColorSelection from './ColorSelection'

const SettingsPopup = ({settings, name, favoriteMovie, favoritePizza, id}:any) => {
    const {popup, setPopup}:any = useContext(AppContext)
    const [settingsPage, setSettingsPage] = useState<string>('display')
    const [showColors, setShowColors] = useState<boolean>(false)
    const router = useRouter()

  const handleDarkMode = (id:string, data:boolean) => {
    updateDarkMode(id, data)
    router.refresh()
  }

  async function updateDarkMode(id:string, data:boolean) {
    try{
      fetch(`api/darkModeSwitch/${id}`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PATCH'
      })
      .then((response) => response.json())
      .then((json) => console.log(json))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={`fixed ${popup !== 'settingsPopup' && 'hidden'} bg-black bg-opacity-95 border-[1px] rounded-lg border-white w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] top-72 p-4 z-50 max-w-4xl left-0 right-0 mx-auto`}>
        <div className="flex justify-between items-center mr-6">
        <h1 className="text-lg pl-6 text-skin-light">User settings</h1>
        <button type='button' onClick={()=>setPopup(undefined)} className="text-lg rounded-lg hover:bg-gray-600 hover:bg-opacity-40 px-3 py-1">
          x
        </button>  
        </div>
        <div className="w-full flex justify-around md:justify-start md:ml-6 mt-4 gap-2 md:gap-4">
            <button type='button' onClick={() => setSettingsPage('display')} className={`${settingsPage === 'display' ? 'border-white' : 'border-black hover:opacity-100 opacity-60'} border-b-2 px-3`}>Display</button>
            <button type='button' onClick={() => setSettingsPage('account')} className={`${settingsPage === 'account' ? 'border-white' : 'border-black hover:opacity-100 opacity-60'} border-b-2 px-3`}>Account</button>
        </div>
        {/* Display Settings  */}
        <section className={`${settingsPage !== 'display' && 'hidden'} mx-6 mt-4 flex flex-col gap-2`}>
          <h2 className="border-b-2 opacity-60">Color Options</h2>
          <div className="flex justify-between items-center mb-1 mt-2">
            <h3>Dark Mode</h3>
            <label className="relative inline-flex items-center cursor-pointer ml-4">
              <input type="checkbox" value="" className="sr-only peer" defaultChecked={settings?.darkMode} onChange={() => handleDarkMode(id, !settings?.darkMode)}/>
              <div className={`w-11 h-6 bg-gray-600 rounded-full peer-checked:ring-2 peer-checked:ring-skin-light peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-skin-base`}></div>
            </label>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h3>Color Theme</h3>
              <p className="text-sm opacity-60">{settings?.colorTheme && settings?.colorTheme.slice(6).charAt(0).toUpperCase() + settings?.colorTheme.slice(7)}</p>
            </div>
            <div className="flex justify-between items-center gap-2 ml-4">
              {
                !showColors ?
                <button type="button" onClick={() => setShowColors(true)} className="hover:bg-gray-600 hover:bg-opacity-40 rounded-lg p-1 flex justify-center items-center">
                <FontAwesomeIcon icon={faAngleDown} className="w-5 h-5 pt-1" />
                </button>
                :
                <button type="button" onClick={() => setShowColors(false)} className="hover:bg-gray-600 hover:bg-opacity-40 rounded-lg p-1 flex justify-center items-center">
                <FontAwesomeIcon icon={faAngleUp} className="w-5 h-5 pt-1" />
                </button>
              }
              <div className={`border-2 w-6 h-6 bg-skin-light`}></div>
              <div className={`border-2 w-6 h-6 bg-skin-base`}></div>
              <div className={`border-2 w-6 h-6 bg-skin-dark`}></div>
            </div>
          </div>
          <ColorSelection showColors={showColors} id={id} setShowColors={setShowColors}/>
          <h2 className="border-b-2 opacity-60">Layout Options</h2>
          <div className="flex justify-between items-center mb-1 mt-2">
            <div className="flex flex-col">
            <h3>Template</h3>
            <p className="text-sm opacity-60">{settings?.view && settings?.view.charAt(0).toUpperCase() + settings?.view.slice(1)} View</p>
            </div>
            <button className="rounded-full hover:bg-gray-600 hover:bg-opacity-40 border-2 px-2 py-1">Change</button>
          </div>
        </section>
        {/* Account Settings */}
        <section className={`${settingsPage !== 'account' && 'hidden'} px-6 mt-4 flex flex-col gap-2`}>
          <h2 className="border-b-2 opacity-60">Account Info</h2>
          <div className="flex justify-between items-center mb-1 mt-2">
            <div className="flex flex-col">
            <h3>Display Name</h3>
            <p className="text-sm opacity-60">{name}</p>
            </div>
            <button className="rounded-full hover:bg-gray-600 hover:bg-opacity-40 border-2 px-2 py-1">Change</button>
          </div>
          <h2 className="border-b-2 opacity-60">Bio</h2>
          <div className="flex justify-between items-center mb-1 mt-2">
            <div className="flex flex-col">
            <h3>Favorite Movie</h3>
            <p className="text-sm opacity-60">{favoriteMovie}</p>
            </div>
            <button className="rounded-full hover:bg-gray-600 hover:bg-opacity-40 border-2 px-2 py-1">Change</button>
          </div>
          <div className="flex justify-between items-center mb-1 mt-2">
            <div className="flex flex-col">
            <h3>Favorite Pizza</h3>
            <p className="text-sm opacity-60">{favoritePizza}</p>
            </div>
            <button className="rounded-full hover:bg-gray-600 hover:bg-opacity-40 border-2 px-2 py-1">Change</button>
          </div>
          <h2 className="border-b-2 opacity-60">Account Preferences</h2>
          <div className="flex justify-between items-center mb-1 mt-2">
            <h3>Allow Comments on Your Reviews</h3>
            <label className="relative inline-flex items-center cursor-pointer ml-4">
              <input type="checkbox" value="" className="sr-only peer" defaultChecked={settings?.allowComments} />
              <div className={`w-11 h-6 bg-gray-600 rounded-full peer-checked:ring-2 peer-checked:ring-skin-light peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-skin-base`}></div>
            </label>
          </div>
          <h2 className="border-b-2 opacity-60">Delete Account</h2>
          <button type="button" className="text-red-600 text-right mb-1 mt-2"><FontAwesomeIcon icon={faTrash} className="w-5" /> Delete Account</button>
        </section>
    </div>
  )
}

export default SettingsPopup