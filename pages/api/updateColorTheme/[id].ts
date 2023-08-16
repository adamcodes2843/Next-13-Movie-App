import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const id = req.query.id
    const colorTheme = req.body
    
    try {
        await prisma.settings.update({
            where: {
                userId: String(id)
            },
            data: {
                colorTheme: colorTheme
            }
        })
        res.status(200).json({message: `Color Theme Updated: ${colorTheme}`})
    } catch (error) {
        console.log(error)
    }
}