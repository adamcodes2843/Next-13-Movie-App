import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const reviewId = req.query.id
    const {title, review, rating} = req.body
    try {
        await prisma.review.update({
            where: {
                id: String(reviewId)
            },
            data: {
                title,
                review,
                rating: Number(rating)
            }
        })
        res.status(200).json({message: 'Review updated'})
    } catch (error) {
        console.log(error)
    }
}