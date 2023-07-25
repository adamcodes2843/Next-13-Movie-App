'use client'

import {useState} from 'react'

const FormReview = ({res}) => {
    const [rating, setRating] = useState<undefined | Number>()
    const [title, setTitle] = useState('')
    const [review, setReview] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const ratings = [1,2,3,4,5,6,7,8,9,10]

    const handleSubmit = (event) => {
        event.preventDefault()
        setSubmitted(!submitted)
        
    }
    
  return (
    <>
    { !submitted ?
    <form className="bg-gray-900 border-8 border-green-800 md:mt-8 mt-4 flex flex-col justify-center items-center text-center py-4">
        <h3 className="md:text-lg px-4">What did you think about <span className="text-green-200">{res.title}</span>?</h3>
        <input
            type="text"
            required
            placeholder="Review Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-center md:text-lg bg-gray-600 border-b-2 shadow-white rounded mx-auto my-4 xl:w-1/4 overflow-clip md:w-96 w-9/12 focus:outline-green-200 hover:border-green-200 focus:border-transparent cursor-pointer focus:ring-0" 
             />
        <div className="w-11/12 flex justify-around items-center mb-1 max-w-[600px] md:text-xl gap-1">
        { rating === undefined ?
            ratings.map((options) => {
            return (<button type="button" key={options} className="border-2 rounded-full w-10 h-10 hover:border-green-200" onClick={() => {setRating(options)}}>{options}</button>)
            })
        :
            <button type="button" onClick={() => setRating(undefined)} className="border-2 border-green-200 rounded-full w-10 h-10 flex justify-center items-center">{String(rating)}</button>
        }
        </div>
        <textarea 
            placeholder="Write a review..." 
            maxLength={500}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="border-2 rounded hover:cursor-pointer outline-green-200 hover:border-green-200 focus:border-green-200 my-2 bg-gray-600 w-11/12 max-w-[600px] h-32 px-2 resize-none text-sm md:text-base focus:ring-0"
        />
        <button 
            type="submit" 
            className="border-2 border-gray-600 md:w-64 w-44 my-2 hover:border-green-200 active:bg-green-600  cursor-pointer" 
            disabled={!rating}
            onClick={handleSubmit}>Submit</button>
        <div className="text-sm flex gap-8">
        <p>Rated <span className="text-green-200">{res.vote_count}</span> times</p>
        <p>Average rating: <span className="text-green-200">{res.vote_average}</span></p>
        </div>
    </form>
  :
  <div className="border-8 border-gray-600 mt-16 flex flex-col justify-center items-center text-center py-4 md:w-1/2 w-5/6 m-auto">
    <h1 className="text-green-200">Review</h1>
    <h2 className="text-2xl">{res.title}</h2>
    <h3>{title}</h3>
    <div className="border-2 bg-green-900 border-green-200 rounded-full w-12 h-12 flex justify-center items-center m-4">{String(rating)}</div>
    <p className="mb-4 mx-4">{review}</p>
    <div className="flex justify-around text-sm w-full text-green-200">
    <span>Review Board</span><button onClick={handleSubmit} >Edit</button><span>Your Reviews</span>
    </div>
  </div>
    }
    </>
  )
}

export default FormReview