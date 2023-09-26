import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Bio from '../auth/Bio'
import Highlights from '../auth/Highlights'
import Image from 'next/image'
import NameButton from '../auth/NameButton'
import { sessionUser } from '../auth/sessionUser'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { MovieType, ReviewType, SessionType } from '../auth/PageTypes'

export default async function Profile() {
    const session: SessionType | null = await getServerSession(authOptions)
    const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
    const res = await data.json()
    const user = await sessionUser()

    let questList = [{title: "1 Movie Review", xp: '150'}, {title: "Every 10 Karma", xp: '50'}, {title: "1 Comment on Review", xp: '10'}]

    let ratings = user?.reviews?.map((review: ReviewType) => review.rating)
    
    let heighestRating = ratings ? Math.max(...ratings) : 0
    let lowestRating = ratings? Math.min(...ratings) : 0
    const reviews = user?.reviews.map((review: ReviewType) => {return review.movie})
    const movieList = res.results.map((movie: MovieType)=> {return movie.title})
    const highlightedReviews = reviews?.filter((review: ReviewType)=> {return movieList.indexOf(review) >= 0}).length
    
    const karmaCounter = () => {
        if (user) {
            let reviewVotes = 0
            let commentVotes = 0
            if (user?.reviews) {
                reviewVotes = user?.reviews.reduce((acc:number, curr:ReviewType) => acc + curr.voteCount, 0)
            }
            // if (user?.comments) {
            //     commentVotes = user?.comments.reduce((acc:number, curr:any) => acc + curr.voteCount, 0)
            // }
            return reviewVotes + commentVotes
        } else {
            return 0
        }
    }
    const xpCounter = () => {
        let totalXP = 0
        if (user) {
            let reviewXP = 0
            let commentXP = 0
            let karmaXP = 0
            if (user?.reviews) {
                reviewXP = user?.reviews.length * 150
            }
            if (user?.comments) {
                commentXP = user?.comments.length * 10
            }
            if (user?.reviews || user?.comments) {
                karmaXP = Math.floor(karmaCounter() / 10) * 50
            }
            totalXP = reviewXP + commentXP + karmaXP
        }
        return totalXP
    }
    const image = session?.user?.image
    return (
        <div className={`flex flex-col items-center lg:grid lg:grid-cols-2 lg:grid-rows-3 lg:gap-8 lg:max-w-[1400px] lg:mx-auto lg:mt-24 2xl:mt-32`}>
        {/* User */}
        <section className="w-full lg:col-span-2 mb-4 rounded flex flex-col lg:flex-row lg:justify-start items-center justify-center mt-8 py-4 gap-2 bg-gradient-to-t lg:bg-gradient-to-l from-skin-dark lg:px-8 lg:gap-10">
            <div className={`${user?.settings?.darkMode === false ? 'bg-white' : 'bg-black'} relative bg-opacity-50 rounded-full w-36 h-36 flex justify-center items-center shadow-inner shadow-skin-base`}>
            {user ?
                <Image src={image!} alt="user google image" width={120} height={120} className='rounded-full'/> : 
                <FontAwesomeIcon icon={faUser} className="w-12 h-12 opacity-50" />
            }
            </div>
            <NameButton name={user?.name} displayName={user?.displayName} darkMode={user?.settings?.darkMode} />
            <div className="flex flex-col justify-center items-center"><h2 className={`${user?.settings?.darkMode === false ? 'bg-white bg-opacity-30' : 'bg-gray-600 bg-opacity-50'} text-sm border-l-2 border-r-2 rounded p-2 border-skin-base lg:text-lg mb-1`}>Level <span className="text-skin-light">{!user ? '1' : Math.floor(xpCounter() / 150)}</span> Pizza Homie</h2><h2>Pizza Night XP</h2><h3 className={`${user?.settings?.darkMode === false ? 'bg-white text-skin-light' : 'bg-black text-skin-light'} rounded px-2 py-1 mt-1 bg-opacity-50`}>{xpCounter()}</h3></div>
        </section>
        <Bio userId={user?.id} favoriteMovie={user?.favoriteMovie} favoritePizza={user?.favoritePizza} darkMode={user?.settings?.darkMode} />
        {/* Stats */}
        <section className={`${user?.settings?.darkMode === false && 'text-black'} w-full gap-2 mb-4 lg:mb-0 lg:self-start`}>
            <div className="flex items-center gap-4"><h2 className="">Stats</h2><div className={`flex-grow h-[1px] ${user?.settings?.darkMode === false ? 'bg-black' : 'bg-white'}`} /></div>
            <ul className="flex flex-col mt-4 w-full">
            <li className={`${user?.settings?.darkMode === false ? 'hover:bg-white hover:bg-opacity-50' : 'hover:bg-gray-600 hover:bg-opacity-20'} w-full relative border-l-2 border-transparent hover:border-skin-base pl-2`}>
                Reviews <span className={`${user?.settings?.darkMode === false ? 'text-skin-base' : 'text-skin-light'} absolute right-0  mr-2`}>{user ? user.reviews.length : '0'}</span>
            </li>
            <li className={`${user?.settings?.darkMode === false ? 'hover:bg-white hover:bg-opacity-50' : 'hover:bg-gray-600 hover:bg-opacity-20'} w-full relative border-l-2 border-transparent hover:border-skin-base pl-2`}>
                Comments <span className={`${user?.settings?.darkMode === false ? 'text-skin-base' : 'text-skin-light'} absolute right-0 mr-2`}>{user ? user.comments.length : '0'}</span>
            </li>
            <li className={`${user?.settings?.darkMode === false ? 'hover:bg-white hover:bg-opacity-50' : 'hover:bg-gray-600 hover:bg-opacity-20'} w-full relative border-l-2 border-transparent hover:border-skin-base pl-2`}>
                Average Rating <span className={`absolute right-0 ${user?.settings?.darkMode === false ? 'text-skin-base' : 'text-skin-light'} mr-2`}>{user?.reviews.length > 0 ? Math.round(user.reviews.reduce((acc:number, curr:ReviewType) => acc + curr.rating, 0) / user.reviews.length) : '0'}</span>
            </li>
            <li className={`${user?.settings?.darkMode === false ? 'hover:bg-white hover:bg-opacity-50' : 'hover:bg-gray-600 hover:bg-opacity-20'} w-full relative border-l-2 border-transparent hover:border-skin-base pl-2`}>
                Karma <span className={`absolute right-0 ${user?.settings?.darkMode === false ? 'text-skin-base' : 'text-skin-light'} mr-2`}>{karmaCounter()}</span>
            </li>
            </ul>
        </section>
        <Highlights reviews={user?.reviews} darkMode={user?.settings?.darkMode} heighestRating={heighestRating} lowestRating={lowestRating} reviewed={highlightedReviews} />
        {/* Pizza Night XP*/}
        <section className="w-full gap-2 mt-4 lg:mt-0 lg:self-start">
            <div className={`flex items-center gap-3 w-full ${user?.settings?.darkMode === false && 'text-black'}`}><h2 className="">Pizza Night XP</h2><div className={`h-[1px] ${user?.settings?.darkMode === false ? 'bg-black' : 'bg-white bg-opacity-70'} flex-grow`} /></div>
            <ul className="">
                {questList.map((quest) => {
                    return (
                    <li key={Math.random()} className={`flex bg-gradient-to-r hover:bg-gradient-to-l from-skin-base ${user?.settings?.darkMode === false && 'to-white text-black'} py-2 px-4 gap-2 justify-between items-center border-[1px] border-white mt-4`}><h3 className="">{quest.title}</h3><p className="text-sm">+{quest.xp} xp</p></li> )
                })
                }
            </ul>
        </section>
        </div>
  )
}