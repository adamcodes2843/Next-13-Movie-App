'use client'
import { AppContext } from '../Context-Provider'
import { useContext, useState, useEffect } from 'react'
import { faTrash, faAngleDown, faAngleUp, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import ColorSelection from './ColorSelection'
import LoadingSVG from './LoadingSVG'

const SettingsPopup = ({settings, name, displayName, favoriteMovie, favoritePizza, id}:any) => {
    const {popup, setPopup, setDisableButton, disableButton}:any = useContext(AppContext)
    const [settingsPage, setSettingsPage] = useState<string>('display')
    const [showColors, setShowColors] = useState<boolean>(false)
    const [showViewOptions, setShowViewOptions] = useState<boolean>(false)
    const [showSaving, setShowSaving] = useState<boolean>(false)
    const [darkMode, setDarkMode] = useState<boolean>(true)
    const [allowComments, setAllowComments] = useState<boolean>(true)
    const [changeName, setChangeName] = useState<boolean>(false)
    const [changeMovie, setChangeMovie] = useState<boolean>(false)
    const [changePizza, setChangePizza] = useState<boolean>(false)
    const [newDisplayName, setNewDisplayName] = useState<string>('')
    const [newFavoriteMovie, setNewFavoriteMovie] = useState<string>('')
    const [newFavoritePizza, setNewFavoritePizza] = useState<string>('')

    const router = useRouter()

    useEffect(() => {
      setDarkMode(settings?.darkMode)
      setAllowComments(settings?.allowComments)
      setChangeName(false)
      setChangeMovie(false)
      setChangePizza(false)
    }, [popup])

  const settingsHandler = (id:string, data:boolean | string, func:string) => {
    if (func === 'dark') {
      updateDarkMode(id, Boolean(data))
      setDarkMode(!darkMode)
    }
    if (func === 'view') {
      updateView(id, String(data))
      setShowViewOptions(false)
      router.push('/')
    }
    if (func === 'allowComments') {
      updateAllowComments(id, Boolean(data))
      setAllowComments(!allowComments)
    }
    if (func === 'name') {
      updateDisplayName(id, String(data))
      setChangeName(false)
    }
    if (func === 'favoriteMovie') {
      setChangeMovie(false)
      updateFavoriteMovie(id, String(data))
    }
    if (func === 'favoritePizza') {
      setChangePizza(false)
      updateFavoritePizza(id, String(data))
    }
    router.refresh()
    setShowSaving(true)
    setDisableButton(true)
    setTimeout(() => {
      setShowSaving(false)
      setDisableButton(false)
    }, 1500)
  }

  const handleChangeButton = (button:string) => {
    if (button === 'view') {
      setShowViewOptions(true)
    } 
    else if (button === 'name') {
      setChangeName(true)
    }
    else if (button === 'color') {
      setShowColors(true)
    }
    else if (button === 'favoriteMovie') {
      setChangeMovie(true)
    }
    else if (button  === 'favoritePizza') {
      setChangePizza(true)
    }
    setShowSaving(false)
  }

  const handleXButton = (x: string) => {
    if (x === 'name') {
      setChangeName(false)
    }
    if (x === 'favoriteMovie') {
      setChangeMovie(false)
    }
    if (x === 'closeSettings') {
      setPopup(false)
    }
    if (x === 'favoritePizza') {
      setChangePizza(false)
    }
    setDisableButton(false)
  }

  const handleDeleteButton = () => {
    setPopup('deletePopup')
    setDisableButton(false)
  }

  async function updateDarkMode(id:string, data:boolean) {
    try{
      fetch(`http://localhost:3000/api/darkModeSwitch/${id}`, {
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

  async function updateView(id:string, data:string) {
    try{
      fetch(`http://localhost:3000/api/viewSwitch/${id}`, {
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

  async function updateAllowComments(id:string, data:boolean) {
    try{
      fetch(`http://localhost:3000/api/allowCommentsSwitch/${id}`, {
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

  async function updateDisplayName(id:string, data:string) {
    try{
      fetch(`http://localhost:3000/api/changeDisplayName/${id}`, {
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

  async function updateFavoriteMovie(id:string, data:string) {
    try{
      fetch(`http://localhost:3000/api/changeFavoriteMovie/${id}`, {
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

  async function updateFavoritePizza(id:string, data:string) {
    try{
      fetch(`http://localhost:3000/api/changeFavoritePizza/${id}`, {
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
    <div className={`fixed ${popup !== 'settingsPopup' && 'hidden'} bg-opacity-95 bg-black border-white border-[1px] rounded-lg  w-[calc(100%-4rem)] md:w-[calc(100%-8rem)] top-24 md:top-36 2xl:top-72 p-4 z-50 max-w-4xl left-0 right-0 mx-auto`}>
        <div className="flex justify-between items-center mr-6">
        <h1 className="text-lg pl-6 text-skin-light">User settings</h1>
        <button type='button' onClick={()=> handleXButton('closeSettings')} className="text-lg rounded-lg hover:bg-gray-600 hover:bg-opacity-40 px-3 py-1">
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
              <input type="checkbox" value="" className="sr-only peer" disabled={disableButton} checked={darkMode === false ? false : true} onChange={() => settingsHandler(id, !settings?.darkMode, 'dark')}/>
              <div className={`w-11 h-6 bg-gray-600 rounded-full peer-checked:ring-2 peer-checked:ring-skin-light peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-skin-base ${disableButton && 'cursor-default'}`}></div>
            </label>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h3>Color Theme</h3>
              <p className="text-sm opacity-60">{settings?.colorTheme ? settings?.colorTheme.slice(6).charAt(0).toUpperCase() + settings?.colorTheme.slice(7) : 'Green'}</p>
            </div>
            <div className="flex justify-between items-center gap-2 ml-4">
              {
                !showColors ?
                <button type="button" onClick={() => handleChangeButton('color')} disabled={disableButton} className="hover:bg-gray-600 hover:bg-opacity-40 rounded-lg p-1 flex justify-center items-center">
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
          <ColorSelection showColors={showColors} id={id} setShowColors={setShowColors} setShowSaving={setShowSaving} />
          <h2 className="border-b-2 opacity-60">Layout Options</h2>
          <div className="flex justify-between items-center mb-1 mt-2">
            <div className={`${showViewOptions && 'hidden md:block'} flex flex-col`}>
            <h3>Template</h3>
            <p className="text-sm opacity-60">{settings?.view && settings?.view.charAt(0).toUpperCase() + settings?.view.slice(1)} View</p>
            </div>
            {
              !showViewOptions ?
              <button type="button" onClick={() => handleChangeButton('view')} disabled={disableButton} className="rounded-full hover:bg-gray-600 hover:bg-opacity-40 border-2 px-2 py-1">Change</button> :
              <div className='w-full flex justify-around gap-6'>
                <button type="button" onClick={() => settingsHandler(settings?.userId, 'grid', 'view')} className={`border-2 rounded-full px-2 py-1 hover:bg-gray-600 hover:bg-opacity-40`}>Grid View</button>
                <button type="button" onClick={() => settingsHandler(settings?.userId, 'list', 'view')} className={`border-2 rounded-full px-2 py-1 hover:bg-gray-600 hover:bg-opacity-40`}>List View</button>
                <button type="button" onClick={() => settingsHandler(settings?.userId, 'card', 'view')} className={`border-2 rounded-full px-2 py-1 hover:bg-gray-600 hover:bg-opacity-40`}>Card View</button>
              </div>
            }
          </div>
          <div role="status" className={`${!showSaving && 'hidden'} flex ml-auto animate-saving`}>
            <LoadingSVG />
            <span className="text-skin-light">Saving...</span>
          </div>
        </section>
        {/* Account Settings */}
        <section className={`${settingsPage !== 'account' && 'hidden'} px-6 mt-4 flex flex-col gap-2`}>
          <h2 className="border-b-2 opacity-60">Account Info</h2>
          <div className="flex justify-between items-center mb-1 mt-2">
            <div className={`flex flex-col ${changeName && 'hidden md:block'}`}>
            <h3>Display Name</h3>
            <p className="text-sm opacity-60">{displayName ? displayName : name}</p>
            </div>
            {/* Display Name Button */}
            {
              !changeName ?
              <button onClick={() => handleChangeButton('name')} disabled={disableButton} className="rounded-full hover:bg-gray-600 hover:bg-opacity-40 border-2 px-2 py-1">Change</button> :
              <div className={`flex gap-2 md:gap-6 w-full md:w-3/4 justify-between items-center`}>
                <input type="text" value={newDisplayName} onChange={(e) => setNewDisplayName(e.target.value) } maxLength={30} placeholder="Change Name" className={`bg-black text-white border-2 border-white rounded-full w-3/4 focus:border-skin-light hover:border-skin-base focus:outline-skin-dark mr-auto`}/>
              <button type="button" disabled={newDisplayName.length < 3 || disableButton} onClick={() => settingsHandler(settings?.userId, newDisplayName,'name')} className={`rounded-lg hover:bg-gray-600 hover:bg-opacity-40 w-12 h-10`}>
                <FontAwesomeIcon icon={faAngleRight} className={`w-4 h-4 text-white `} />
              </button>
              <button type='button' onClick={()=>handleXButton('name')} className="text-lg rounded-lg hover:bg-gray-600 hover:bg-opacity-40 w-12 h-10">
              x
              </button> 
              </div>
            }
          </div>
          <h2 className="border-b-2 opacity-60">Bio</h2>
          <div className="flex justify-between items-center mb-1 mt-2">
            <div className={`${changeMovie && 'hidden md:block'} flex flex-col`}>
            <h3>Favorite Movie</h3>
            <p className="text-sm opacity-60">{favoriteMovie}</p>
            </div>
            {/* Favorite Movie Button*/}
            {
              !changeMovie ?
              <button onClick={() => handleChangeButton('favoriteMovie')} disabled={disableButton} className="rounded-full hover:bg-gray-600 hover:bg-opacity-40 border-2 px-2 py-1">Change</button> :
              <div className={`flex gap-2 md:gap-6 w-full md:w-3/4 justify-between items-center`}>
                <input type="text" value={newFavoriteMovie} onChange={(e) => setNewFavoriteMovie(e.target.value) } maxLength={30} placeholder="Change Movie" className={`bg-black text-white border-2 border-white rounded-full w-3/4 focus:border-skin-light hover:border-skin-base focus:outline-skin-dark mr-auto`}/>
              <button type="button" disabled={newFavoriteMovie.length < 3 || disableButton} onClick={() => settingsHandler(settings?.userId, newFavoriteMovie ,'favoriteMovie')} className={`rounded-lg hover:bg-gray-600 hover:bg-opacity-40 w-12 h-10`}>
                <FontAwesomeIcon icon={faAngleRight} className={`w-4 h-4 text-white `} />
              </button>
              <button type='button' onClick={()=>handleXButton('favoriteMovie')} className="text-lg rounded-lg hover:bg-gray-600 hover:bg-opacity-40 w-12 h-10">
              x
              </button> 
              </div>
            }
          </div>
          <div className="flex justify-between items-center mb-1 mt-2">
            <div className={`${changePizza && 'hidden md:block'} flex flex-col`}>
            <h3>Favorite Pizza</h3>
            <p className="text-sm opacity-60">{favoritePizza}</p>
            </div>
            {/* Favorite Pizza Button */}
            {
              !changePizza ?
              <button onClick={() => handleChangeButton('favoritePizza')} disabled={disableButton} className="rounded-full hover:bg-gray-600 hover:bg-opacity-40 border-2 px-2 py-1">Change</button> :
              <div className={`flex gap-2 md:gap-6 w-full md:w-3/4 justify-between items-center`}>
                <input type="text" value={newFavoritePizza} onChange={(e) => setNewFavoritePizza(e.target.value) } maxLength={30} placeholder="Change Pizza" className={`bg-black text-white border-2 border-white rounded-full w-3/4 focus:border-skin-light hover:border-skin-base focus:outline-skin-dark mr-auto`}/>
              <button type="button" disabled={newFavoritePizza.length < 3 || disableButton} onClick={() => settingsHandler(settings?.userId, newFavoritePizza ,'favoritePizza')} className={`rounded-lg hover:bg-gray-600 hover:bg-opacity-40 w-12 h-10`}>
                <FontAwesomeIcon icon={faAngleRight} className={`w-4 h-4 text-white `} />
              </button>
              <button type='button' onClick={()=>handleXButton('favoritePizza')} className="text-lg rounded-lg hover:bg-gray-600 hover:bg-opacity-40 w-12 h-10">
              x
              </button> 
              </div>
            }
            
          </div>
          <h2 className="border-b-2 opacity-60">Account Preferences</h2>
          <div className="flex justify-between items-center mb-1 mt-2">
            <h3>Allow Comments on Your Reviews</h3>
            {/* Allow Comments */}
            <label className="relative inline-flex items-center cursor-pointer ml-4">
              <input type="checkbox" disabled={disableButton} className="sr-only peer" checked={allowComments === false ? false : true} onChange={() => settingsHandler(id, !settings?.allowComments, 'allowComments')} />
              <div className={`w-11 h-6 bg-gray-600 rounded-full peer-checked:ring-2 peer-checked:ring-skin-light peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-skin-base ${disableButton && 'cursor-default'}`}></div>
            </label>
          </div>
          <h2 className="border-b-2 opacity-60">Delete Account</h2>
          {/* Delete Button */}
          <button type="button" disabled={disableButton} onClick={() => handleDeleteButton()} className="text-red-600 text-right mb-1 mt-2"><FontAwesomeIcon icon={faTrash} className="w-5" /> Delete Account</button>
          <div role="status" className={`${!showSaving && 'hidden'} flex ml-auto animate-saving`}>
            <LoadingSVG />
            <span className="text-skin-light">Saving...</span>
          </div>
        </section>
    </div>
  )
}

export default SettingsPopup