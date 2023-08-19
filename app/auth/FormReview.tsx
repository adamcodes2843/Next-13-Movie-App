'use client'

import {useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'


interface FormDataType {
  title: string,
  rating: number | string,
  review: string,
  movie: string,
  userId: string
}

const FormReview = ({res, session, userId, checkForReview, darkMode}) => {
    const [formData, setFormData] = useState<FormDataType>({
      title: "",
      rating: "",
      review: "",
      movie: res.title,
      userId: userId
    })
    const [changeReview, setChangeReview] = useState(false)
    const router = useRouter()

    const ratings = [1,2,3,4,5,6,7,8,9,10]

    const handleSubmit = (event:any, data: FormDataType, id:string) => {
        event.preventDefault()
        
        if (checkForReview.length == 0) {
          createUserReview(data)
        } else if (checkForReview.length > 0) {
          updateUserReview(data, id)
        }
        setChangeReview(false)
        router.refresh()
    }

    async function createUserReview(data: FormDataType) {
      try{
        fetch(`/api/createReview`, {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
      } catch (error) {
        console.log(error)
      }
    }

    async function updateUserReview(data: FormDataType, id:string) {
      try {
        fetch(`/api/updateReview/${id}`, {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }, 
          method: 'PATCH'
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
      } catch (error) {
        console.log(error)
      }
    }

    const handleEdit = () => {
      setChangeReview(true)
      setFormData({...formData, title: checkForReview[0].title,  rating: checkForReview[0].rating, review: checkForReview[0].review})
    }

    let reviewId = checkForReview[0]?.id

  return (
    <>
    { !reviewId || changeReview ?
    <form onSubmit={(e) => handleSubmit(e, formData, reviewId)} className={`${darkMode || !session?.user ? 'bg-gray-900 bg-opacity-60' : 'bg-white'}  border-4 border-skin-base md:mt-8 mt-4 2xl:mt-4 flex flex-col justify-center items-center text-center py-4 md:min-w-[38rem] md:w-full md:mx-auto 2xl:w-1/2`}>
        <h3 className="md:text-lg px-4">What did you think about <span className={`${darkMode || !session?.user ? 'text-skin-light' : 'text-skin-base font-semibold'}`}>{res.title}</span>?</h3>
        <input
            type="text"
            maxLength={100}
            required
            placeholder="Review Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className={`text-center md:text-lg ${darkMode || !session?.user ? 'bg-gray-600' : 'bg-gray-300'} border-2 shadow-white rounded mx-auto my-4 xl:w-96 overflow-clip md:w-96 w-9/12 ${!formData.title ? 'border-gray-400 focus:outline-skin-light' : formData.title.length === 100 ? 'focus:outline-red-400 border-skin-light' : 'border-skin-light focus:outline-skin-light'} ${darkMode || !session?.user ? 'hover:border-skin-light' : 'hover:border-skin-base'}  focus:border-transparent cursor-pointer focus:ring-0`}
             />
        <div className="w-11/12 flex justify-around items-center mb-1 max-w-[600px] md:text-xl gap-1 hover:cursor-pointer">
        { formData.rating === "" ?
            ratings.map((option) => {
            return (<button type="button" key={option} className={`border-2 rounded-full w-10 h-10 border-gray-400 ${darkMode || !session?.user ? 'bg-gray-600 hover:border-skin-light' : 'bg-gray-300 hover:border-skin-base'} `} onClick={() => {setFormData({...formData, rating:option})}}>{option}</button>)
            })
        :
            <button type="button" onClick={() => setFormData({...formData, rating: ""})} className={`border-2 ${darkMode || !session?.user ? 'bg-gray-600' : 'bg-gray-300'} border-skin-light rounded-full w-10 h-10 flex justify-center items-center`}>{String(formData.rating)}</button>
        }
        </div>
        <textarea 
            placeholder="Write a review..." 
            maxLength={800}
            value={formData.review}
            onChange={(e) => setFormData({...formData, review:e.target.value})}
            className={`border-2 ${!formData.review ? 'border-gray-400 focus:outline-skin-light' : formData.review.length === 800 ? 'focus:outline-red-400 border-skin-light' : 'border-skin-light focus:outline-skin-light'} rounded hover:cursor-pointer my-2 focus:border-none ${darkMode || !session?.user ? 'bg-gray-600 hover:border-skin-light' : 'bg-gray-300 hover:border-skin-base'} w-11/12 max-w-[600px] h-32 px-2 resize-none text-sm md:text-base focus:ring-0`}
        />
        <button 
            type="submit" 
            className={`${darkMode || !session?.user ? 'hover:border-skin-light active:bg-skin-base bg-gray-600' : 'hover:border-skin-base active:bg-skin-light bg-gray-300'} border-2 border-gray-400 md:w-64 w-44 my-2 cursor-pointer`} 
            disabled={!formData.rating || !formData.title || !formData.review || !session}>
              Submit
        </button>
        <div className="text-sm flex gap-8 mt-2">
        <p>Rated <span className={`${darkMode || !session?.user ? "text-skin-light" : 'text-skin-base'}`}>{res.vote_count}</span> times</p>
        <Link href="https://www.themoviedb.org/" className={`${darkMode || !session?.user ? 'text-skin-light' : 'text-skin-base'} text-sm  underline`}>TMDB</Link>
        <p>Average rating: <span className={`${darkMode || !session?.user ? "text-skin-light" : 'text-skin-base'}`}>{res.vote_average}</span></p>
        </div>
    </form>
  :
  <div className={`${darkMode || !session?.user ? 'bg-gray-900 bg-opacity-60' : 'bg-white'} bg-opacity-60 border-4 border-skin-base md:mt-8 mt-4 2xl:mt-0 flex flex-col justify-center items-center text-center py-4 w-full m-auto 2xl:m-0 md:min-w-[38rem]`}>
    <h2 className="text-2xl px-4">{res.title}</h2>
    <h1 className={`${darkMode || !session?.user ? 'text-skin-light' : 'text-skin-base'}`}>Review</h1>
    <h3 className="mt-2 text-xl">{checkForReview[0].title}</h3>
    <div className={`border-2 ${darkMode || !session?.user ? 'bg-gray-600' : 'bg-gray-300'} border-skin-light rounded-full w-12 h-12 flex justify-center items-center m-4`}>{checkForReview[0].rating}</div>
    <p className="mb-4 mx-4">{checkForReview[0].review}</p>
    <div className={`flex justify-around items-center text-sm w-full ${darkMode || !session?.user ? 'text-skin-light' : 'text-skin-dark'}`}>
    <Link href='/reviews/review-board' className={`${darkMode || !session?.user ? 'hover:bg-gray-600' : 'hover:bg-gray-300'}  hover:bg-opacity-70 p-2 rounded`}>Review Board</Link><button onClick={() => handleEdit()} className={`${darkMode || !session?.user ? 'hover:bg-gray-600' : 'hover:bg-gray-300'} hover:bg-opacity-70 p-2 rounded`}>Edit</button><Link  href="/reviews/review-history" className={`${darkMode || !session?.user ? 'hover:bg-gray-600' : 'hover:bg-gray-300'} hover:bg-opacity-70 p-2 rounded`}>Your Reviews</Link>
    </div>
  </div>
    }
    </>
  )
}

export default FormReview