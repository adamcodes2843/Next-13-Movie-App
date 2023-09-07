import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const reviewUserId = req.query.id

    try{
        const data = await prisma.user.findUnique({
            where: {
                id: String(reviewUserId)
            }
        })
        res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}