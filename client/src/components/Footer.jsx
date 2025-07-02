import React from 'react'
import { MdArrowOutward,MdArrowForward } from "react-icons/md";
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <>
    <div className='w-full h-14 text-zinc-400 bg-zinc-800 flex justify-between px-10 items-center font-rejouice text-xl'>
            <span>create</span><MdArrowForward/><span>express</span><MdArrowForward/><span>inspire</span>
          </div>
  
    <div className='bg-zinc-950   h-[85vh] overflow-hidden relative text-white px-10 py-20   '>
        
        <div className=' flex flex-col md:flex-row  font-neue justify-between'>
        
        <div>
          <h1 className='uppercase leading-none text-xl lg:text-5xl'>Lets chit-chat</h1>
          
          <div className='text-lg mt-16 font-neue text-zinc-300'>
          
          <h3><span className='mr-6 font-bold'>EMAIL</span>deepsahil.online@gmail.com</h3>

          <div className='flex flex-col md:flex-row gap-10'>
            <span className='font-bold '>SOCIALS</span>
            <Link className='hover:text-white underline'>Instagram</Link>
            <Link className='hover:text-white underline'>Behance</Link>
            <Link className='hover:text-white underline'>Upwork</Link>
          </div>
          </div>
        </div>

        <h1 className=' leading-none text-[10rem] font-bold uppercase'><MdArrowForward/></h1>

        </div>
        {/* <div className='text-lg grid grid-cols-3'>
          <h2>EMAIL</h2>
          <h3>deepsahil.online@gmail.com</h3>
          <div></div>
          <h3>SOCIALS</h3>
        <div className='flex gap-10'>
          <span>Instagram</span>
          <span>Behance</span>
          <span>upwork</span>
          <span></span>
        </div>
                <div className='flex gap-10'>
          <span className='uppercase'>Location India</span>
          <span className='uppercase'>22:08</span>
        </div>

        </div> */}

        {/* <h3 className='text-xl'>EMAIL deepsahil.online@gmail.com</h3>
        <div className='flex gap-10'>
          <span>Instagram</span>
          <span>Behance</span>
          <span>upwork</span>
          <span></span>
        </div>
        <div className='flex gap-10'>
          <span className='uppercase'>Location India</span>
          <span className='uppercase'>22:08</span>
        </div> */}

        <h1 className='absolute border-black font-founders uppercase text-[24.3vw] tracking-wider leading-none bottom-0 -mb-5 left-[50%] -translate-x-[50%]'>KreativKid</h1>
        {/* <h1 className='absolute  border-black font-founders uppercase text-[27.8vw] leading-none bottom-0 -mb-5 left-[50%] -translate-x-[50%]'>KreativKid</h1> */}
        
        
    </div>

    </>
  )
}

export default Footer