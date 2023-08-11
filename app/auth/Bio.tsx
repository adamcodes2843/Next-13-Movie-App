'use client'

const Bio = ({favoriteMovie, favoritePizza}:any) => {
  return (
    <section className="w-full gap-2 lg:self-start">
        <div className="flex items-center gap-4 opacity-50"><h2 className="">Bio</h2><div className="flex-grow h-[1px] bg-white" /></div>
        <div className="flex w-full mt-4 gap-2"><h3 className="md:w-1/4 w-1/2">Favorite Movie:</h3> <button type="button" className="bg-gray-600 bg-opacity-50 w-3/4 rounded-t border-t-2 border-green-600 hover:text-green-200">{favoriteMovie ? favoriteMovie : 'None'}</button></div>
        <div className="flex w-full mb-4 gap-2"><h3 className="md:w-1/4 w-1/2">Favorite Pizza:</h3> <button type="button" className="bg-gray-600 bg-opacity-50 w-3/4 border-b-2 rounded-b border-green-600 hover:text-green-200">{favoritePizza ? favoritePizza : 'None'}</button></div>
    </section>
  )
}

export default Bio