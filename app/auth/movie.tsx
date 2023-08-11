import Link from "next/link" 
import Image from "next/image"

export default function Movie({title, id, poster_path, release_date, vote_average, reviews}) {
    const imagePath = 'https://image.tmdb.org/t/p/original'
    
    return(
        <div className={`hover:brightness-125 ${reviews &&  reviews.indexOf(title) >= 0 && 'brightness-125 hover:brightness-100'}`}>
            <div className={`flex justify-between items-center px-2 py-2 h-24 bg-gray-800 ${reviews &&  reviews.indexOf(title) >= 0 && 'border-l-2 border-t-2 border-r-2 border-green-600'}`}>
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
            <div className={`relative block ${reviews &&  reviews.indexOf(title) >= 0 && 'border-b-2 border-green-600 border-r-2 border-l-2'}`}>
                <Link href={`/${id}`}>
                <Image 
                    src={imagePath + poster_path} 
                    width={1000} 
                    height={1000} 
                    alt={title}
                />
                <div className={`absolute bottom-2 right-2 w-6 h-6 ${reviews && reviews.indexOf(title) >= 0 ? 'bg-green-600 border-green-200 hover:bg-green-200 hover:border-green-600' : 'bg-green-200 border-green-600 hover:bg-green-600 hover:border-green-200'} rounded-full border-2`} />
                </Link>
            </div>
        </div>
    )
}