import React, { useRef, useEffect } from 'react'
import { MdArrowOutward } from "react-icons/md";
import { gsap } from "gsap";
import showreel from "../assets/videos/11904044_640_360_25fps.mp4"

const FeaturedWork = () => {

  const sectionRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {

  const section = sectionRef.current;
  const cursor = cursorRef.current;

  if (!section || !cursor) return;

  let isInside = false;
  let lastMouse = { x: 0, y: 0 };

  // Smooth follow
  const xTo = gsap.quickTo(cursor, "x", {
    duration: 0.45,
    ease: "back.out(1.7)"
  });

  const yTo = gsap.quickTo(cursor, "y", {
    duration: 0.45,
    ease: "back.out(1.7)"
  });

  const moveHandler = (e) => {

    lastMouse.x = e.clientX;
    lastMouse.y = e.clientY;

    xTo(e.clientX);
    yTo(e.clientY);

    const rect = section.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const edgePadding = 120;

    const nearEdge =
      x < edgePadding ||
      y < edgePadding ||
      x > rect.width - edgePadding ||
      y > rect.height - edgePadding;

    gsap.to(cursor, {
      autoAlpha: nearEdge ? 0 : 1,
      scale: nearEdge ? 0.5 : 1,
      duration: 0.25,
      ease: "power2.out"
    });
  };

  const enterHandler = () => {
    isInside = true;

    gsap.to(cursor, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.25,
      ease: "power2.out"
    });
  };

  const leaveHandler = () => {
    isInside = false;

    gsap.to(cursor, {
      scale: 0,
      autoAlpha: 0,
      duration: 0.25,
      ease: "power2.out"
    });
  };

  // 🔥 Scroll fix — hide cursor when section moves away from mouse
  const scrollHandler = () => {

    const rect = section.getBoundingClientRect();

    const insideNow =
      lastMouse.x >= rect.left &&
      lastMouse.x <= rect.right &&
      lastMouse.y >= rect.top &&
      lastMouse.y <= rect.bottom;

    if (!insideNow) {
      isInside = false;

      gsap.to(cursor, {
        autoAlpha: 0,
        scale: 0,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  window.addEventListener("scroll", scrollHandler, { passive: true });
  section.addEventListener("mousemove", moveHandler);
  section.addEventListener("mouseenter", enterHandler);
  section.addEventListener("mouseleave", leaveHandler);

  return () => {
    window.removeEventListener("scroll", scrollHandler);
    section.removeEventListener("mousemove", moveHandler);
    section.removeEventListener("mouseenter", enterHandler);
    section.removeEventListener("mouseleave", leaveHandler);
  };

}, []);


  return (
    <div ref={sectionRef} className='featured-section overflow-hidden relative w-full h-screen bg-zinc-950 font-nb text-white'>

      {/* <div className='h-full w-full '>
        <div className='grid w-[120vw] grid-cols-7 gap-2 -translate-[10rem] rotate-15'>
        {Array.from({length:25},(_,i)=>(
                <div className=' group w-full h-[24rem] relative overflow-hidden '>
                  <div className='absolute w-full h-full opacity-0 z-[10] transition-opacity bg-purple-500 group-hover:opacity-50'></div>
                  <img className='h-full w-full  object-cover transition-transform' src = {`/images/artworks/img (${i+1}).webp`}/>
                </div>
              ))
}             
            </div>
      </div> */}

      <div className='w-full h-full flex justify-center'>
        {/* <video className=' h-full rounded-md' autoPlay muted loop src='../src/assets/videos/ORBIT-5-01-LITE.mp4'/> */}
        {/* <video className=' h-full rounded-md' autoPlay muted loop src='../src/assets/videos/Showcase.mp4'/> */}
        <video className=' h-full w-full object-cover ' autoPlay muted loop src={showreel}/>
      </div>

      <div className='absolute top-0 pointer-events-none w-full h-full bg-black/20 '></div>

      {/* Cursor Follower */}
      <div
        ref={cursorRef}
        className='cursor-pointer border rounded-full border-white fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50'
        style={{ opacity: 0, transform: "scale(0)" }}
      >
        <button className='bg-white/40 backdrop-blur-md flex font-bold group items-center gap-2 rounded-full w-30 justify-center h-30 p-5 text-zinc-900 uppercase  shadow-lg'>
          View Gallery
          {/* <MdArrowOutward className='text-xl group-hover:rotate-45 transition-transform'/> */}
        </button>
      </div>

    </div>
  )
}

export default FeaturedWork
