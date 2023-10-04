import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const id = req.query.id
    const item = req.body

    if (item === 'comment') {
        try {
            await prisma.comment.delete({
                where: {
                    id: String(id)
                }
            })
            res.status(200).json({message: `Comment deleted`})  
        } catch (error) {
            console.log(error)
        }
    }
    if (item === 'review') {
        try {
            await prisma.review.delete({
                where: {
                    id: String(id)
                }
            })
            res.status(200).json({message: `Review deleted`})
        } catch (error) {
            console.log(error)
        }
    }
}