import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const id = req.query.id
    const darkMode = req.body
    
    try {
        await prisma.settings.update({
            where: {
                userId: String(id)
            },
            data: {
                darkMode: Boolean(darkMode)
            }
        })
        res.status(200).json({message: `Darkmode switched`})
    } catch (error) {
        console.log(error)
    }
}