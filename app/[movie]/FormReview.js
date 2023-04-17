'use client'

import {useState} from 'react'

const FormReview = ({res}) => {
    const [rating, setRating] = useState('')
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
    <form className="border-8 border-gray-600 mt-16 flex flex-col justify-center items-center text-center py-4">
        <h3 className="md:text-lg">What did you think about <span className="text-green-200">{res.title}</span>?</h3>
        <input
            type="text"
            required
            placeholder="Review Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-center md:text-lg bg-black border-b-2 shadow-white shadow-inner rounded mx-auto my-4 xl:w-1/4 overflow-clip w-1/2 focus:outline-green-200 hover:outline-green-200"
             />
        <div className="w-11/12 flex justify-around items-center my-1 max-w-[600px] md:text-xl gap-1">
        { rating === '' ?
            ratings.map((options) => {
            return (<button type="button" key={options} className="border-2 rounded-full w-8 h-8 hover:border-green-200" onClick={() => {setRating(options)}}>{options}</button>)
            })
        :
            <div className="border-2 border-green-200 rounded-full w-12 h-12 flex justify-center items-center">{rating}</div>
        }
        </div>
        <textarea 
            placeholder="Write a review..." 
            maxLength={500}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="border-2 rounded outline-green-200 hover:border-green-200 my-2 bg-gray-600 w-11/12 max-w-[600px] h-32 px-2 resize-none text-sm md:text-base"
        />
        <button 
            type="submit" 
            className="border-2 border-gray-600 w-1/4 my-2 shadow-md hover:border-green-200 hover:shadown-none active:bg-green-600 shadow-gray-600" 
            disabled={!rating}
            onClick={handleSubmit}>Submit</button>
        <div className="text-sm flex gap-8">
        <p>Rated <span className="text-green-200">{res.vote_count}</span> times</p>
        <p>Average rating: <span className="text-green-200">{res.vote_average}</span></p>
        </div>
    </form>
  :
  <div className="border-8 border-gray-600 mt-16 flex flex-col justify-center items-center text-center py-4 md:w-1/2 w-5/6 m-auto">
    <h2 className="text-2xl">Review</h2>
    <h3>{res.title}</h3>
    <div className="border-2 bg-green-900 border-green-200 rounded-full w-12 h-12 flex justify-center items-center m-4">{rating}</div>
    <button onClick={handleSubmit} >Edit</button>
    <div className="flex justify-between text-sm w-60">
        <span>Review Board</span><span>Your Reviews</span>
    </div>
  </div>
    }
    </>
  )
}

export default FormReview