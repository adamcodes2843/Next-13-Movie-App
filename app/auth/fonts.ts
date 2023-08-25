import { Monoton, Montserrat } from "@next/font/google"

export const montserrat = Montserrat({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-montserrat',
  })

export const monoton = Monoton({
    weight: ['400'],
    subsets: ['latin'],
    variable: '--font-monoton'
})