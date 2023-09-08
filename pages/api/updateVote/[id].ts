import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const reviewId = req.query.id
    const {count, dvList, uvList} = req.body

    try {
        await prisma.review.update({
            where: {
                id: String(reviewId)
            },
            data: {
                voteCount: Number(count),
                downVotes: dvList,
                upVotes: uvList
            }
        })
        res.status(200).json({message: `count: ${count}`})
    } catch (error) {
        console.log(error)
    }
}