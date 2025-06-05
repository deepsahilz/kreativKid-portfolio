import React, {  useRef } from 'react'
import {gsap} from "gsap"

const HeroSection = () => {
  
  let isEnabled = false;
  const containerRef = useRef(null);

  const createTrail=(e)=>{
    const createImg =()=>{
      const img = document.createElement("img");
      // const collection = Array.from({length:30},(_,i)=>`../src/assets/images/shabals/${i+1}.jpg`)
      // const randomIndex = Math.floor(Math.random()*collection.length);
      img.src = "../src/assets/images/shabals/1.jpg";
      // img.src = collection[randomIndex];
      img.className = "pointer-events-none w-60 absolute";
      img.style.left = `${e.clientX}px`
      img.style.top = `${e.clientY}px`
      containerRef.current.appendChild(img);
      const randomRotate = Math.random()*10;

      gsap.set(img,{
        autoAlpha:1,
        yPercent:100,
        rotate:0,
      })
      
      const t1 = gsap.timeline()

      t1.to(img,{
        duration:1.2,
        yPercent:0,
        rotate:10,
        // rotate:randomRotate,
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
      setTimeout(()=>(isEnabled=false),160)
      createImg()
    }
  }


  return (
    <div className='relative w-full overflow-hidden bg-zinc-950 h-[100vh] font-nb text-white px-20'>
      <div ref={containerRef} className="image-trail top-0 left-0 absolute w-full h-full" onMouseMove={createTrail}>

      </div>
      {/* <img src =  */}
      
      {/* <div className='absolute z-20 pointer-events-none top-[50%] left-[50%] -translate-[50%]'> */}
      <div className='absolute z-20 pointer-events-none top-[50%]  -translate-y-[50%]'>
          <h1 className='text-[15vw] leading-none uppercase font-founders '>
              Art with each move
          </h1>                
      </div>
    </div>
  )
}

export default HeroSection