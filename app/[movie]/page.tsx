import Image from "next/image"
import FormReview from '../auth/FormReview'
import { sessionUser } from "../auth/sessionUser"
import { ReviewType} from '../auth/PageTypes'

export default async function MovieDetail({params}) {
    const { movie } = params
    const user = await sessionUser()
    const imagePath = "https://image.tmdb.org/t/p/original"
    const data= await fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`)
    const res = await data.json()

    let checkForReview: ReviewType[] | [] = []
    if (user) {
        if (user?.reviews) {
            checkForReview = user?.reviews?.filter((review:ReviewType) => {
            return review.movie === res.original_title
        })
        }
    }
    
    return (
        <div className={`mt-16 2xl:mt-32 mx-auto flex flex-col 2xl:flex-row 2xl:justify-center 2xl:items-center 2xl:gap-8 max-w-[1600px]  ${user?.settings?.darkMode === false ? 'text-black' : 'text-white'}`}>
            <div className={`2xl:rounded-lg ${user?.settings?.darkMode || !user?.settings ? '2xl:bg-gray-600 2xl:bg-opacity-30' : '2xl:bg-white 2xl:border-4 2xl:border-skin-base'} 2xl:p-8 2xl:pb-20`}>
                <div className="flex justify-end 2xl:justify-start items-center">
                <div className="flex flex-col items-end 2xl:items-start text-right 2xl:text-left">
                <h1 className={`text:xl md:text-2xl 2xl:text-3xl ${user?.settings?.darkMode === false ? 'text-skin-base font-semibold' : 'text-skin-light'}`}>{res.title}</h1>
                <h2 className="2xl:text-lg">{res.release_date}</h2>
                <h2 className="2xl:text-lg">Runtime: {res.runtime} minutes</h2>
                <h2 className="text-sm bg-skin-base text-white inline-block my-2 py-2 px-4 rounded">{res.status}</h2>
                </div>
                </div>
                <Image className="mt-4 mb-2 w-full" src={imagePath + res.backdrop_path} width={1000} height={1000} alt={res.title} priority/>
                <p className={`py-4 px-1 text-sm md:text-base`}>{res.overview}</p>
            </div>
            <FormReview res={res} userId={user?.id} checkForReview={checkForReview} darkMode={user?.settings?.darkMode} />
        </div>
    )
}