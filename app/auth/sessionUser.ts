import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import prisma from "@/prisma/client"
import { SessionType } from '../auth/PageTypes'

export async function sessionUser() {
    const session: SessionType | null = await getServerSession(authOptions)
    let user
    if (session) {
        try {
            user = await prisma.user.findUnique({
                where: {
                    email: session.user.email
            },
                include: {
                    reviews: true,
                    settings: true,
                    comments: true
            }
            })
        } catch (error) {
            console.log(error)
        }
    }
    return user
}