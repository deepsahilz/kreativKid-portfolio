import React, { useEffect, useRef } from 'react'
import {gsap} from "gsap"

const HeroSection = () => {
  useEffect(()=>(
    console.log("hi")
  ),[])
  

  const containerRef = useRef(null);
  const createTrail=(e)=>{
    const img = document.createElement("img");
    img.src = "../src/assets/images/1.jpg";
    img.className = "pointer-events-none w-40 absolute";
    img.style.left = `${e.clientX}px`
    img.style.top = `${e.clientY}px`
    containerRef.current.appendChild(img);

    gsap.to("img",{
      opacity:0,
      scale:1.5,
      duration:0.8,
      ease:"power2.out",
      onComplete:()=>img.remove(),
    })
  }


  return (
    <div className='relative bg-zinc-950 h-[100vh] font-nb text-white px-20'>
      <div ref={containerRef} className="image-trail top-0 left-0 absolute w-full h-full" onMouseMove={createTrail}>

      </div>
      {/* <img src =  */}
      
      <div className='absolute z-20 pointer-events-none top-[50%] left-[50%] -translate-[50%]'>
          <h1 className='text-[17vw]  font-semibold leading-none uppercase font-founders '>
              KreativKid 
          </h1>                
      </div>
    </div>
  )
}

export default HeroSection