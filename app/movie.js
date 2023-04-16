'use client'

import Link from "next/link" 
import Image from "next/image"
import {faEye} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default function Movie({title, id, poster_path, release_date, vote_average}) {
    const imagePath = 'https://image.tmdb.org/t/p/original'
    return(
        <div className="hover:p-1">
            <div className="flex justify-between items-center px-2 py-2 h-20 bg-gray-800">
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
            <div width={800} height={800} className="relative">
                <Link href={`/${id}`}>
                <Image 
                    src={imagePath + poster_path} 
                    width={800} 
                    height={800} 
                    alt={title} 
                />
                </Link>
                <button type="checkbox" className="absolute bottom-2 right-2 w-10 h-10 border-hidden clip-style bg-transparent">
                    <FontAwesomeIcon icon={faEye} className="text-white active:text-black hover:text-green-600 text-3xl" />
                </button>
            </div>
        </div>
    )
}