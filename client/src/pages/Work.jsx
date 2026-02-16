import React, { useState } from 'react'

// create an array of imagedat including src name desc or maybe before too.
import { MdArrowOutward,MdArrowForward } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const gallery = [
  {
      name:"noname noname",
      desc:"image description will go here",
      src:"work/img1 (1).webp",
      before:"work/imgz (1).webp"
  }
]

const Work = () => {
  const navigate = useNavigate()
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [selectedImage,setSelectedImage] = useState("")
  const [imageCount,setImageCount] = useState(20);
  
  const handleModal = (i)=>{
    console.log(i)
    setSelectedImage(i)
    setIsModalOpen(true)
  }

  const handleLoadMore = ()=>{
    setImageCount(imageCount+10)
  }
  return (
    <div className='bg-zinc-950 text-zinc-100 relative pb-40'>
        <div className='px-6 md:px-10'>
            <h1 className='text-center  pt-40 pb-10  leading-none text-9xl lg:text-[17rem] uppercase font-semibold font-founders'>Work</h1>
            {/* <h1 className='text-center  pb-20 w-[40rem] leading-none [17rem] text-lg font-nb  '>No fluff. No templates. Just real work.</h1> */}
            <ul className='hidden md:flex w-full font-neue text-lg pb-10 gap-10 justify-center'>
              {["All","Concept arts","Logo designs","UI/UX","Poster designs"].map((item,idx)=>(
                <li className='border-b-2 pb-1 cursor-pointer' key={idx}>{item}</li>
              ))}
            </ul>



            {/* <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 '> */}
            <div className='columns-2 md:columns-4 gap-2 '>
              {Array.from({length:imageCount},(_,i)=>(
                // <div className=' group w-full h-[26rem] relative overflow-hidden' onClick={()=>handleModal(i+1)}>
                // <div className=' group w-full h-50 md:h-[26rem] relative overflow-hidden' onClick={()=>{navigate(`/work/${i+1}`)}}>
                <div className=' group w-full mb-2 relative overflow-hidden' onClick={()=>{navigate(`/work/${i+1}`)}}>
                  <div className='absolute w-full h-full opacity-0 z-[10] transition-opacity bg-purple-500 group-hover:opacity-50'></div>
                  <img className=' group-hover:scale-110 h-full w-full object-cover transition-transform' src = {`/images/work/img (${i+1}).webp`}/>
                </div>
              ))}             
            </div>
            <div className='w-full flex justify-center mt-26'>
            <button onClick={()=>handleLoadMore} className='text-lg rounded-md cursor-pointer px-4 py-1 bg-zinc-100 text-black'>Load more artworks</button>
            </div>




        </div>



        {/* the modal overlay */}
        {/* {isModalOpen&& <div onClick={()=>setIsModalOpen(false)} className='fixed z-[50] cursor-zoom-out top-0 left-0  bg-black/70 w-[100vw] h-[100vh]'>          
          <div className='bg-black z-[55] flex  justify-center cursor-default p-5 absolute top-[50%] left-[50%] -translate-[50%] w-[75vw] h-[95vh]'>
          <img className=' h-full' src={`/images/work/img (${selectedImage}).webp`}/>
          </div>
          </div>} */}
          
    </div>

  )
}

export default Work