import React from 'react'
import {gsap} from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from 'react'

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

const HookSection = () => {
  useEffect(() => {
    gsap.to(".hook-text", {
      x: -7000,
      scrollTrigger: {
        trigger: ".hook-section",
        start: "top top",
        // endTrigger:".featured-section",
        // end: "top top",    
        // markers: true,
        end: "+=4200",
        scrub:true,  
      }
    });
  }, []);
  return (
    <div className='bg-zinc-100 hook-section h-screen text-zinc-950 overflow-hidden '>
        <div className='py-40 pt-60 px-20 font-nb'>
            <div className='hook-text font-semibold text-[10vw] text-nowrap leading-none '>
                This is what happens when imagination doesn’t shuts up
            </div>
        </div>
    </div>
  )
}

export default HookSection