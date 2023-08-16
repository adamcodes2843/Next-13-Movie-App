import Image from "next/image"
import FormReview from '../auth/FormReview'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import prisma from "@/prisma/client"

// causes static to dynamic error 
// export async function generateStaticParams(){
//     const data= await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
//     const res = await data.json()
//     return res.results.map((movie:any) => ({
//         movie: String(movie.id)
//     }))
// }

export default async function MovieDetail({params}) {
    const session:any = await getServerSession(authOptions)
    const { movie } = params
    let user 
    if (session) {
        try {
            user = await prisma.user.findUnique({
                where: {
                    email: session.user.email
            },
                include: {
                    reviews: true,
            }
            })
        } catch (error) {
            console.log(error)
        }
    } 

    const imagePath = "https://image.tmdb.org/t/p/original"
    const data= await fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`)
    const res = await data.json()

    let checkForReview = false
    if (session && user) {
        checkForReview = user.reviews.filter(review => {
        return review.movie === res.original_title
        })
    }

    return (
        <div className="mt-16 2xl:mt-32 mx-auto flex flex-col 2xl:flex-row 2xl:justify-center 2xl:items-center 2xl:gap-8 max-w-[1600px]">
            <div className="2xl:bg-opacity-30 2xl:rounded-lg 2xl:bg-gray-600 2xl:p-8 2xl:pb-20">
                <div className="flex justify-end 2xl:justify-start items-center">
                <div className="flex flex-col items-end 2xl:items-start text-right 2xl:text-left">
                <h1 className="text:xl md:text-2xl 2xl:text-3xl text-skin-light">{res.title}</h1>
                <h2 className="2xl:text-lg">{res.release_date}</h2>
                <h2 className="2xl:text-lg">Runtime: {res.runtime} minutes</h2>
                <h2 className="text-sm bg-skin-base inline-block my-2 py-2 px-4 rounded">{res.status}</h2>
                </div>
                </div>
                <Image className="mt-4 mb-2 w-full" src={imagePath + res.backdrop_path} width={1000} height={1000} alt={res.title} priority/>
                <p className="p-4 bg-gray-900 text-sm md:text-base">{res.overview}</p>
            </div>
            <FormReview res={res} session={session} userId={user?.id} checkForReview={checkForReview} />
        </div>
    )
}