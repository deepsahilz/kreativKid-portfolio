import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const CallHook = () => {
  const boxRef = useRef(null)
  const dotBarRef = useRef(null)
  const dot1Ref = useRef(null)
  const dot2Ref = useRef(null)
  const sectionRef = useRef(null)

  const isDesktop = () => window.matchMedia('(min-width: 768px)').matches

  const stretchBox = () => {
    if (!isDesktop()) return
    gsap.to(boxRef.current, { width: 170, duration: 0.25, ease: 'power2.out' })
  }

  const hideBox = () => {
    if (!isDesktop()) return
    gsap.to(boxRef.current, { width: 0, duration: 0.2, ease: 'power2.in' })
  }

  const trackDots = (e) => {
    if (!dotBarRef.current || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const rawY = e.clientY - rect.top
    const clamped = Math.max(40, Math.min(rawY, rect.height - 40))
    gsap.to(dotBarRef.current, {
      top: clamped,
      duration: 0.45,
      ease: 'power2.out',
    })
  }

  const shakeDots = () => {
    gsap.to(dotBarRef.current, {
      paddingLeft: 80,
      paddingRight: 80,
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to([dot1Ref.current, dot2Ref.current], {
      rotate: 405,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const resetDots = () => {
    const centerY = sectionRef.current
      ? sectionRef.current.getBoundingClientRect().height / 2
      : window.innerHeight / 2
    gsap.to(dotBarRef.current, {
      paddingLeft: 40,
      paddingRight: 40,
      top: centerY,
      duration: 0.5,
      ease: 'power2.out',
    })
    gsap.to([dot1Ref.current, dot2Ref.current], {
      rotate: 45,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  useEffect(() => {
    // dotBar: set initial top in px
    if (dotBarRef.current && sectionRef.current) {
      const h = sectionRef.current.getBoundingClientRect().height
      gsap.set(dotBarRef.current, { top: h / 2 })
    }


    return () => {
      gsap.killTweensOf([
        boxRef.current,
        dotBarRef.current,
        dot1Ref.current,
        dot2Ref.current,
      ])
    }
  }, [])

  return (
    <div ref={sectionRef} className="bg-zinc-950 h-screen relative overflow-hidden">
      <div className="w-full h-full relative">

        {/* Text block — hover zone */}
        <div
          onMouseEnter={() => { stretchBox(); shakeDots() }}
          onMouseLeave={() => { hideBox(); resetDots() }}
          onMouseMove={trackDots}
          className="text-[5rem] md:text-[12rem] text-center w-full py-20 z-10 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] font-founders leading-none uppercase text-zinc-100"
        >
          <div className="flex pointer-events-none flex-col items-center">

            <div className="md:text-nowrap md:leading-none leading-tight">
              Let&rsquo;s build
            </div>

            <div className="flex flex-col text-blue-500  sm:flex-row items-center sm:items-end gap-5 -mt-2 md:-mt-10">
              <span className="tracking-wide md:tracking-normal">together</span>

              {/* Box — inline style width: GSAP overrides on desktop, stays 170 on mobile */}
              <div
                ref={boxRef}
                // className="w-[170px] md:w-0 h-24 md:h-30 flex justify-center overflow-hidden bg-blue-500 rounded-lg sm:mb-6 flex-shrink-0"
                className="w-0 h-30 hidden md:flex justify-center overflow-hidden bg-blue-500 rounded-lg sm:mb-6 flex-shrink-0"
              >
                <img
                  className="min-w-[12rem] h-auto object-cover"
                  src="/images/artworks2/img13.webp"
                  alt=""
                />
              </div>
            </div>

            <p className="text-base md:text-lg mt-10 md:mt-2 font-nb capitalize text-zinc-500">
              let's talk. let's build.<br className="md:hidden"/> let's make it happen.
            </p>

          </div>
        </div>

        {/* Dot bar — desktop only */}
        <div
          ref={dotBarRef}
          style={{ paddingLeft: 40, paddingRight: 40 }}
          className="hidden lg:flex absolute w-full items-center justify-between pointer-events-none z-0"
        >
          <div className="flex gap-5 items-center">
            <div ref={dot1Ref} className="rotate-45 w-5 h-5 bg-zinc-100" />
            <div className="bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 rounded-md uppercase py-1 text-sm">
              art
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <div className="bg-zinc-800 text-zinc-300 px-3 border border-zinc-600 rounded-md uppercase py-1 text-sm">
              design
            </div>
            <div ref={dot2Ref} className="rotate-45 w-5 h-5 bg-zinc-100" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default CallHook