import HamburgerPopup from './HamburgerPopup'
import ProfilePopup from './ProfilePopup'
import HamburgerButton from './HamburgerButton'
import ProfileButton from './ProfileButton'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../pages/api/auth/[...nextauth]'

export default async function Nav() {
  const session = await getServerSession(authOptions)
  
  return (
    <>
    <nav className="fixed bg-gradient-to-r from-black to-gray-600 w-full h-[3.25rem] flex justify-between items-center text-xl z-20 text-white top-0 bg-opacity-90">
      <HamburgerButton />
      <ProfileButton session={session} />
    </nav>
    <HamburgerPopup />
    <ProfilePopup session={session} />
    </>
  )
}