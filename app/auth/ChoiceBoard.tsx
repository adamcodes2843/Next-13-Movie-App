import Image from "next/image"
import Link from "next/link"

const ChoiceBoard = ({movies}:any) => {
    const imagePath = "https://image.tmdb.org/t/p/original"
    let topMovie = movies[0]
    console.log(topMovie)
  return (
    <div className={``}>
        <div className={`flex flex-col p-3 gap-3 pb-3 mt-12 rounded-lg border-4 border-skin-dark md:max-w-sm`}>
            <h2 className={`text-center text-2xl font-bold my-3`}>Highlighted Movie</h2>
            <div className={`flex justify-around gap-3`}>
            <Image src={imagePath + topMovie.poster_path} alt="poster" width="150" height="150" className={`h-auto rounded-xl`} />
            <ul className={`flex flex-col justify-between items-center text-center`}>
                <li className={`bg-black bg-opacity-70 p-2 rounded-xl md:w-32`}>
                    <p>Popularity</p>
                    <p className={`text-skin-light text-sm`}>{Math.round(topMovie.popularity)}</p>
                </li>
                <li className={`bg-black bg-opacity-70 p-2 rounded-xl md:w-32`}>
                    <p>Vote Count</p>
                    <p className={`text-skin-light text-sm`}>{Math.round(topMovie.vote_count)}</p>
                </li>
                <li className={`bg-black bg-opacity-70 p-2 rounded-xl md:w-32`}>
                    <p>Vote Average</p>
                    <p className={`text-skin-light text-sm`}>{Math.round(topMovie.vote_average)}</p>
                </li>
            </ul>
            </div>
            <Link href="https://www.themoviedb.org/" className={`text-center py-3 text-skin-light hover:underline`}>The Movie Data Base</Link>
        </div>
    </div>
  )
}

export default ChoiceBoard