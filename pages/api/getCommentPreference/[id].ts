import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const userId = req.query.id

    try{
        const data = await prisma.settings.findUnique({
            where: {
                userId: String(userId)
            }, 
            select: {
                allowComments: true
            }
        })
        res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}