import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const userEmail = req.query.id
    try {
        const data = await prisma.user.findUnique({
            where: {
                email: String(userEmail)
            },
            include: {
                reviews: true,
                comments: true,
                settings: true
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}