import { Monoton, Montserrat, Black_Ops_One } from "@next/font/google"

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

export const blackOpsOne = Black_Ops_One({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-black_ops_one'
})
