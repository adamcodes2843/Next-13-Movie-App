import Link from "next/link" 
import Image from "next/image"

export default function Movie({title, id, poster_path, release_date, vote_average, reviews, view}) {
    const imagePath = 'https://image.tmdb.org/t/p/original'

    return(
        <div className={`${view === 'card' && 'w-full'} hover:brightness-125 ${reviews &&  reviews.indexOf(title) >= 0 && 'brightness-125 hover:brightness-100'}`}>
            <div className={`flex justify-between items-center px-2 py-2 h-24 bg-gray-800 ${reviews &&  reviews.indexOf(title) >= 0 && 'border-l-2 border-t-2 border-r-2 border-skin-base'}`}>
            <Link href={`/${id}`}>
            <div>
                <h1>{title}</h1>
                <h2 className="text-skin-light">{release_date}</h2>      
            </div>
            </Link>
            <div className="border-2 rounded-full flex justify-center items-center w-12 h-12 p-4 ml-4 bg-gray-700 border-skin-base">
                {vote_average * 10}%
            </div>
            </div>
            <div className={`relative block ${reviews &&  reviews.indexOf(title) >= 0 && 'border-b-2 border-skin-base border-r-2 border-l-2'}`}>
                <Link href={`/${id}`}>
                <Image 
                    src={imagePath + poster_path} 
                    width={1000} 
                    height={1000} 
                    alt={title}
                    className={`${view === 'card' && 'w-full'}`}
                />
                <div className={`absolute bottom-2 right-2 w-6 h-6 ${reviews && reviews.indexOf(title) >= 0 ? 'bg-skin-base border-skin-light hover:border-skin-dark' : 'bg-skin-light border-skin-base hover:bg-skin-base hover:border-skin-light'} rounded-full border-2`} />
                </Link>
            </div>
        </div>
    )
}