import Link from "next/link" 
import Image from "next/image"

export default function Movie({title, id, poster_path, release_date, vote_average, reviews, view}) {
    const imagePath = 'https://image.tmdb.org/t/p/original'

    return(
        <div className={`group hover:brightness-125 ${reviews &&  reviews.indexOf(title) >= 0 && 'brightness-125 hover:brightness-100'}`}>
            <Link href={`/${id}`}>
            <div className={`flex justify-between items-center   ${view === 'list' ? 'px-6 py-3 group' : view === 'grid' ? 'h-24 w-auto px-2 py-2' : 'hidden'} bg-gray-800 ${reviews &&  reviews.indexOf(title) >= 0 && 'border-l-2 border-t-2 border-r-2 border-skin-base'}`}>
            {view === 'list' && 
                <div className="flex items-center">
                <div className={`mr-6 w-5 h-5 ${reviews && reviews.indexOf(title) >= 0 ? 'bg-skin-base border-skin-light hover:border-skin-dark' : 'bg-skin-light border-skin-base hover:bg-skin-base hover:border-skin-light'} rounded-full border-2 ${view === 'list' && 'hidden md:block group-hover:bg-skin-base group-hover:border-skin-light'}`} />
                <Image 
                    src={imagePath + poster_path}
                    width={100} 
                    height={100} 
                    alt={title}
                    className="md:w-auto md:h-auto w-12 h-16"
                />
                </div>
            }
            <div className={`${view === 'list' && 'text-sm md:text-base text-center lg:mr-12 w-36 md:w-48 lg:w-auto ml-2'}`}>
                <h1 className={`${view === 'list' && 'md:text-lg lg:text-2xl'}`}>{title}</h1>
                <h2 className="text-skin-light">{release_date}</h2>      
            </div>
            
            <div className={`border-2 rounded-full flex justify-center items-center ${view === 'list' ? 'lg:w-20 lg:h-20 w-12 h-12 md:w-16 md:h-16 lg:mr-12 text-sm md:text-base' : 'w-12 h-12'}  p-4 ml-2 md:ml-4 bg-gray-700 border-skin-base`}>
                {vote_average * 10}%
            </div>
            </div>
            <div className={`relative block ${reviews &&  reviews.indexOf(title) >= 0 && 'border-b-2 border-skin-base border-r-2 border-l-2'}`}>
                <div className={`${view === 'list' && 'hidden'} ${view === 'card' && 'w-full h-full'}`}>
                <Image 
                    src={imagePath + poster_path} 
                    width={1000} 
                    height={1000} 
                    alt={title}
                />
                <div className={`absolute bottom-2 right-2 w-6 h-6 ${reviews && reviews.indexOf(title) >= 0 ? 'bg-skin-base border-skin-light hover:border-skin-dark' : 'bg-skin-light border-skin-base hover:bg-skin-base hover:border-skin-light'} rounded-full border-2 group-hover:bg-skin-base group-hover:border-skin-light ${view === 'card' && 'hidden'}`} />
                </div>
            </div>
            </Link>
        </div>
    )
}