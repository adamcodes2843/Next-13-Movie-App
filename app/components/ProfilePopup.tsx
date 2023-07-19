'use client'

const ProfilePopup = ({popup}:any) => {
    
  return (
    <div className={`fixed border-l-[1px] border-white right-0 w-[21rem] top-0 bottom-0 z-40 bg-black bg-opacity-95 rounded-l-lg ${popup !== 'profilePopup' && 'hidden'}`}>

    </div>
  )
}

export default ProfilePopup