interface FooterProps {
  reviewed: number,
  darkMode: boolean
}

export default async function Footer ({reviewed, darkMode}:FooterProps) {

  let reviewPercent = `${(String(reviewed / 20 * 100))}%`

  return (
    <footer className={`fixed z-30 ${darkMode === false ? 'bg-gray-600' : 'bg-black bg-opacity-95'} bottom-0 left-0 h-32 lg:h-36 w-full border-t-[1px] border-white flex flex-col justify-start items-center animate-closeFooter`}>
        <h1 className="text-lg text-skin-light mt-2 lg:mt-4">Review Highlights</h1>
        <h3 className="text-xl mb-2">Do you Even Pizza Night?</h3>
        <div className="w-11/12 lg:w-1/2 max-w-[800px] h-8 border-2 rounded-2xl p-1 relative">
          <div className={`h-full ${reviewed >= 1 && 'bg-skin-base'} rounded-2xl`} style={{width: reviewPercent}} />
          <h2 className="absolute text-white w-full text-center pb-[2px] left-0 bottom-0 mx-auto">{ reviewed ? String(reviewed / 20 * 100) + '%' : '0%' }</h2>
        </div>
    </footer>
  )
}