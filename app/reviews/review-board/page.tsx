import {blackOpsOne} from '@/app/auth/fonts'
import HighlightedMovie from '@/app/auth/HighlightedMovie'
import ChoiceBoard from '@/app/auth/ChoiceBoard'
import ReviewItem from '@/app/auth/ReviewItem'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function ReviewBoard() {
  const session:any = await getServerSession(authOptions)
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
  const data = await res.json()
  const reviews = await prisma.review.findMany()
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
  console.log(reviews)
  
  return (
    <main className='max-w-[1600px] mx-auto'>
      <h1 className={`${blackOpsOne.className} text-6xl lg:text-8xl text-center font-bold mt-16 md:mt-24 p-8 bg-gradient-to-b from-skin-base via-skin-dark to-skin-base rounded`}>Review Board</h1>
      <div className={`mt-12 flex gap-6`}>
        <div>
        <HighlightedMovie movies={data?.results} />
        <ChoiceBoard choices={data?.results}/>
        </div>
        <div className={`grow rounded-lg flex flex-col items-center px-3`}>
          <h2 className={`text-center text-4xl font-bold mb-12`}>Pizza Night Reviews</h2>
          <ul className={`flex flex-col w-full justify-between gap-2`}>
            {
              reviews && 
              reviews.map((review:any) => (
                <ReviewItem
                  reviewText={review?.review}
                  rating={review?.rating} 
                  voteCount={review?.voteCount} 
                  movie={review?.movie} 
                  title={review?.title}
                  darkMode={user?.settings?.darkMode}
                />
              ))
            }
          </ul>
        </div>
      </div>
    </main>
  )
}

//<li key={Math.random()} className={`hover:border-skin-light border-2 rounded border-skin-dark w-full px-3 md:px-6 py-1 text-sm lg:text-base group relative`}>
//<ReviewBoardItem reviewData={x}/>
//</li>