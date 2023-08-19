import './globals.css'
import { Montserrat } from "@next/font/google"
import Nav from './auth/Nav'
import ContextProvider from './Context-Provider'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import prisma from '@/prisma/client'


const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export default async function RootLayout({ children }) {
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
          {/* @ts-expect-error Async Server Component */}
        <Nav />
        {children}
        </ContextProvider>
      </body>
    </html>
  )
}
