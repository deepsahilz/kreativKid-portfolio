import React, { useEffect, useRef } from 'react'
import { MdArrowOutward, MdArrowForward } from "react-icons/md";
import { Link } from 'react-router-dom';

const Footer = () => {
  const letterRefs = useRef([]);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            letterRefs.current.forEach((letter, index) => {
              if (letter) {
                setTimeout(() => {
                  letter.style.transform = 'translateY(0)';
                  letter.style.opacity = '1';
                }, index * 50);
              }
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const text = "KREATIVKID";

  return (
    <div className=''>
      {/* Top Banner */}
      {/* <div className='w-full h-14 text-zinc-400 bg-zinc-800 flex justify-between px-10 items-center font-rejouice text-xl border-t border-zinc-700'>
        <div className='flex items-center gap-3'>
          <span className='hover:text-white transition-colors cursor-default'>create</span>
          <MdArrowForward className='text-sm'/>
          <span className='hover:text-white transition-colors cursor-default'>express</span>
          <MdArrowForward className='text-sm'/>
          <span className='hover:text-white transition-colors cursor-default'>inspire</span>
        </div>
        <div className='hidden md:flex items-center gap-2 text-sm'>
          <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
          <span>Available for work</span>
        </div>
      </div> */}
  
      {/* Main Footer */}
      <div ref={footerRef} className='bg-zinc-950 h-[94vh] overflow-hidden relative text-white px-6 md:px-10 py-12 md:py-16'>
        
        {/* Compact Content Layout */}
        <div className='grid grid-cols-1 md:grid-cols-14  gap-8 md:gap-6 relative z-10 mb-40'>
        
          {/* Left Column - Heading */}
          <div className='md:col-span-6 font-neue '>
            <h1 className='uppercase leading-tight  text-3xl md:text-4xl lg:text-5xl font-light'>
              Let's create <br/>
              <span className='font-'>something amazing</span>
            </h1>
          </div>

          {/* Right Column - Contact Grid */}
          <div className='md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 font-neue text-zinc-300'>
            
            {/* Email */}
            <div className='group sm:col-span-2'>
              <span className='block text-xs font-bold text-zinc-500 mb-2 tracking-wider'>EMAIL</span>
              <a 
                href="mailto:deepsahil.online@gmail.com" 
                className='text-base md:text-lg hover:text-white transition-colors flex items-center gap-2 group'
              >
                deepsahil.online@gmail.com
                <MdArrowOutward className='opacity-0 group-hover:opacity-100 transition-opacity text-sm'/>
              </a>
            </div>

            {/* Socials */}
            <div>
              <span className='block text-xs font-bold text-zinc-500 mb-2 tracking-wider'>SOCIALS</span>
              <div className='flex flex-col gap-2'>
                <Link to="#" className='hover:text-white transition-colors relative group text-sm md:text-base w-fit'>
                  Instagram
                  <span className='absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full'></span>
                </Link>
                <Link to="#" className='hover:text-white transition-colors relative group text-sm md:text-base w-fit'>
                  Behance
                  <span className='absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full'></span>
                </Link>
                <Link to="#" className='hover:text-white transition-colors relative group text-sm md:text-base w-fit'>
                  Upwork
                  <span className='absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full'></span>
                </Link>
              </div>
            </div>

            {/* Location & Time */}
            <div className='flex flex-col gap-4'>
              <div>
                <span className='block text-xs font-bold text-zinc-500 mb-1 tracking-wider'>LOCATION</span>
                <span className='text-sm md:text-base text-zinc-400'>India</span>
              </div>
              <div>
                <span className='block text-xs font-bold text-zinc-500 mb-1 tracking-wider'>LOCAL TIME</span>
                <span className='text-sm md:text-base text-zinc-400'>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Animated Large Text */}
        <div className='absolute bottom-16 md:bottom-8 left-1/2 ml-2 -translate-x-1/2 pointer-events-none select-none w-full px-4'>
          <h1 className='font-founders uppercase text-[20vw] md:text-[24vw] tracking-wider leading-none text-center whitespace-nowrap'>
            {text.split('').map((letter, index) => (
              <span
                key={index}
                ref={(el) => (letterRefs.current[index] = el)}
                className='inline-block transition-all duration-700 ease-out'
                style={{
                  transform: 'translateY(100%)',
                  opacity: 0,
                  textShadow: '0 0 40px rgba(255,255,255,0.1)',
                  // background: 'linear-gradient(180deg, #ffffff 0%, #52525b 100%)',
                  // WebkitBackgroundClip: 'text',
                  // WebkitTextFillColor: 'transparent',
                  // backgroundClip: 'text',
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Bottom Credits */}
        <div className='absolute bottom-4 left-0 right-0 px-6 md:px-10 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-zinc-600 z-20'>
          <span>© 2024 KreativKid. All rights reserved.</span>
          <span className='hidden sm:block'>Designed & Developed with passion</span>
        </div>
        
      </div>
    </div>
  )
}

export default Footer