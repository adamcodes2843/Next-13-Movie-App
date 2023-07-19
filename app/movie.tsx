import Link from "next/link" 
import Image from "next/image"
import SeenIt from './components/SeenIt'

export default function Movie({title, id, poster_path, release_date, vote_average}) {
    const imagePath = 'https://image.tmdb.org/t/p/original'
    return(
        <div className="hover:brightness-125">
            <div className="flex justify-between items-center px-2 py-2 h-24 bg-gray-800">
            <Link href={`/${id}`}>
            <div>
                <h1>{title}</h1>
                <h2 className="text-green-200">{release_date}</h2>      
            </div>
            </Link>
            <div className="border-2 rounded-full flex justify-center items-center w-12 h-12 p-4 ml-4 bg-gray-700 border-green-600">
                {vote_average * 10}%
            </div>
            </div>
            <div className="relative">
                <Link href={`/${id}`}>
                <Image 
                    src={imagePath + poster_path} 
                    width={1000} 
                    height={1000} 
                    alt={title} 
                />
                </Link>
                <SeenIt />
            </div>
        </div>
    )
}