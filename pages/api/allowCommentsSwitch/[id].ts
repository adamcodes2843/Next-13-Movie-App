import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const id = req.query.id
    const allowComments = req.body
    
    try {
        await prisma.settings.update({
            where: {
                userId: String(id)
            },
            data: {
                allowComments: Boolean(allowComments)
            }
        })
        res.status(200).json({message: `Allow comments switched`})
    } catch (error) {
        console.log(error)
    }
}