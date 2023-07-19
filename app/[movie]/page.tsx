import Image from "next/image"
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Link from "next/link" 
import FormReview from './FormReview'

export async function generateStaticParams(){
    const data= await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
    const res = await data.json()
    return res.results.map((movie:any) => ({
        movie: String(movie.id)
    }))
}

export default async function MovieDetail({params}) {
    const { movie } = params
    const imagePath = "https://image.tmdb.org/t/p/original"
    const data= await fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`)
    const res = await data.json()
    return (
        <div className="mt-16 max-w-[1600px] mx-auto">
                <div className="flex justify-end items-center">
                <div className="flex flex-col items-end text-right">
                <h2 className="text:xl md:text-2xl text-green-200">{res.title}</h2>
                <h2>{res.release_date}</h2>
                <h2>Runtime: {res.runtime} minutes</h2>
                <h2 className="text-sm bg-green-600 inline-block my-2 py-2 px-4 rounded">Watched</h2>
                </div>
                </div>
                <Image className="mt-4 mb-2 w-full" src={imagePath + res.backdrop_path} width={1000} height={1000} alt={res.title} priority/>
                <p className="p-4 bg-gray-800 text-sm md:text-base">{res.overview}</p>
                <FormReview res={res} />
        </div>
    )
}