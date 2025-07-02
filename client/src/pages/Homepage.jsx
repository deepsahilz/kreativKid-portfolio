import HeroSection from '../components/HeroSection'
// import HookSection from '../components/HookSection'
import FeaturedWork from '../components/FeaturedWork'
// import Services from '../components/Services'
import {gsap} from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from 'react'
import CallHook from '../components/CallHook'
import Services2 from '../components/Services2'
import Hook2Section from '../components/Hook2Section'

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {

  useEffect(() => {
    gsap.to(".hook-section", {
      // y: 100,
      duration: 2,
      scrollTrigger: {
        trigger: ".hook-section",
        start: "top top",
        endTrigger:".featured-section",
        end: "top top",     
        pin: true,
        // markers: true,
        // scrub:true,  
      }
    });
  }, []);
  return (

    <>
        <HeroSection/>
        <FeaturedWork/>
        <Hook2Section/>
        {/* <HookSection/> */}
        {/* <div className='h-screen w-full'></div> */}
        {/* <Services/> */}
        <Services2/>
        <CallHook/>
    </>
  )
}

export default Homepage