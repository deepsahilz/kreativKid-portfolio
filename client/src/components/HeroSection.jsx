import React, {  useRef } from 'react'
import {gsap} from "gsap"

const HeroSection = () => {
  
  let isEnabled = false;
  const containerRef = useRef(null);

  const createTrail=(e)=>{
    const createImg =()=>{
      const img = document.createElement("img");
      const collection = Array.from({length:27},(_,i)=>`../src/assets/images/artworks/img (${i+1}).webp`)
      const randomIndex = Math.floor(Math.random()*collection.length);
      // img.src = "../src/assets/images/shabals/1.jpg";
      img.src = collection[randomIndex];
      img.className = "pointer-events-none w-70 absolute";
      img.style.left = `${e.clientX}px`
      img.style.top = `${e.clientY}px`
      containerRef.current.appendChild(img);

      gsap.set(img,{
        autoAlpha:1,
        yPercent:100,
        rotate:0,
        
      })
      
      const t1 = gsap.timeline()

      t1
      .to(img,{
        duration:1.5,
        yPercent:0,
        rotate:10,
        ease:"expo.out",
      })
      .to(img,{
        duration:1,
        autoAlpha:0,
        rotate:0,
        yPercent:100,
        ease:'expo.inOut',
        onComplete:()=>img.remove(),
      })
   
    }

    if(!isEnabled){
      isEnabled = true
      setTimeout(()=>(isEnabled=false),200)
      createImg()
    }
  }


  return (
    <div className='relative w-full overflow-hidden bg-zinc-950 h-[100vh] font-nb text-white px-6  md:px-10'>
      <div ref={containerRef} className="image-trail top-0 left-0 absolute w-full h-full" onMouseMove={createTrail}>

      </div>
      {/* <img src =  */}
      
      {/* <div className='absolute z-20 pointer-events-none top-[50%] left-[50%] -translate-[50%]'> */}
      <div className='absolute  flex  justify-between items-end z-20 pointer-events-none bottom-7 left-6 md:left-10 md:right-10 right-6  '>
          {/* <h1 className='text-[9vw] leading-none  uppercase '>
              Art<br/> with<br/> each<br/> move
          </h1>                 */}
          <h1 className='font-founders md:text-[12rem] text-[23vw] leading-none'>KREATIVKID*</h1>
          {/* <h1 className='font-rejouice font-bold text-[10rem] -mb-7 tracking-wide leading-none'>KREATIVKID*</h1> */}
          <div className='text-white items-center hidden md:flex gap-2'>
            <span>ART </span>
            <span className='mb-0.5'>&bull; </span>
            <span>DESIGN </span>
            <span className='mb-0.5'>&bull; </span>
            <span>UI UX</span>
          </div>
      </div>
    </div>
  )
}

export default HeroSection