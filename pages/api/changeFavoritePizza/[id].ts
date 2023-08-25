import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const id = req.query.id
    const favoritePizza = req.body
    
    try {
        await prisma.user.update({
            where: {
                id: String(id)
            },
            data: {
                favoritePizza
            }
        })
        res.status(200).json({message: `Pizza switched`})
    } catch (error) {
        console.log(error)
    }
}