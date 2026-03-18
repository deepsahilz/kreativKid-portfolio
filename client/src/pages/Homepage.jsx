import HeroSection from '../components/HeroSection'
import FeaturedWork from '../components/FeaturedWork'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from 'react'
import CallHook from '../components/CallHook'
import Services2 from '../components/Services2'
import Hook2Section from '../components/Hook2Section'

gsap.registerPlugin(ScrollTrigger)

const Homepage = () => {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hook-section", {
        duration: 2,
        scrollTrigger: {
          trigger: ".hook-section",
          start: "top top",
          endTrigger: ".featured-section",
          end: "top top",
          pin: true,
        }
      })
    }, pageRef) // scoped to this page only

    return () => ctx.revert() // ← only kills THIS page's ScrollTriggers
  }, [])

  return (
    <div ref={pageRef}>
      <HeroSection />
      <Hook2Section />
      <Services2 />
      <CallHook />
    </div>
  )
}

export default Homepage