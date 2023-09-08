'use client'
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

const HighlightedMovie = ({movies}:any) => {
    const [choice, setChoice] = useState(movies[0])
    const searchParams = useSearchParams()!
    const imagePath = "https://image.tmdb.org/t/p/original"
    
    let moviePage = choice?.id
    let movieId = searchParams.get('movie')
    let movieChoice = movies?.filter((movie:any) => String(movie.id) === movieId)

    useEffect(() => {
        if (movieId) {
            setChoice(movieChoice[0])
        } else {
            setChoice(movies[0])
        }     
    }, [movieId])

  return (
        <div className={`flex flex-col p-3 gap-3 pb-3 rounded-lg border-4 border-skin-dark hover:border-skin-light w-sm`}>
            <h2 className={`text-center text-2xl font-bold mt-3`}>Highlighted Movie</h2>
            <Link href={`/${moviePage}`}>
                <h3 className={`text-center text-skin-light hover:bg-gray-600 hover:bg-opacity-40 w-fit mx-auto px-3 py-1 rounded-lg`}>{choice?.title}</h3>
            </Link>
            <div className={`flex justify-around gap-3 md:gap-6 items-center`}>
            <Link href={`/${moviePage}`}>
                <Image src={imagePath + choice?.poster_path} alt="poster" width="150" height="150" className={`h-auto rounded-xl mx-3`} />
            </Link>
            <ul className={`flex flex-col justify-between items-center text-center`}>
                <li className={`bg-black bg-opacity-70 p-2 rounded-xl md:w-32`}>
                    <p>Popularity</p>
                    <p className={`text-skin-light text-sm`}>{Math.round(choice?.popularity)}</p>
                </li>
                <li className={`bg-black bg-opacity-70 p-2 rounded-xl md:w-32`}>
                    <p>Vote Count</p>
                    <p className={`text-skin-light text-sm`}>{Math.round(choice?.vote_count)}</p>
                </li>
                <li className={`bg-black bg-opacity-70 p-2 rounded-xl md:w-32`}>
                    <p>Vote Average</p>
                    <p className={`text-skin-light text-sm`}>{Math.round(choice?.vote_average * 10) / 10}</p>
                </li>
            </ul>
            </div>
            <Link href="https://www.themoviedb.org/" className={`text-center py-3 text-skin-light hover:underline`}>The Movie Data Base</Link>
        </div>
  )
}

export default HighlightedMovie