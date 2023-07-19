'use client'

const HamburgerPopup = ({popup}:any) => {
    
  return (
    <div className={`fixed border-r-[1px] border-white left-0 w-[21rem] top-0 bottom-0 z-40 bg-black bg-opacity-95 rounded-r-lg ${popup !== 'hamburgerPopup' && 'hidden'}`}>

    </div>
  )
}

export default HamburgerPopup