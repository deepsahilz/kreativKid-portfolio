import React, { useEffect, useRef } from 'react'
import { MdArrowOutward } from "react-icons/md";
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
    <div ref={footerRef} className='bg-zinc-950 relative text-white px-6 md:px-10 py-16 md:pt-20 flex flex-col justify-between overflow-hidden'>

      {/* Top section */}
      <div className='grid grid-cols-1 md:grid-cols-14 gap-8 md:gap-6 relative z-10'>

        {/* Left — Heading + animated name */}
        <div className='md:col-span-6 flex flex-col gap-2 text-zinc-500'>
          <p className='font-neue uppercase text-xl tracking-widest  mb-1'>Let's create<br/>something amazing</p>

          {/* Big animated KREATIVKID */}
          <div className='overflow-hidden mt-2'>
            <p className='font-founders uppercase tracking-wide leading-none text-[12vw] md:text-[8vw] text-white flex flex-wrap'>
              {text.split('').map((letter, index) => (
                <span
                  key={index}
                  ref={(el) => (letterRefs.current[index] = el)}
                  className='inline-block transition-all duration-700 ease-out'
                  style={{
                    transform: 'translateY(100%)',
                    opacity: 0,
                  }}
                >
                  {letter}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Right — Contact grid */}
        <div className='md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 font-neue text-zinc-300'>

          {/* Email */}
          <div className='sm:col-span-2'>
            <span className='block text-xs font-bold text-zinc-500 mb-2 tracking-wider'>EMAIL</span>
            <a
              href="mailto:deepsahil.online@gmail.com"
              className='text-base md:text-lg hover:text-white transition-colors inline-flex items-center gap-2 group'
            >
              <span>deepsahil.online@gmail.com</span>
              <MdArrowOutward className='opacity-0 group-hover:opacity-100 transition-opacity text-sm' />
            </a>
          </div>

          {/* Socials */}
          <div className='flex justify-between '>
          <div>
            <span className='block text-xs font-bold text-zinc-500 mb-2 tracking-wider'>SOCIALS</span>
            <div className='flex flex-col gap-2'>
              {['Instagram', 'Behance', 'Upwork'].map((s) => (
                <Link
                  key={s}
                  to="#"
                  className='hover:text-white transition-colors relative group text-sm md:text-base w-fit'
                >
                  {s}
                  <span className='absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full' />
                </Link>
              ))}
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
              <span className='text-sm md:text-base text-zinc-400'>
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className='w-full h-[1px] bg-zinc-800 my-10 relative z-10' />

      {/* Bottom credits */}
      <div className='flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-zinc-600 relative z-10'>
        <span>© 2025 KreativKid. All rights reserved.</span>
        <span className='hidden sm:block'>Designed & Developed with passion</span>
      </div>

    </div>
  )
}

export default Footer