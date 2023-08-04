import Movie from "./auth/movie"
import Footer from "./auth/Footer"
import SearchAndFilter from "./auth/SearchAndFilter"



export default async function Home() {
  const data= await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
  const res = await data.json()

  return (
    <main className="max-w-[1600px] mx-auto">
      <h1 className="text-6xl text-center mt-20 font-bold text-green-200">Pizza Night</h1>
      <h2 className="text-4xl text-center mb-6 ">Popular Movie Reviews</h2>
      <SearchAndFilter />
      
      <div className="grid gap-6 lg:gap-12 grid-cols-fluid">
      {res.results.map((movie:any) => (
        <Movie 
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster_path={movie.poster_path}
          release_date={movie.release_date}
          vote_average={movie.vote_average}
        />
      ))}
      </div>
      <Footer />
    </main>
  )
}