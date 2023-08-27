import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../pages/api/auth/[...nextauth]'
import prisma from "@/prisma/client"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFaceMeh } from '@fortawesome/free-solid-svg-icons'
import ReviewItem from '@/app/auth/ReviewItem'

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
  console.log(user?.reviews)

  return (
    <main className='max-w-[1600px] mx-auto'>
      <div className={`flex items-center justify-between mt-16 md:mt-24 2xl:mt-32`}>
        <h1 className={`text-skin-light text-3xl 2xl:text-5xl my-4 md:p-4 md:border-4 w-[34rem] border-skin-dark md:text-center`}>Review History</h1>
        <div className={`hidden md:block h-1 bg-skin-dark w-full`}/>
      </div>
      <div className={`flex flex-col md:flex-row items-center md:items-stretch justify-between mt-3 md:mt-0`}>
        <ul className={`w-full md:w-[34rem] flex md:flex-col justify-between md:justify-start items-center text-center text-sm md:text-base 2xl:text-xl gap-3 md:gap-6  py-1 px-6 rounded md:mt-6 lg:mt-12 md:border-0`}>
          <li className={`flex flex-col md:gap-2`}>
            <p>Total Reviews</p>
            <p className={`text-skin-light`}>1</p>
          </li>
          <li className={`flex flex-col md:gap-2`}>
            <p>Average Rating</p>
            <p className={`text-skin-light`}>1</p>
          </li>
          <li className={`flex flex-col md:gap-2`}>
            <p>Most Upvoted</p>
            <p className={`text-skin-light`}>1</p>
          </li>
          <li className={`flex flex-col md:gap-2`}>
            <p>Total Karma</p>
            <p className={`text-skin-light`}>1</p>
          </li>
        </ul>
        <ul className={`w-full mt-6 lg:mt-12 flex flex-col justify-between gap-2`}>
          {user?.reviews?.length < 1  || !user && 
          <li className={`text-center flex flex-col items-center gap-3 md:gap-6 md:text-xl`}>
            You haven't reviewed any movies yet.
          <FontAwesomeIcon icon={faFaceMeh} className={`w-12 h-12`}/> 
          </li>
          }
          {user?.reviews?.length > 0 && 
          user?.reviews?.map((review:any) => (
            <ReviewItem 
              reviewText={review?.review} 
              rating={review?.rating} 
              voteCount={review?.voteCount} 
              movie={review?.movie} 
              title={review?.title} 
              />
          ))
          }
        </ul>
      </div>
    </main>
  )
}