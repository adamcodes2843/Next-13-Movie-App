import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFaceMeh } from '@fortawesome/free-solid-svg-icons'
import DeleteItem from '@/app/auth/DeleteItem'
import { sessionUser } from '@/app/auth/sessionUser'
import { CommentType } from '@/app/auth/PageTypes'

export default async function CommentHistory() {
  const user = await sessionUser()
  
  
  return (
    <main className='max-w-[1600px] mx-auto'>
      <div className={`flex items-center justify-between mt-16 md:mt-24 2xl:mt-32`}>
        <h1 className={`${user?.settings?.darkMode === false ? 'text-skin-base' : 'text-skin-light'} text-3xl 2xl:text-5xl my-4 md:p-4 md:border-4 w-[34rem] border-skin-dark md:text-center`}>Comment History</h1>
        <div className={`hidden md:block h-1 bg-skin-dark w-full`}/>
      </div>
      <div className={`flex flex-col md:flex-row items-center md:items-stretch justify-between mt-3 md:mt-0`}>
        <ul className={`${user?.settings?.darkMode === false && 'text-black'} w-full md:w-[34rem] flex md:flex-col justify-between md:justify-start items-center text-center text-sm md:text-base 2xl:text-xl gap-3 md:gap-6  py-1 px-6 rounded md:mt-6 lg:mt-12 md:border-0`}>
          <li className={`flex flex-col md:gap-2`}>
            <p>Total Comments</p>
            <p className={`${user?.settings?.darkMode === false ? 'text-skin-base' : 'text-skin-light'}`}>{!user ? '0' : user?.comments?.length}</p>
          </li>
          {/* <li className={`flex flex-col md:gap-2`}>
            <p>Most Upvoted</p>
            <p className={`${user?.settings?.darkMode === false ? 'text-skin-base' : 'text-skin-light'}`}>{user?.comments?.length === 0 || !user ? '0' : user?.comments?.map((x:any) => x.rating).reduce((prev:any, curr:any) => Math.max(prev, curr), - Infinity)}</p>
          </li>
          <li className={`flex flex-col md:gap-2`}>
            <p>Comment Karma</p>
            <p className={`${user?.settings?.darkMode === false ? 'text-skin-base' : 'text-skin-light'}`}>{!user ? '0' : user?.comments?.reduce((total:number, curr:any) => total + curr.voteCount, 0)}</p>
          </li> */}
        </ul>
        <ul className={`w-full mt-6 lg:mt-12 flex flex-col justify-between gap-2 ${user?.settings?.darkMode === false && 'text-black'}`}>
          {!user?.comments?.length ? 
          <li className={`text-center flex flex-col items-center gap-3 md:gap-6 md:text-xl mt-20 ${user?.settings?.darkMode === false && 'text-black'}`}>
            You haven't made any comments yet.
          <FontAwesomeIcon icon={faFaceMeh} className={`w-12 h-12 ${user?.settings?.darkMode === false && 'text-skin-base'}`}/> 
          </li> 
          :
            user?.comments?.sort((a:CommentType, b:CommentType) => Number(b.dateTimePosted) - Number(a.dateTimePosted)).map((comment:CommentType) => (
              <li key={Math.random()} className={`flex border-2 border-skin-dark items-center md:justify-between text-sm p-2 ${user?.settings?.darkMode === false && 'bg-white bg-opacity-70'}`}>
                <DeleteItem id={comment.id} item={'comment'} darkMode={user?.settings?.darkMode}/>
                <p className={`px-3 mr-auto`}>{comment.comment}</p>
                <p className={`text-right w-36`}>{String(comment.dateTimePosted).slice(4,15)}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </main>
  )
}