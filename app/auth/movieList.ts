import { MovieType } from "./PageTypes"

export async function movieArray() {
    const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`, { next: {revalidate: 3600}})
    const res = await data.json()
    const movieList = res.results.map((movie: MovieType)=> {return movie.title})
    return {res, movieList}
}