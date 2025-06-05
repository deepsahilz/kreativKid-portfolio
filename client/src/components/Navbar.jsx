import React from 'react'

const Navbar = () => {
  return (
    <div className='fixed top-2 flex justify-center w-full b z-50'>

        {/* <div className=' bg-white/10 rounded-xl backdrop-blur-sm w-[95vw] '> */}
        <div className=' rounded-xl  w-[95vw] '>
          <div className='flex justify-between items-center py-4 px-10 text-zinc-100'>
            <h1 className='text-xl font-semibold'>
              KreativKid
            </h1>

            <div className='flex flex-col gap-2 w-18 group h-6'>
              <p className='w-full h-0.5 bg-white group-hover:rotate-16 group-hover:translate-y-[10px] transition-transform duration-150'></p>
              <p className='w-full h-0.5 bg-white group-hover:hidden'></p>
              <p className='w-full h-0.5 bg-white group-hover:-rotate-[15.5deg] group-hover:-translate-y-[0px] transition-transform duration-150'></p>
            </div>
              {/* <ul className='flex gap-5'>
                <li>home</li>
                <li>About</li>
                <li>Gallery</li>
              </ul> */}

          </div>
        </div>

    </div>
  )
}

export default Navbar