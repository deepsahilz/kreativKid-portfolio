import React, { useRef, useState } from 'react'
import { MdArrowOutward } from "react-icons/md";
import {gsap} from "gsap"

const Services2 = () => {
  const containerRef = useRef(null);
  const previewRef = useRef(null);
  const intervalRef = useRef(null);
  const [currentImg, setCurrentImg] = useState();

  const services = [
    {
        title:"photoshop edits/concept art",
        desc:"This one is my personal favourite",
        images:["img (10)","img (15)","img (6)","img (22)"],
    },
    {
        title:"UI/UX designing",
        desc:"",
        images:["img (13)","img (4)","img (9)"],
    },
    {
        title:"Poster designs",
        desc:"This one is my personal favourite",
        images:["img (17)","img (25)","img (12)"],
    },
    {
        title:"photoshop edits",
        desc:"This one is my personal favourite",
        images:["img (6)","img (7)","img (8)"],
    }
  ]

  // Animate preview box on enter
  const showPreview = (images) => {
  if (intervalRef.current) clearInterval(intervalRef.current);

  // Start fresh image rotation
  setCurrentImg(images[0]);

  let i = 1;
  intervalRef.current = setInterval(() => {
    setCurrentImg(images[i % images.length]);
    i++;
  }, 1500);

  gsap.to(previewRef.current, {
    rotate:4,
    xPercent:0,
    scale: 1,
    transformOrigin:"0 25%",
    duration: 0.3,
    ease: "power2.out",
  });
};

  // Animate preview box on leave
  const hidePreview = () => {
  clearInterval(intervalRef.current); // ✅ Stop looping the images
  gsap.to(previewRef.current, {
    scale: 0,
    duration: 0.3,
    transformOrigin: "0 25%",
    ease: "power2.out"
    
  });
};


  // Track mouse movement
  const movePreview = (e) => {
    gsap.set(previewRef.current, {
      x: e.clientX +20 ,
      y: `${e.clientY - 80}` +"px"
    });
  };

  return (
    <div className='bg-zinc-50 relative text-zinc-950 py-20  w-full '>
        <div className=' w-full h-full fixed  top-0 left-0 pointer-events-none' ref={containerRef}>
            <div ref={previewRef} 
                className='top-0 left-0 previewBox absolute w-80 overflow-hidden h-90 bg-zinc-700 scale-0 rounded-lg pointer-events-none'>
                    <img className='previewImg w-full h-full object-cover transition-opacity opacity-100' src={`../src/assets/images/artworks/${currentImg}.webp`}/>
            </div>
        </div>
        
        <div className=' w-full h-full ' onMouseMove={movePreview}>
            <h1 className='font-founders border-b border-zinc-500 py-10 text-5xl md:text-8xl uppercase px-6  md:px-10'>What else i do</h1>
            

            <div className='text-3xl border-zinc-400 font-nb'  
            // onMouseEnter={showPreview} 
            onMouseLeave={hidePreview} 
            >
                {services.map((item,idx)=>(
                    <div
                    onMouseEnter={()=>showPreview(item.images)} 
                    key={idx}  
                    className='border-b flex hover:bg-zinc-200 transition-colors p-6 md:p-10 items-center justify-between border-zinc-500 '>
                    <div>
                        <h2 className='text-lg md:text-3xl capitalize'>{item.title}</h2>
                        <p className='text-base'>{item.desc}</p>
                    </div>
                    <div className='p-4 border rounded-full'><MdArrowOutward/></div>
                </div>
                ))}
            </div>

        </div>
    </div>
  )
}

export default Services2