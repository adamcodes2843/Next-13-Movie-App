import './globals.css'
import Nav from './auth/Nav'
import ContextProvider from './Context-Provider'
import { montserrat } from './auth/fonts'
import { sessionUser } from './auth/sessionUser'

export default async function RootLayout({ children }) {
  const user = await sessionUser()
  let savedColorTheme = user?.settings?.colorTheme
  let savedDarkMode = user?.settings?.darkMode
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      
      <body className={`${montserrat.className} ${savedColorTheme && savedColorTheme} mx-6 md:mx-12 my-12 ${savedDarkMode || !user?.settings ? 'bg-black' : 'bg-gray-300'} text-white`}>
        <ContextProvider>
        <Nav />
        {children}
        </ContextProvider>
      </body>
    </html>
  )
}
