import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const commenterUserId = req.query.id

    try{
        const data = await prisma.user.findUnique({
            where: {
                id: String(commenterUserId)
            },
            select: {
                name: true,
                displayName: true
            }
        })
        res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}