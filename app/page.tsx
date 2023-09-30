import Movie from "./auth/movie"
import Footer from "./auth/Footer"
import SearchAndFilter from "./auth/SearchAndFilter"
import ScrollLeft from "./auth/ScrollLeft"
import ScrollRight from "./auth/ScrollRight"
import ClickRight from "./auth/ClickRight"
import ClickLeft from "./auth/ClickLeft"
import { monoton } from './auth/fonts'
import { sessionUser } from "./auth/sessionUser"
import { MovieType, ReviewType } from "./auth/PageTypes"

export default async function Home() {
  const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
  const res = await data.json()
  const user = await sessionUser()
  const reviews = user?.reviews.map((review:ReviewType) => {return review.movie})
  const movieList = res.results.map((movie:MovieType)=> {return movie.title})
  const searchList = res.results.map((movie:MovieType) => {return {title: movie.title, id: movie.id}})
  const highlightedReviews = reviews?.filter((review:ReviewType) => {return movieList.indexOf(review) >= 0}).length
  
  return (
    <main className={`max-w-[1600px] mx-auto`}>
      <div className={`mt-24 mb-6 rounded-lg  ${user?.settings?.darkMode !== false && 'lg:shadow-inner border-skin-light shadow-skin-base lg:border-4 lg:px-6 lg:py-6'} mx-auto w-full md:w-[30rem] lg:w-[40rem]`}>
      <h1 className={`${monoton.className} text-6xl lg:text-8xl text-center  font-bold ${!user?.settings?.darkMode && user?.settings ? 'text-skin-base': 'text-skin-light'}`}>Pizza Night</h1>
      <h2 className={`text-4xl text-center  ${!user?.settings?.darkMode && user?.settings && 'text-gray-600'}`}>Popular Movie Reviews</h2>
      </div>
      <SearchAndFilter darkMode={user?.settings?.darkMode} view={user?.settings?.view} searchList={searchList}/>    
      <div className={`${user?.settings?.view === 'card' && 'mx-auto relative'}`}>
      <div className={`${!user?.settings?.view || user?.settings?.view === 'grid' ? 'grid grid-cols-fluid gap-6 lg:gap-12' : user?.settings?.view === 'list' ? 'relative flex flex-col gap-1' : 'flex items-end cursor-pointer overflow-x-scroll md:overflow-x-hidden overflow-y-hidden scrollbar scroll-smooth gap-6 max-w-[1400px] mx-auto'}`} id="movies" >
      { user?.settings?.view === 'card' && <ScrollLeft />}
      { user?.settings?.view === 'card' && <ClickLeft />}
      {res.results.map((movie:MovieType) => (
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
      <Footer reviewed={highlightedReviews} darkMode={user?.settings?.darkMode} />
    </main>
  )
}