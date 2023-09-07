import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {title, review, rating, movie, userId} = req.body
    try {
        await prisma.review.create({
            data: {
                movie,
                title,
                rating: Number(rating),
                review,
                userId,                
                upVotes: [userId]
            }
        })
        res.status(200).json({message: 'Review created'})
    } catch (error) {
        console.log(error)
    }
}