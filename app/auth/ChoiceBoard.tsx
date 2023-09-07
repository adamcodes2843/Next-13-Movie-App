'use client'

import { useCallback, useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

const ChoiceBoard = ({choices}:any) => {
    const [showSelect, setShowSelect] = useState<boolean>(false)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()!

    const createQueryString = useCallback((value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('movie', value)
   
        return params.toString()
      },
      [searchParams]
    )

    let movieId = searchParams.get('movie')
      
  return (
    <div className={`p-3 md:px-12 rounded-lg border-4 border-skin-dark hover:border-skin-light w-sm mt-6 pb-6`}>
        <h2 className={`text-2xl font-bold text-center my-3`}>Select Movie</h2>
        <div className={`flex justify-around py-3`}>
          <button type="button" onClick={() => {
            setShowSelect(false)
            router.push('/reviews/review-board')
            }} className={`${!movieId && !showSelect ? 'bg-gray-600 bg-opacity-40' : 'opacity-70'} hover:bg-gray-600 hover:opacity-100 rounded-lg hover:bg-opacity-40 p-2 w-20`}>All</button>
          <button type="button" onClick={() => setShowSelect(true)} className={`${movieId || showSelect ? 'bg-gray-600 bg-opacity-40' : 'opacity-70'} hover:bg-gray-600 hover:opacity-100 rounded-lg hover:bg-opacity-40 p-2 w-20`}>Select</button>
        </div>
        {
            showSelect &&
            <ul className={`flex flex-col md:grid grid-cols-2 md:items-stretch lg:flex items-center md:pb-3 lg:pb-0 cursor-pointer`}>
                {
                    choices.map((name:any, i:number) => (
                    <li key={'option-' + i} className={`hover:bg-gray-600 rounded-lg hover:bg-opacity-40 md:flex justify-center items-center w-full text-center p-2`}>
                        <button type="button" onClick={() => {
                            router.push(pathname + '?' + createQueryString(`${name?.id}`))
                            setShowSelect(false)
                        }}>
                            {name.title}
                        </button>
                    </li>
                    ))
                }
            </ul>
        }
      </div>
  )
}

export default ChoiceBoard