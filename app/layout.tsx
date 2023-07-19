import './globals.css'
import { Montserrat } from "@next/font/google"
import Nav from './components/Nav'
import ContextProvider from './Context-Provider'

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      
      <body className={`${montserrat.className} mx-6 md:mx-12 my-12 bg-black text-white`}>
        <ContextProvider>
        <Nav />
        {children}
        </ContextProvider>
      </body>
    </html>
  )
}
