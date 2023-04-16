import Movie from "./movie"
import SearchAndFilter from "./SearchAndFilter"


export default async function Home() {
  const data= await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
  const res = await data.json()
  console.log(res)

  return (
    <main>
      <h1 className="text-6xl text-center mt-14 mb-6 font-bold">Popular Movies</h1>
      <SearchAndFilter />
      
      <div className="grid gap-16 grid-cols-fluid">
      {res.results.map((movie) => (
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
    </main>
  )
}