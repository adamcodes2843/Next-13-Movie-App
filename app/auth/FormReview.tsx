'use client'

import {useState} from 'react'

interface FormDataType {
  title: string,
  rating: number | string,
  review: string,
  movie: string,
  userId: string
}

const FormReview = ({res, session, userId}) => {
    const [formData, setFormData] = useState<FormDataType>({
      title: "",
      rating: "",
      review: "",
      movie: res.title,
      userId: userId
    })
    const [submitted, setSubmitted] = useState(false)

    const ratings = [1,2,3,4,5,6,7,8,9,10]

    const handleSubmit = (event:any, data: FormDataType) => {
        event.preventDefault()
        setSubmitted(!submitted)
        createUserReview(data)
        
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

    const handleEdit = () => {
      setSubmitted(!submitted)
    }
    
    console.log(formData)

  return (
    <>
    { !submitted ?
    <form onSubmit={(e) => handleSubmit(e, formData)} className="bg-gray-900 bg-opacity-60 border-8 border-green-800 md:mt-8 mt-4 flex flex-col justify-center items-center text-center py-4">
        <h3 className="md:text-lg px-4">What did you think about <span className="text-green-200">{res.title}</span>?</h3>
        <input
            type="text"
            maxLength={100}
            required
            placeholder="Review Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className={`text-center md:text-lg bg-gray-600 border-2 shadow-white rounded mx-auto my-4 xl:w-1/4 overflow-clip md:w-96 w-9/12 ${!formData.title ? 'border-gray-400 focus:outline-green-200' : formData.title.length === 100 ? 'focus:outline-red-400 border-green-200' : 'border-green-200 focus:outline-green-200'} hover:border-green-200 focus:border-transparent cursor-pointer focus:ring-0`}
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
            disabled={!formData.rating || !formData.title || !formData.review || !session.user.email}>
              Submit
        </button>
        <div className="text-sm flex gap-8">
        <p>Rated <span className="text-green-200">{res.vote_count}</span> times</p>
        <p>Average rating: <span className="text-green-200">{res.vote_average}</span></p>
        </div>
    </form>
  :
  <div className="border-8 border-gray-600 mt-16 flex flex-col justify-center items-center text-center py-4 md:w-1/2 w-5/6 m-auto">
    <h1 className="text-green-200">Review</h1>
    <h2 className="text-2xl">{res.title}</h2>
    <h3>{formData.title}</h3>
    <div className="border-2 bg-green-900 border-green-200 rounded-full w-12 h-12 flex justify-center items-center m-4">{String(formData.rating)}</div>
    <p className="mb-4 mx-4">{formData.review}</p>
    <div className="flex justify-around text-sm w-full text-green-200">
    <span>Review Board</span><button onClick={handleEdit} >Edit</button><span>Your Reviews</span>
    </div>
  </div>
    }
    </>
  )
}

export default FormReview