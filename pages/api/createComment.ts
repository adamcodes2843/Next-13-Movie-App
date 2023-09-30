import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {comment, reviewId, userId, commenter} = req.body
    try {
        await prisma.comment.create({
            data: {
                reviewId,
                comment,
                userId,
                commenter
            }
        })
        res.status(200).json({message: 'Comment created'})
    } catch (error) {
        console.log(error)
    }
}