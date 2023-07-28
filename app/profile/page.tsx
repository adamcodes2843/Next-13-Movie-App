'use client'

import { faUser, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Profile = () => {
    let questList = [{title: "Watch a Movie", xp: '50'}, {title: "Review a Movie", xp: '150'}, {title: "10 Upvotes on Review", xp: '20'}]
  return (
    <div className="flex flex-col items-center">
        {/* User */}
        <section className="w-11/12 mb-4 rounded flex flex-col items-center justify-center mt-8 p-4 gap-2 bg-gradient-to-t from-green-900">
            <div className="relative bg-gray-600 rounded-full w-40 h-40 flex justify-center items-center shadow-inner shadow-green-600">
            <FontAwesomeIcon icon={faUser} className="w-12 h-12 opacity-50" />
            <button type="button" className="rounded-full absolute right-0 bottom-0 w-10 h-10 bg-green-600 bg-opacity-80 hover:bg-opacity-100 border-2">
            <FontAwesomeIcon icon={faPen} className="" />
            </button>
            </div>
            <button className="text-4xl my-1 hover:bg-gray-600 hover:bg-opacity-30 rounded-xl py-2 hover:shadow-gray-600 w-full ">Username</button>
            <h2 className="text-sm bg-opacity-50 border-l-2 bg-gray-600 border-r-2 rounded p-2 border-green-600">Level <span className="text-green-200">1</span> Pizza Homie</h2>
            <div className="flex flex-col justify-center items-center"><h2>Pizza Night XP</h2><h3 className="text-green-600 bg-black rounded px-2 py-1 mt-1 bg-opacity-70">0 / 150</h3></div>
        </section>
        {/* Bio */}
        <section className="w-full px-6 gap-2">
            <div className="flex items-center gap-4 opacity-50"><h2 className="">Bio</h2><div className="flex-grow h-[1px] bg-white" /></div>
            <div className="flex w-full mt-4 gap-2"><h3 className="md:w-1/4 w-1/2">Favorite Movie:</h3> <button type="button" className="bg-gray-600 bg-opacity-50 w-3/4 rounded-t border-t-2 border-green-600 hover:text-green-200">{'Pulp Fiction'}</button></div>
            <div className="flex w-full mb-4 gap-2"><h3 className="md:w-1/4 w-1/2">Favorite Pizza:</h3> <button type="button" className="bg-gray-600 bg-opacity-50 w-3/4 border-b-2 rounded-b border-green-600 hover:text-green-200">{'Pepperoni'}</button></div>
        </section>
        {/* Stats */}
        <section className="w-full px-6 gap-2 mb-4">
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
                Upvotes <span className="absolute right-0 text-green-600 mr-2">0</span>
            </li>
            <li className="w-full relative border-l-2 border-transparent hover:border-green-600 pl-2 hover:bg-gray-600 hover:bg-opacity-20">
                Downvotes <span className="absolute right-0 text-green-600 mr-2">0</span>
            </li>
            </ul>
        </section>
        {/* Highlights */}
        <section className="w-full px-6 gap-2">
            <div className="flex items-center gap-3 opacity-50 w-full"><h2 className="">Highlights</h2><div className="h-[1px] bg-white flex-grow" /></div>
            <div className="flex w-full gap-4 justify-around items-center mt-4">
                <div className="text-center bg-opacity-30 bg-gray-600 p-4 flex-grow shadow-gray-600 hover:shadow-none shadow-inner">
                    Highest<br />Rated
                </div>
                <div className="text-center bg-opacity-30 bg-gray-600 p-4 flex-grow shadow-gray-600 hover:shadow-none shadow-inner">
                    Lowest<br />Rated
                </div>
            </div>
            <div className="mt-4 mb-2 w-full rounded-2xl border-2 text-center">0%</div>
            <h1 className="text-center">Do you even pizza night?</h1>
        </section>
        {/* Pizza Night XP*/}
        <section className="w-full px-6 gap-2 mt-4">
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