import Movie from "./auth/movie"
import Footer from "./auth/Footer"
import SearchAndFilter from "./auth/SearchAndFilter"
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import prisma from "@/prisma/client"



export default async function Home() {
  const session:any = await getServerSession(authOptions)
  const data= await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
  const res = await data.json()
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
  console.log(res)
  const reviews = user?.reviews.map((review):any => {return review.movie})
  const movieList = res.results.map((movie):any=> {return movie.original_title})
  const highlightedReviews = reviews?.filter((review):any=> {return movieList.indexOf(review) >= 0}).length
  
  return (
    <main className={`max-w-[1600px] mx-auto`}>
      <h1 className={`text-6xl text-center mt-20 font-bold ${!user?.settings?.darkMode && user?.settings ? 'text-skin-base': 'text-skin-light'}`}>Pizza Night</h1>
      <h2 className={`text-4xl text-center mb-6 ${!user?.settings?.darkMode && user?.settings && 'text-gray-600'}`}>Popular Movie Reviews</h2>
      <SearchAndFilter darkMode={user?.settings?.darkMode}/>
      
      <div className={`${!user?.settings?.view || user?.settings?.view === 'grid' ? 'grid grid-cols-fluid gap-6 lg:gap-12' : user?.settings?.view === 'list' ? 'flex flex-col gap-1' : 'flex items-end gap-2 flex-wrap md:flex-nowrap'}`}>
      {res.results.map((movie:any) => (
        <Movie 
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster_path={movie.poster_path}
          release_date={movie.release_date}
          vote_average={movie.vote_average}
          reviews={reviews}
          view={user?.settings?.view}
        />
      ))}
      </div>
      {/* @ts-expect-error Async Server Component */}
      <Footer reviewed={highlightedReviews} />
    </main>
  )
}