import React from 'react'
import {gsap} from "gsap"
import ScrollTrigger from 'gsap/ScrollTrigger'


const CallHook = () => {
    const stretchBox =()=>{
        gsap.to(".box",{
            width:170,
            duration:0.2
        })
    }
    
    const hideBox =()=>{
        gsap.to(".box",{
            width:0,
            duration:0.2

        })
    }

    const trackDots =(e)=>{
        gsap.to(".dotBar",{
            top: `${Math.floor(e.clientY/1.5)}px`,
        })
    }
    const shakeDots =()=>{
        // const dots = document.querySelector(".dots")

        gsap.to(".dotBar",{
            ease:"power2.out",
            paddingLeft:80,
            paddingRight:80
        })
        gsap.to(".dots",{
            rotate:405,
        })
    }
    const resetDots =()=>{
        gsap.to(".dotBar",{
            ease:"power2.out",
            top:"50%",
            paddingLeft:40,
            paddingRight:40
        })
        gsap.to(".dots",{
            rotate:45,
        })
    }
    

  return (
    <div className='bg-zinc-50 h-screen '>
        <div className='w-full h-full relative'>
        <div 
        onMouseEnter={()=>{stretchBox();shakeDots()}} onMouseLeave={()=>{hideBox();resetDots()}} onMouseMove={trackDots}
        className=' text-[7rem] md:text-[12rem] text-center md:not-[]:text-center  grouper  w-full py-20 z-10 absolute top-[50%] left-[50%] -translate-[50%] font-founders leading-none uppercase'
        >
            <div className='flex pointer-events-none flex-col items-center'>
                <div className='md:text-nowrap leading-22 md:leading-none'>Let's create</div>
                <div className='flex flex-col sm:flex-row items-end gap-5 -mt-2 md:-mt-10'>
                    epicness
                    <div className='box h-30 flex justify-center overflow-hidden bg-blue-500 rounded-lg mb-6'>
                        <img className='min-w-50 h-auto object-cover' src='../src/assets/images/artworks/img (13).webp'/>    
                    </div>    
                </div>
                <p className='text-lg font-nb capitalize'>lorem ipsum you knowi know together</p>
            </div>
        </div>
        

        <div className='hidden lg:flex relative w-full h-[60%] top-[50%] -translate-y-[50%]  left-0'>
                
                <div className='dotBar absolute flex px-10 justify-between  w-full top-[50%]'>
                    <div className='flex gap-5 items-center'>
                        <div className='dots rotate-45 font-semibold w-5 h-5 bg-black text-xl'>+</div>
                        <div className='bg-zinc-900 text-zinc-100 px-3 rounded-md uppercase py-1 text-sm'>art</div>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <div className='bg-zinc-900 text-zinc-100 px-3 rounded-md uppercase py-1 text-sm'>design</div>
                        <div className='dots rotate-45 font-semibold w-5 h-5 bg-black text-xl'>+</div>
                    </div>
                </div>

        </div>
        </div>
    </div>
  )
}

export default CallHook