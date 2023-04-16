import Image from "next/image"
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Link from "next/link" 
import FormReview from './FormReview'

export async function generateStaticParams(){
    const data= await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
    const res = await data.json()
    return res.results.map((movie) => ({
        movie: toString(movie.id)
    }))
}

export default async function MovieDetail({params}) {
    const { movie } = params
    const imagePath = "https://image.tmdb.org/t/p/original"
    const data= await fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`)
    const res = await data.json()
    return (
        <div className="2xl:grid 2xl:grid-cols-4">
            <div className="2xl:col-start-2 2xl:col-end-4">
                <div className="flex justify-between items-center">
                <Link href="/">
                    <FontAwesomeIcon icon={faArrowLeft} className="h-8 w-8 border-2 p-2 rounded-full active:p-1 ml-4" />
                </Link>
                <div className="flex flex-col items-end">
                <h2 className="text:xl md:text-2xl">{res.title}</h2>
                <h2>{res.release_date}</h2>
                <h2>Runtime: {res.runtime} minutes</h2>
                <h2 className="text-sm bg-green-600 inline-block my-2 py-2 px-4 rounded">{res.status}</h2>
                </div>
                </div>
                <Image className="md:my-4 w-full" src={imagePath + res.backdrop_path} width={1000} height={1000} alt={res.title} priority/>
                <p className="p-4 bg-gray-800">{res.overview}</p>
                <FormReview res={res} />
            </div>
        </div>
    )
}