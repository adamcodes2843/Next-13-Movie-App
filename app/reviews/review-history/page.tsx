import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../pages/api/auth/[...nextauth]'
import prisma from "@/prisma/client"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFaceMeh } from '@fortawesome/free-solid-svg-icons'

export default async function ReviewHistory() {
  const session:any = await getServerSession(authOptions)
  let user 
  if (session) {
    try {
      user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        },
        include: {
            reviews: true,
            settings: true
        }
    })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className='max-w-[1600px] mx-auto'>
      <div className={`flex items-center justify-between mt-16 md:mt-24 2xl:mt-32`}>
        <h1 className={`text-skin-light text-3xl 2xl:text-5xl my-4 md:p-4 md:border-4 w-[34rem] border-skin-base md:text-center`}>Review History</h1>
        <div className={`hidden md:block h-1 bg-skin-base w-full`}/>
      </div>
      <div className={`flex flex-col md:flex-row items-center justify-between`}>
        <ul className={`w-full md:w-[34rem] flex md:flex-col justify-between items-center text-center text-sm md:text-base 2xl:text-xl gap-2 md:gap-6 md:py-6 border-2 p-1 rounded border-gray-600 md:border-0`}>
          <li className={`flex flex-col md:gap-2`}>
            <p>Total Reviews</p>
            <p className={`text-skin-light`}>1</p>
          </li>
          <li className={`flex flex-col md:gap-2`}>
            <p>Average Rating</p>
            <p className={`text-skin-light`}>1</p>
          </li>
          <li className={`flex flex-col md:gap-2`}>
            <p>Highest Rated</p>
            <p className={`text-skin-light`}>1</p>
          </li>
          <li className={`flex flex-col md:gap-2`}>
            <p>Lowest Rated</p>
            <p className={`text-skin-light`}>1</p>
          </li>
          <li className={`flex flex-col md:gap-2`}>
            <p>Most Upvoted</p>
            <p className={`text-skin-light`}>1</p>
          </li>
        </ul>
        <ul className={`w-full mt-12`}>
          {user?.settings?.reviews?.length < 1  || !user && 
          <li className={`text-center flex flex-col items-center gap-3 md:gap-6 md:text-xl`}>
            You haven't reviewed any movies yet.
          <FontAwesomeIcon icon={faFaceMeh} className={`w-12 h-12`}/> 
          </li>
          }
        </ul>
      </div>
    </main>
  )
}