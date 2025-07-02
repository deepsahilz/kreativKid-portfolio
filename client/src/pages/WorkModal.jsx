import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MdArrowOutward,MdArrowForward,MdArrowBack, } from "react-icons/md";
import {TiArrowUnsorted} from "react-icons/ti"

const WorkModal = () => {

    const navigate = useNavigate();
    const [imageWidth,setImageWidth] = useState(50);
    const {id} = useParams();
  return (
    <div className=' bg-zinc-900  h-[100vh] w-full '>
        
        <div className='w-full h-full flex justify-center p-5 overflow-hidden items-center'>
                <div className='h-full inline-flex relative bg-amber-300 '>

                <img className='h-full' src={`../src/assets/images/work/img (${id}).webp`}/>
                <div className='h-full absolute ' style={{clipPath:`inset(0 0 0 ${imageWidth}% )`}}>
                    <img className=' h-full object-cover' src={`../src/assets/images/work/img (${id})b.jpg`}/>
                </div>
                <input className='absolute w-full h-full opacity-0' type='range' max="100" value={imageWidth} onChange={(e)=>setImageWidth(e.target.value)}  />
                <div style={{left:`${imageWidth}%`}} className={`slider-line transition-transform duration-300 bg-white absolute -translate-x-1 w-1 h-full`}>
                    <div className="absolute top-[50%] left-[50%] text-2xl p-1 rounded-full bg-black/70 text-white rotate-90 -translate-[50%]"><TiArrowUnsorted/></div>
                </div>
                </div>
          
        </div>
          
          <div onClick={()=>{navigate(-1)}} className='absolute top-20 left-20 cursor-pointer hover:bg-white/40 p-2 rounded-full transition-colors'>
            <MdArrowBack className='text-white text-4xl'/>
          </div>
        </div>
  )
}

export default WorkModal