import {blackOpsOne} from '@/app/auth/fonts'
import ChoiceBoard from '@/app/auth/ChoiceBoard'

export default async function ReviewBoard() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
  const data = await res.json()
  console.log(data)
  
  return (
    <main className='max-w-[1600px] mx-auto'>
      <div className={`text-center mt-16 md:mt-24 p-8 bg-gradient-to-b from-skin-base via-skin-dark to-skin-base rounded`}>
        <h1 className={`${blackOpsOne.className} text-6xl lg:text-8xl text-center font-bold`}>Review Board</h1>
      </div>
      <ChoiceBoard movies={data?.results} />
    </main>
  )
}