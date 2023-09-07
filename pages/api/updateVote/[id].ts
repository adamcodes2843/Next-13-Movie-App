import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const reviewId = req.query.id
    const {karmaCounter, dvList, uvList} = req.body

    try {
        await prisma.review.update({
            where: {
                id: String(reviewId)
            },
            data: {
                voteCount: Number(karmaCounter),
                downVotes: dvList,
                upVotes: uvList
            }
        })
        res.status(200).json({message: `count: ${karmaCounter}`})
    } catch (error) {
        console.log(error)
    }
}