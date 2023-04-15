import Movie from "./movie"

export default async function Home() {
  const data= await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
  const res = await data.json()
  console.log(res)

  return (
    <main>
      <h1 className="text-6xl text-center mt-14 mb-6 font-bold">Popular Movies</h1>
      <div className="border-2 border-white w-11/12 md:w-1/2 sticky top-5 z-10 mb-12 mx-auto rounded-lg">
          <input 
          placeholder="Search current popular movies..."
          className="bg-black w-full h-10 rounded-lg pl-4 opacity-70 focus:opacity-100"
          />

      </div>
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
