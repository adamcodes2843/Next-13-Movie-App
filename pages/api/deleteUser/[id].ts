import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const id = req.query.id

    try {
        const deleteSettings = prisma.settings.delete({
            where: {
                userId: String(id)
            }
        })

        const deleteReviews = prisma.review.deleteMany({
            where: {
                userId: String(id)
            }
        })

        const deleteComments = prisma.comment.deleteMany({
            where: {
                userId: String(id)
            }
        })

        const deleteAccount = prisma.account.delete({
            where: {
                userId: String(id)
            }
        })

        const deleteSession = prisma.session.delete({
            where: {
                userId: String(id)
            }
        })

        await prisma.$transaction([deleteSettings, deleteReviews, deleteComments, deleteAccount, deleteSession])
        await prisma.user.delete({
            where: {
                id: String(id)
            }
        })
        res.status(200).json({message: `User deleted`})
    } catch (error) {
        console.log(error)
    }
}