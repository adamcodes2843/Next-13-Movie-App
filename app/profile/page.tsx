import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Bio from '../auth/Bio'
import Highlights from '../auth/Highlights'

const Profile = () => {
    let questList = [{title: "Watch a Movie", xp: '50'}, {title: "Review a Movie", xp: '150'}, {title: "10 Upvotes on Review", xp: '20'}]
  return (
    <div className="flex flex-col items-center lg:grid lg:grid-cols-2 lg:grid-rows-3 lg:gap-8 lg:max-w-[1400px] lg:mx-auto lg:mt-24 2xl:mt-32">
        {/* User */}
        <section className="w-full lg:col-span-2 mb-4 rounded flex flex-col lg:flex-row lg:justify-start items-center justify-center mt-8 py-4 gap-2 bg-gradient-to-t lg:bg-gradient-to-l from-green-900 lg:px-8 lg:gap-10">
            <div className="relative bg-gray-600 bg-opacity-50 rounded-full w-40 h-40 flex justify-center items-center shadow-inner shadow-green-600">
            <FontAwesomeIcon icon={faUser} className="w-12 h-12 opacity-50" />
            </div>
            <h1 className="text-4xl my-1 bg-black lg:bg-opacity-0 bg-opacity-70 rounded-xl py-2 hover:shadow-gray-600 w-3/4 lg:w-auto text-center lg:mr-auto">Username</h1>
            <div className="flex flex-col justify-center items-center"><h2 className="text-sm bg-opacity-50 border-l-2 bg-gray-600 border-r-2 rounded p-2 border-green-600 lg:text-lg mb-1">Level <span className="text-green-200">1</span> Pizza Homie</h2><h2>Pizza Night XP</h2><h3 className="text-green-600 bg-black rounded px-2 py-1 mt-1 bg-opacity-70">0 / 150</h3></div>
        </section>
        <Bio />
        {/* Stats */}
        <section className="w-full gap-2 mb-4 lg:mb-0 lg:self-start">
            <div className="flex items-center gap-4 opacity-50"><h2 className="">Stats</h2><div className="flex-grow h-[1px] bg-white" /></div>
            <ul className="flex flex-col mt-4 w-full">
            <li className="w-full relative border-l-2 border-transparent hover:border-green-600 pl-2 hover:bg-gray-600 hover:bg-opacity-20">
                Reviews <span className="absolute right-0 text-green-600 mr-2">0</span>
            </li>
            <li className="w-full relative border-l-2 border-transparent hover:border-green-600 pl-2 hover:bg-gray-600 hover:bg-opacity-20">
                Comments <span className="absolute right-0 text-green-600 mr-2">0</span>
            </li>
            <li className="w-full relative border-l-2 border-transparent hover:border-green-600 pl-2 hover:bg-gray-600 hover:bg-opacity-20">
                Average Rating <span className="absolute right-0 text-green-600 mr-2">0</span>
            </li>
            <li className="w-full relative border-l-2 border-transparent hover:border-green-600 pl-2 hover:bg-gray-600 hover:bg-opacity-20">
                Karma <span className="absolute right-0 text-green-600 mr-2">0</span>
            </li>
            </ul>
        </section>
        <Highlights />
        {/* Pizza Night XP*/}
        <section className="w-full gap-2 mt-4 lg:mt-0 lg:self-start">
            <div className="flex items-center gap-3 opacity-50 w-full"><h2 className="">Pizza Night XP</h2><div className="h-[1px] bg-white flex-grow" /></div>
            <ul className="">
                {questList.map((quest):any => {
                    return (
                    <li key={Math.random()} className="flex bg-gradient-to-r hover:bg-gradient-to-l from-green-600 py-2 px-4 gap-2 justify-between items-center border-[1px] border-white mt-4"><h3 className="">{quest.title}</h3><p className="text-sm">+{quest.xp} xp</p></li> )
                })
                }
            </ul>
        </section>
        </div>
  )
}

export default Profile