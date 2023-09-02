import prisma from "@/prisma/client"
export default async function UserItem({postDate, userId}: any) {
    let userInfo = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    
    return (
        <li key={Math.random()} className={`bg-opacity-40 bg-gradient-to-r from-skin-dark p-3 flex justify-between gap-3 text-sm md:text-base`}>
            <p>{userInfo?.displayName}</p>
            <p>{String(postDate).split(' ').slice(1,4).join('-')}</p>
        </li>
    )
}