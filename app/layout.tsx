import './globals.css'
import Nav from './auth/Nav'
import ContextProvider from './Context-Provider'
import { montserrat } from './auth/fonts'
import { sessionUser } from './auth/sessionUser'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pizza Night Highlights',
  description: "Movie review website. Fullstack next13, prisma, postgres, typescript, nextauth web developer project. This app uses The Movie Database API",
}


export default async function RootLayout({ children }) {
  const user = await sessionUser()
  let savedColorTheme = user?.settings?.colorTheme
  let savedDarkMode = user?.settings?.darkMode

  return (
    <html lang="en">
      <body className={`${montserrat.className} ${savedColorTheme && savedColorTheme} mx-6 md:mx-12 my-12 ${savedDarkMode || !user?.settings ? 'bg-black' : 'bg-gray-300'} text-white`}>
        <ContextProvider>
        <Nav />
        {children}
        </ContextProvider>
      </body>
    </html>
  )
}
