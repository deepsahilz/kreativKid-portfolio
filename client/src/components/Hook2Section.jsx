import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"

const Hook2Section = () => {

  const textRef = useRef(null)

  useEffect(() => {

    gsap.registerPlugin(ScrollTrigger)

    const split = new SplitType(textRef.current, { types: "lines" })
    const lines = split.lines

    lines.forEach((line) => {

      line.style.backgroundImage =
        "linear-gradient(to right,#ffffff 0%,#ffffff 45%,#3b82f6 48%,#3b82f6 52%,#525252 55%,#525252 100%)"

      line.style.backgroundSize = "220% 100%"   // wider sweep
      line.style.backgroundPosition = "100% 0%" // start outside view
      line.style.webkitBackgroundClip = "text"
      line.style.backgroundClip = "text"
      line.style.color = "transparent"

    })

    gsap.to(lines, {
      backgroundPosition: "0% 0%",
      ease: "none",
      stagger: 0.5,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "bottom 30%",
        scrub: true
      }
    })

  }, [])

  return (
    <div className="min-h-screen bg-black px-6 md:px-12 py-32 flex items-center">

      <h1
        ref={textRef}
        className="text-4xl text-justify md:text-left md:text-[3.5rem] font-nb leading-tight mx-auto text-zinc-600"
      >
        I don't always know 
        {/* <img src="/images/extras/cat-flower.png" className="inline-block w-28 mx-2 align-middle"/> */}
        what I'm creating when I start — I just follow the
        feeling, trust the process and let the art reveal itself one pixel at a
        time.
      </h1>

    </div>
  )
}

export default Hook2Section