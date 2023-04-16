'use client'

import {useState} from 'react'

const FormReview = ({res}) => {
    const [rating, setRating] = useState('')
    const ratings = [1,2,3,4,5,6,7,8,9,10]
    console.log(rating)

  return (
    <form className="border-4 border-gray-600 mt-16 flex flex-col justify-center items-center text-center py-4">
        <h3 className="md:text-lg">What did you think about {res.title}?</h3>
        <div className="w-11/12 flex justify-around items-center py-4 max-w-[600px] md:text-xl gap-1">
        {ratings.map((options) => {
            return (<button key={options} className="border-2 rounded-full w-8 h-8 hover:bg-green-600" onClick={() => {setRating(options)}}>{options}</button>)
        })}
        </div>
        <input type="textarea" name="textReview" className="my-4 bg-black border-2" rows={5} cols={5} />
        <div className="text-sm flex gap-8">
        <p>Rated <span className="text-green-200">{res.vote_count}</span> times</p>
        <p>Average Rating: <span className="text-green-200">{res.vote_average} / 10</span></p>
        </div>
    </form>
  )
}

export default FormReview