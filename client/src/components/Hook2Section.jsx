import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"

const Hook2Section = () => {
  const textRef = useRef(null)
  const splitRef = useRef(null)
  const stRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const initSplit = () => {
      if (splitRef.current) splitRef.current.revert()
      if (stRef.current) stRef.current.kill()

      const split = new SplitType(textRef.current, { types: "lines" })
      splitRef.current = split
      const lines = split.lines

      lines.forEach((line) => {
        line.style.backgroundImage =
          "linear-gradient(to right,#ffffff 0%,#ffffff 45%,#3b82f6 48%,#3b82f6 50%,#525252 25%,#525252 100%)"
        line.style.backgroundSize = "220% 100%"
        line.style.backgroundPosition = "100% 0%"
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
          scrub: true,
          onToggle: (self) => { stRef.current = self }
        },
      })
    }

    document.fonts.ready.then(() => {
      const images = textRef.current.querySelectorAll("img")
      const imagePromises = Array.from(images).map(
        (img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((res) => {
                img.onload = res
                img.onerror = res
              })
      )

      Promise.all(imagePromises).then(initSplit)
    })

    const onResize = () => initSplit()
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      if (splitRef.current) splitRef.current.revert()
      if (stRef.current) stRef.current.kill()
    }
  }, [])

  return (
    <div className="min-h-screen bg-black px-6 md:px-12 py-32 flex items-center">
      <h1
        ref={textRef}
        className="text-3xl text-justify md:text-left md:text-[3.2rem] font-nb text-zinc-600"
      >
        Hi people
        <span className="inline-block overflow-visible">
          <img src="/images/extras/cat-flowery.png" className="inline-block w-6 md:w-12 mx-3 -mt-2 md:-mt-5 align-middle transition-transform duration-300 ease-out hover:scale-125 hover:rotate-6 will-change-transform"/>
        </span>
        . Design isn't just something you look at. It catches you, it says something
        <span className="inline-block overflow-visible">
          <img src="/images/extras/spidey.png" className="inline-block w-8 md:w-15 -mt-3 mx-2 md:mx-4 align-middle transition-transform duration-300 ease-out hover:scale-125 hover:-rotate-6 will-change-transform"/>
        </span>.<br className="md:hidden"/>
        I make visuals that do exactly that. Posters, thumbnails, logos, edits,
        <span className="inline-block overflow-visible">
          <img src="/images/extras/take2.png" className="inline-block w-8 md:w-15 mx-3 md:mx-5 -mt-5 align-middle transition-transform duration-300 ease-out hover:scale-125 hover:-rotate-6 will-change-transform"/>
        </span>
        whatever I'm in the mood for, honestly.
        <span className="inline-block overflow-visible">
          <img src="/images/extras/greeky.png" className="inline-block w-9 md:w-16 mx-4 -mt-4 md:-mt-8 align-middle transition-transform duration-300 ease-out hover:scale-125 hover:rotate-12 will-change-transform"/>
        </span>
        Sometimes a random idea I just can't ignore.
        <span className="inline-block overflow-visible">
          <img src="/images/extras/rocket_png.png" className="inline-block w-5 md:w-10 mx-2 md:mx-5 align-middle transition-transform duration-300 ease-out hover:scale-125 hover:rotate-6 will-change-transform"/>
        </span>
        Either way, same process.
        <span className="inline-block overflow-visible">
          <img src="/images/extras/earth_png.png" className="inline-block w-10 md:w-18 mx-3 -mt-2 md:-mt-5 align-middle transition-transform duration-300 ease-out hover:scale-125 hover:rotate-12 will-change-transform"/>
        </span>
      </h1>
    </div>
  )
}

export default Hook2Section