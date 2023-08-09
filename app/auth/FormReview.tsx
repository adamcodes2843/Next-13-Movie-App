'use client'

import {useState, useContext} from 'react'
import Link from 'next/link'
import { AppContext } from '../Context-Provider'

interface FormDataType {
  title: string,
  rating: number | string,
  review: string,
  movie: string,
  userId: string
}

const FormReview = ({res, session, userId, checkForReview}) => {
  const {highlightedPercent, setHighlightedPercent}:any = useContext(AppContext)
    const [formData, setFormData] = useState<FormDataType>({
      title: "",
      rating: "",
      review: "",
      movie: res.title,
      userId: userId
    })
    const [changeReview, setChangeReview] = useState(false)

    const ratings = [1,2,3,4,5,6,7,8,9,10]

    const handleSubmit = (event:any, data: FormDataType, id:string) => {
        event.preventDefault()
        
        if (checkForReview.length == 0) {
          createUserReview(data)
        } else if (checkForReview.length > 0) {
          updateUserReview(data, id)
        }
        setChangeReview(false)
        setHighlightedPercent(String(Number(highlightedPercent) + 5))
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
    
    console.log(formData)

    const handleEdit = () => {
      setChangeReview(true)
      setFormData({...formData, title: checkForReview[0].title,  rating: checkForReview[0].rating, review: checkForReview[0].review})
    }

    let reviewId = checkForReview[0]?.id
    console.log(reviewId)

  return (
    <>
    { !reviewId || changeReview ?
    <form onSubmit={(e) => handleSubmit(e, formData, reviewId)} className="bg-gray-900 bg-opacity-60 border-4 border-green-600 md:mt-8 mt-4 2xl:mt-10 flex flex-col justify-center items-center text-center py-4 md:min-w-[38rem] md:w-full md:mx-auto">
        <h3 className="md:text-lg px-4">What did you think about <span className="text-green-200">{res.title}</span>?</h3>
        <input
            type="text"
            maxLength={100}
            required
            placeholder="Review Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className={`text-center md:text-lg bg-gray-600 border-2 shadow-white rounded mx-auto my-4 xl:w-96 overflow-clip md:w-96 w-9/12 ${!formData.title ? 'border-gray-400 focus:outline-green-200' : formData.title.length === 100 ? 'focus:outline-red-400 border-green-200' : 'border-green-200 focus:outline-green-200'} hover:border-green-200 focus:border-transparent cursor-pointer focus:ring-0`}
             />
        <div className="w-11/12 flex justify-around items-center mb-1 max-w-[600px] md:text-xl gap-1 hover:cursor-pointer">
        { formData.rating === "" ?
            ratings.map((option) => {
            return (<button type="button" key={option} className="border-2 rounded-full w-10 h-10 border-gray-400 hover:border-green-200 bg-gray-600" onClick={() => {setFormData({...formData, rating:option})}}>{option}</button>)
            })
        :
            <button type="button" onClick={() => setFormData({...formData, rating: ""})} className="border-2 bg-gray-600 border-green-200 rounded-full w-10 h-10 flex justify-center items-center">{String(formData.rating)}</button>
        }
        </div>
        <textarea 
            placeholder="Write a review..." 
            maxLength={800}
            value={formData.review}
            onChange={(e) => setFormData({...formData, review:e.target.value})}
            className={`border-2 ${!formData.review ? 'border-gray-400 focus:outline-green-200' : formData.review.length === 800 ? 'focus:outline-red-400 border-green-200' : 'border-green-200 focus:outline-green-200'} rounded hover:cursor-pointer hover:border-green-200 my-2 focus:border-none bg-gray-600 w-11/12 max-w-[600px] h-32 px-2 resize-none text-sm md:text-base focus:ring-0`}
        />
        <button 
            type="submit" 
            className="border-2 border-gray-400 md:w-64 w-44 my-2 hover:border-green-200 active:bg-green-600 bg-gray-600 cursor-pointer" 
            disabled={!formData.rating || !formData.title || !formData.review || !session}>
              Submit
        </button>
        <div className="text-sm flex gap-8">
        <p>Rated <span className="text-green-200">{res.vote_count}</span> times</p>
        <p>Average rating: <span className="text-green-200">{res.vote_average}</span></p>
        </div>
    </form>
  :
  <div className="bg-gray-900 bg-opacity-60 border-4 border-green-600 md:mt-8 mt-4 2xl:mt-0 flex flex-col justify-center items-center text-center py-4 w-full m-auto 2xl:m-0 md:min-w-[38rem]">
    <h2 className="text-2xl px-4">{res.title}</h2>
    <h1 className="text-green-200">Review</h1>
    <h3 className="mt-2 text-xl">{checkForReview[0].title}</h3>
    <div className="border-2 bg-gray-600 border-green-200 rounded-full w-12 h-12 flex justify-center items-center m-4">{checkForReview[0].rating}</div>
    <p className="mb-4 mx-4">{checkForReview[0].review}</p>
    <div className="flex justify-around items-center text-sm w-full text-green-200">
    <Link href='/reviews/review-board' className="hover:bg-gray-600 hover:bg-opacity-70 p-2 rounded">Review Board</Link><button onClick={() => handleEdit()} className="hover:bg-gray-600 hover:bg-opacity-70 p-2 rounded">Edit</button><Link  href="/reviews/review-history" className="hover:bg-gray-600 hover:bg-opacity-70 p-2 rounded">Your Reviews</Link>
    </div>
  </div>
    }
    </>
  )
}

export default FormReview