'use client'

import {useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import { MovieType, ReviewType } from './PageTypes'


interface FormDataType {
  title: string,
  rating: number | string,
  review: string,
  movie: string,
  userId: string
}

interface FormReviewProps {
  res: MovieType,
  userId: string,
  checkForReview: ReviewType[] | [],
  darkMode: boolean
}

const FormReview = ({res, userId, checkForReview, darkMode}:FormReviewProps) => {
    const [formData, setFormData] = useState<FormDataType>({
      title: "",
      rating: "",
      review: "",
      movie: res.title,
      userId: userId
    })

    const [showInputFields, setShowInputFields] = useState<boolean>(checkForReview?.length === 0)
    const router = useRouter()

    const ratings = [1,2,3,4,5,6,7,8,9,10]

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, data: FormDataType, id:string) => {
        event.preventDefault()
        
        if (checkForReview.length == 0) {
          createUserReview(data)
        } else if (checkForReview.length > 0) {
          updateUserReview(data, id)
        }
        setShowInputFields(false)
    }

    async function createUserReview(data: FormDataType) {
      try{
        await fetch(`/api/createReview`, {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        router.refresh()
      } catch (error) {
        console.log(error)
      }
    }

    async function updateUserReview(data: FormDataType, id:string) {
      try {
        await fetch(`/api/updateReview/${id}`, {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }, 
          method: 'PATCH'
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        router.refresh()
      } catch (error) {
        console.log(error)
      }
    }

    const handleEdit = () => {
      setShowInputFields(true)
      setFormData({...formData, title: checkForReview[0].title,  rating: checkForReview[0].rating, review: checkForReview[0].review})
    }

    let reviewId = checkForReview[0]?.id
  return (
    <>
    { showInputFields ?
    <form name="review" onSubmit={(e) => handleSubmit(e, formData, reviewId)} className={`${darkMode === true || !userId ? 'bg-gray-900 bg-opacity-60' : 'bg-white'}  border-4 border-skin-base md:mt-8 mt-4 2xl:mt-4 flex flex-col justify-center items-center text-center py-4 md:min-w-[38rem] md:w-full md:mx-auto 2xl:w-1/2`}>
        <h3 className="md:text-lg px-4">What did you think about <span className={`${darkMode === true || !userId ? 'text-skin-light' : 'text-skin-base font-semibold'}`}>{res.title}</span>?</h3>
        <input
            name="review-title"
            type="text"
            maxLength={100}
            required
            placeholder="Review Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className={`text-center md:text-lg ${darkMode === true || !userId ? 'bg-gray-600' : 'bg-gray-300'} border-2 shadow-white rounded mx-auto my-4 xl:w-96 overflow-clip md:w-96 w-9/12 ${!formData.title && darkMode !== false ? 'border-gray-400 focus:outline-skin-light' : !formData.title && darkMode === false ? 'border-gray-400 focus:outline-skin-base' : formData.title.length === 100 ? 'focus:outline-red-400 border-red-400' : formData.title && darkMode !== false ? 'border-skin-light focus:outline-skin-light' : 'border-skin-base focus:outline-skin-base'} ${darkMode === true || !userId ? 'hover:border-skin-light' : 'hover:border-skin-base'}  focus:border-transparent cursor-pointer focus:ring-0`}
             />
        <div className="w-11/12 flex justify-around items-center mb-1 max-w-[600px] md:text-xl gap-1 hover:cursor-pointer">
        { formData.rating === "" ?
            ratings.map((option) => {
            return (<button type="button" key={option} className={`border-2 rounded-full w-10 h-10 border-gray-400 ${darkMode === true || !userId ? 'bg-gray-600 hover:border-skin-light' : 'bg-gray-300 hover:border-skin-base'} `} onClick={() => {setFormData({...formData, rating:option})}}>{option}</button>)
            })
        :
            <button type="button" onClick={() => setFormData({...formData, rating: ""})} className={`border-2 ${darkMode === true || !userId ? 'bg-gray-600 border-skin-light' : 'bg-gray-300 border-skin-base'} rounded-full w-10 h-10 flex justify-center items-center`}>{String(formData.rating)}</button>
        }
        </div>
        <textarea
            name="review-text"
            placeholder="Write a review..." 
            maxLength={800}
            value={formData.review}
            onChange={(e) => setFormData({...formData, review:e.target.value})}
            className={`border-2 ${!formData.title && darkMode !== false ? 'border-gray-400 focus:outline-skin-light' : !formData.title && darkMode === false ? 'border-gray-400 focus:outline-skin-base' : formData.title.length === 800 ? 'focus:outline-red-400 border-red-400' : formData.title && darkMode !== false ? 'border-skin-light focus:outline-skin-light' : 'border-skin-base focus:outline-skin-base'} rounded hover:cursor-pointer my-2 focus:border-none ${darkMode === true || !userId ? 'bg-gray-600 hover:border-skin-light' : 'bg-gray-300 hover:border-skin-base'} w-11/12 max-w-[600px] h-32 px-2 resize-none text-sm md:text-base focus:ring-0`}
        />
        <button 
            type="submit" 
            className={`${darkMode === true || !userId ? 'hover:border-skin-light active:bg-skin-base bg-gray-600' : 'hover:border-skin-base active:bg-skin-light bg-gray-300'} border-2 border-gray-400 md:w-64 w-44 my-2 cursor-pointer`} 
            disabled={!formData.rating || !formData.title || !formData.review || !userId}>
              Submit
        </button>
        <div className="text-sm flex items-center justify-between gap-8 mt-2 mx-auto px-6">
          <p>Rated <span className={`${darkMode === true || !userId ? "text-skin-light" : 'text-skin-base'}`}>{res.vote_count}</span> times</p>
          <Link href="https://www.themoviedb.org/" className={`${darkMode === true || !userId ? 'text-skin-light' : 'text-skin-base'} text-sm  underline`}>TMDB</Link>
          <p>Average rating: <span className={`${darkMode === true || !userId ? "text-skin-light" : 'text-skin-base'}`}>{res.vote_average}</span></p>
        </div>
    </form>
  :
  <div className={`${darkMode === true || !userId ? 'bg-gray-900 bg-opacity-60' : 'bg-white'} bg-opacity-60 border-4 border-skin-base md:mt-8 mt-4 2xl:mt-0 flex flex-col justify-center items-center text-center py-4 w-full m-auto 2xl:m-0 md:min-w-[38rem]`}>
    <h2 className="text-2xl px-4">{res.title}</h2>
    <h1 className={`${darkMode === true || !userId ? 'text-skin-light' : 'text-skin-base'}`}>Review</h1>
    <h3 className="mt-2 text-xl">{checkForReview[0]?.title || formData.title}</h3>
    <div className={`border-2 ${darkMode === true || !userId ? 'bg-gray-600 border-skin-light' : 'bg-gray-300 border-skin-base'} rounded-full w-12 h-12 flex justify-center items-center m-4`}>{checkForReview[0]?.rating || formData.rating}</div>
    <p className="mb-4 mx-4">{checkForReview[0]?.review || formData.review}</p>
    <div className={`flex justify-around items-center text-sm w-full ${darkMode || !userId ? 'text-skin-light' : 'text-skin-dark'}`}>
    <Link href='/reviews/review-board' className={`${darkMode === true || !userId ? 'hover:bg-gray-600' : 'hover:bg-gray-300'}  hover:bg-opacity-70 p-2 rounded`}>Review Board</Link><button onClick={() => handleEdit()} className={`${darkMode === true || !userId ? 'hover:bg-gray-600' : 'hover:bg-gray-300'} hover:bg-opacity-70 p-2 rounded`}>Edit</button><Link  href="/reviews/review-history" className={`${darkMode === true || !userId ? 'hover:bg-gray-600' : 'hover:bg-gray-300'} hover:bg-opacity-70 p-2 rounded`}>Your Reviews</Link>
    </div>
  </div>
    }
    </>
  )
}

export default FormReview