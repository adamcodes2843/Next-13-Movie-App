import HamburgerPopup from './HamburgerPopup'
import ProfilePopup from './ProfilePopup'
import HamburgerButton from './HamburgerButton'
import ProfileButton from './ProfileButton'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import prisma from '@/prisma/client'
import SettingsPopup from './SettingsPopup'

export default async function Nav() {
  const session:any = await getServerSession(authOptions)
  let user 
        if (session) {
            try {
                user = await prisma.user.findUnique({
                    where: {
                        email: session.user.email
                    },
                    include: {
                        reviews: true,
                        comments: true,
                        settings: true
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
  return (
    <>
    <nav className="fixed bg-gradient-to-r from-black to-gray-600 w-full h-[3.25rem] flex justify-between items-center text-xl z-20 text-white top-0 bg-opacity-90">
      <HamburgerButton />
      <ProfileButton session={session} />
    </nav>
    <HamburgerPopup session={session} reviews={user?.reviews} settings={user?.settings}/>
    <ProfilePopup session={session} reviews={user?.reviews} id={user?.id} comments={user?.comments} xp={user?.xp} name={user?.name}/>
    <SettingsPopup settings={user?.settings} name={user?.name} email={user?.email} favoriteMovie={user?.favoriteMovie} favoritePizza={user?.favoritePizza} />
    </>
  )
}