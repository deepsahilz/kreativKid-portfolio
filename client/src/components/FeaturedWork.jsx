import React from 'react'
import { MdArrowOutward } from "react-icons/md";

const FeaturedWork = () => {
  const featured = [
    {name:"aaaa",src:"../src/assets/images/shabals/1.jpg"},
    {name:"bbbb",src:"../src/assets/images/shabals/1.jpg"},
    {name:"cccc",src:"../src/assets/images/shabals/1.jpg"},
    {name:"dddd",src:"../src/assets/images/shabals/1.jpg"},
    
  ]
  return (
    <div className='featured-section overflow-hidden relative w-full h-screen bg-zinc-950 font-nb text-white   '>
      <div className='hidden h-full w-full '>
        <div className='grid w-[120vw] grid-cols-7 gap-2 -translate-[10rem] rotate-15'>
        {Array.from({length:25},(_,i)=>(
                <div className=' group w-full h-[24rem] relative overflow-hidden '>
                  <div className='absolute w-full h-full opacity-0 z-[10] transition-opacity bg-purple-500 group-hover:opacity-50'></div>
                  <img className='h-full w-full  object-cover transition-transform' src = {`../src/assets/images/artworks/img (${i+1}).webp`}/>
                </div>
              ))
}             
            </div>
      </div>
      <div className='w-full h-full flex justify-center'>
        {/* <video className=' h-full rounded-md' autoPlay muted loop src='../src/assets/videos/ORBIT-5-01-LITE.mp4'/> */}
        {/* <video className=' h-full rounded-md' autoPlay muted loop src='../src/assets/videos/Showcase.mp4'/> */}
        <video className=' h-full w-full object-cover ' autoPlay muted loop src='../src/assets/videos/11904044_640_360_25fps.mp4'/>
      </div>

      <div className='absolute top-0 pointer-events-none w-full h-full bg-black/20 '></div>

        <div className='absolute  top-[50%] left-[50%] -translate-[50%]'>
          {/* <button className='bg-white flex group items-center cursor-pointer gap-2 rounded-md px-5 py-2 text-zinc-900 uppercase font-semibold'>View Gallery */}
          <button className='bg-white/50 flex group items-center cursor-pointer gap-2 rounded-full w-30 justify-center h-30 p-5  text-zinc-900 uppercase font-semibold'>View Gallery
            {/* <MdArrowOutward className='text-xl group-hover:rotate-45 transition-transform'/> */}
          </button>
        </div>
        
    </div>
  )
}

export default FeaturedWork