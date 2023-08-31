import Movie from "./auth/movie"
import Footer from "./auth/Footer"
import SearchAndFilter from "./auth/SearchAndFilter"
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import prisma from "@/prisma/client"
import ScrollLeft from "./auth/ScrollLeft"
import ScrollRight from "./auth/ScrollRight"
import ClickRight from "./auth/ClickRight"
import ClickLeft from "./auth/ClickLeft"
import { monoton } from './auth/fonts'

export default async function Home() {
  const session:any = await getServerSession(authOptions)
  const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
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
  const reviews = user?.reviews.map((review):any => {return review.movie})
  const movieList = res.results.map((movie):any=> {return movie.original_title})
  const highlightedReviews = reviews?.filter((review):any=> {return movieList.indexOf(review) >= 0}).length
  
  return (
    <main className={`max-w-[1600px] mx-auto`}>
      <div className={`mt-24 mb-6 rounded-lg  ${user?.settings?.darkMode !== false && 'lg:shadow-inner border-skin-light shadow-skin-base lg:border-4 lg:px-6 lg:py-6'} mx-auto w-full md:w-[30rem] lg:w-[40rem]`}>
      <h1 className={`${monoton.className} text-6xl lg:text-8xl text-center  font-bold ${!user?.settings?.darkMode && user?.settings ? 'text-skin-base': 'text-skin-light'}`}>Pizza Night</h1>
      <h2 className={`text-4xl text-center  ${!user?.settings?.darkMode && user?.settings && 'text-gray-600'}`}>Popular Movie Reviews</h2>
      </div>
      <SearchAndFilter darkMode={user?.settings?.darkMode} view={user?.settings?.view} />    
      <div className={`${user?.settings?.view === 'card' && 'mx-auto relative'}`}>
      <div className={`${!user?.settings?.view || user?.settings?.view === 'grid' ? 'grid grid-cols-fluid gap-6 lg:gap-12' : user?.settings?.view === 'list' ? 'relative flex flex-col gap-1' : 'flex items-end cursor-pointer overflow-x-scroll md:overflow-x-hidden overflow-y-hidden scrollbar scroll-smooth gap-6 max-w-[1400px] mx-auto'}`} id="movies" >
      { user?.settings?.view === 'card' && <ScrollLeft />}
      { user?.settings?.view === 'card' && <ClickLeft />}
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
      { user?.settings?.view === 'card' && <ClickRight />}
      { user?.settings?.view === 'card' && <ScrollRight />}
      </div>
      </div>
      <Footer reviewed={highlightedReviews} />
    </main>
  )
}