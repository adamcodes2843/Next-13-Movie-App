'use client'

const Highlights = () => {
  return (
    <section className="w-full gap-2 lg:self-start">
            <div className="flex items-center gap-3 opacity-50 w-full"><h2 className="">Highlights</h2><div className="h-[1px] bg-white flex-grow" /></div>
            <div className="flex w-full gap-4 justify-around items-center mt-4">
                <div className="text-center bg-opacity-30 bg-gray-600 p-4 flex-grow shadow-gray-600 hover:shadow-none shadow-inner">
                    Highest<br />Rated
                </div>
                <div className="text-center bg-opacity-30 bg-gray-600 p-4 flex-grow shadow-gray-600 hover:shadow-none shadow-inner">
                    Lowest<br />Rated
                </div>
            </div>
            <div className="w-full max-w-[800px] h-8 border-2 rounded-2xl p-1 relative mt-4 mx-auto">
                <div className={`w-[5%] h-full bg-green-600 rounded-2xl`} />
                <h2 className="absolute text-white w-full text-center pb-[2px] left-0 bottom-0 mx-auto">5%</h2>
            </div>
            <h1 className="text-center">Do you even pizza night?</h1>
    </section>
  )
}

export default Highlights