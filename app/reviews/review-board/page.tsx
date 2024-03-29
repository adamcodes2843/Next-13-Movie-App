import {blackOpsOne} from '@/app/auth/fonts'
import HighlightedMovie from '@/app/auth/HighlightedMovie'
import ChoiceBoard from '@/app/auth/ChoiceBoard'
import ReviewItem from '@/app/auth/ReviewItem'
import UserItem from '@/app/auth/UserItem'
import prisma from '@/prisma/client'
import ReviewCheck from '@/app/auth/ReviewCheck'
import { sessionUser } from '@/app/auth/sessionUser'
import { movieArray } from '@/app/auth/movieList'

export default async function ReviewBoard() {
  const MovieStuff = await movieArray()
  const res = MovieStuff.res
  const reviews = await prisma.review.findMany({
    include: {
      comments: true
    }
  })
  const user = await sessionUser()
  
  return (
    <main className={`max-w-[1600px] mx-auto`}>
      <h1 className={`${blackOpsOne.className} text-6xl lg:text-8xl text-center font-bold mt-16 md:mt-20 lg:mt-24 p-8 bg-gradient-to-b from-skin-base via-skin-dark to-skin-base rounded`}>Review Board</h1>
      <div className={`mt-6 lg:mt-12 flex flex-col lg:grid grid-cols-3 2xl:grid-cols-12 gap-6`}>
        <div className={`flex flex-col lg:col-span-1 2xl:col-span-3`}>
          <HighlightedMovie movies={res?.results} darkMode={user?.settings?.darkMode} />
          <ChoiceBoard choices={res?.results} darkMode={user?.settings?.darkMode} />
        </div>
        <div className={`grow rounded-lg flex flex-col items-center px-3 lg:col-span-2 2xl:col-span-9`}>
          <h2 className={`text-center text-4xl font-bold mt-6 lg:mt-0 mb-6 ${user?.settings?.darkMode === false && 'text-skin-dark'}`}>Pizza Night Reviews</h2>
          <ReviewCheck movies={res?.results} reviews={reviews} darkMode={user?.settings?.darkMode} />
          <ul className={`flex flex-col w-full justify-between gap-2 mt-6`}>
            {
              reviews && 
              reviews.sort((a, b)=> Number(b.dateTimePosted) - Number(a.dateTimePosted)).map((review) => (
                <>
                  <UserItem 
                    postDate={review?.dateTimePosted}
                    reviewUserId={review?.userId}
                    movies={res?.results}
                    movie={review?.movie}
                    darkMode={user?.settings?.darkMode}
                  />
                  <ReviewItem
                    reviewText={review?.review}
                    rating={review?.rating}
                    upVotes={review?.upVotes}
                    downVotes={review?.downVotes}
                    movie={review?.movie} 
                    title={review?.title}
                    darkMode={user?.settings?.darkMode}
                    reviewId={review?.id}
                    userId={user?.id}
                    reviewUserId={review?.userId}
                    comments={review?.comments}
                    movies={res?.results}
                    displayName={user?.displayName}
                    userName={user?.name}
                  />
                </>
              ))
            }
          </ul>
        </div>
      </div>
    </main>
  )
}
