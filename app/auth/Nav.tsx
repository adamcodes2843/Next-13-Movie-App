import HamburgerPopup from './HamburgerPopup'
import ProfilePopup from './ProfilePopup'
import DeletePopup from './DeletePopup'
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
        if (user && !user?.settings) {
          await prisma.settings.create({
            data: {
              userId: user?.id
            }
          })
        }
        let colorTheme = user?.settings?.colorTheme
        
  return (
    <>
    <nav className={`fixed ${user?.settings?.darkMode === false ? 'bg-gray-600' : 'bg-gradient-to-r from-black to-gray-600 bg-opacity-90'} w-full h-[3.25rem] flex justify-between items-center text-xl z-20 text-white top-0 left-0`}>
      <HamburgerButton darkMode={user?.settings?.darkMode}/>
      <ProfileButton session={session} />
    </nav>
    <HamburgerPopup session={session} reviews={user?.reviews} settings={user?.settings} dbDarkMode={user?.settings?.darkMode}/>
    <ProfilePopup session={session} reviews={user?.reviews} id={user?.id} comments={user?.comments} name={user?.name} displayName={user?.displayName} darkMode={user?.settings?.darkMode} />
    <SettingsPopup settings={user?.settings} name={user?.name} favoriteMovie={user?.favoriteMovie} favoritePizza={user?.favoritePizza} id={user?.settings?.userId} displayName={user?.displayName} dbDarkMode={user?.settings?.darkMode} />
    <DeletePopup id={user?.id} darkMode={user?.settings?.darkMode}/>
    </>
  )
}