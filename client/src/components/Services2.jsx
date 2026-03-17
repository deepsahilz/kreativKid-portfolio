import React, { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    title: 'Concept Art & Photo Editing',
    desc: 'Photo manipulation, surreal compositing & original concept artwork. My most personal work — where imagination has no ceiling.',
    accent: '#c8b8a2',
    label: 'Fan favourite ★',
    from: { x: -220, y: 60, rotation: -8, opacity: 0 },
    mobileFrom: { x: -300, y: 0, rotation: -8, opacity: 0 },
  },
  {
    num: '02',
    title: 'Thumbnail \nDesigns',
    desc: 'Interfaces that feel before they function. Clean layouts — from wireframes to polished high-fidelity Figma files.',
    accent: '#a2b8c8',
    label: 'Web & mobile',
    from: { x: 0, y: 260, rotation: 5, opacity: 0 },
    mobileFrom: { x: 0, y: 300, rotation: 5, opacity: 0 },
  },
  {
    num: '03',
    title: 'Poster\nDesigns',
    desc: 'Typography-led poster work with strong visual hierarchy. Each piece built around one bold, undeniable idea.',
    accent: '#b8c8a2',
    label: 'Print & digital',
    from: { x: 0, y: -260, rotation: -5, opacity: 0 },
    mobileFrom: { x: 0, y: -300, rotation: -5, opacity: 0 },
  },
  {
    num: '04',
    title: 'Social media \n content design',
    desc: 'Precise photo edits — retouching, colour grading, enhancement. Subtle work that makes images feel exactly right.',
    accent: '#c8a2b8',
    label: 'Photos & portraits',
    from: { x: 220, y: 60, rotation: 8, opacity: 0 },
    mobileFrom: { x: 300, y: 0, rotation: 8, opacity: 0 },
  },
]

const CARD_HEIGHT = 360

const ServiceCard = ({ s }) => {
  const innerRef = useRef(null)
  const glowRef  = useRef(null)

  const handleMouseMove = (e) => {
    const rect = innerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    gsap.to(innerRef.current, {
      rotateX: -y * 8, rotateY: x * 10,
      duration: 0.35, ease: "power2.out", transformPerspective: 800,
    })
    gsap.to(glowRef.current, {
      x: (e.clientX - rect.left) - rect.width / 2,
      y: (e.clientY - rect.top)  - rect.height / 2,
      duration: 0.4, ease: "power2.out",
    })
  }

  const handleMouseEnter = () => gsap.to(glowRef.current, { opacity: 1, duration: 0.35 })

  const handleMouseLeave = () => {
    gsap.to(innerRef.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "elastic.out(1, 0.55)" })
    gsap.to(glowRef.current, { opacity: 0, duration: 0.4 })
  }

  return (
    <div
      ref={innerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl overflow-hidden bg-zinc-950 flex flex-col justify-between p-7 md:p-8 cursor-pointer w-full"
      style={{
        border: "1px solid #2a2a28",
        height: `${CARD_HEIGHT}px`,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <div ref={glowRef} className="absolute pointer-events-none" style={{
        width: "280px", height: "280px", borderRadius: "50%",
        background: `radial-gradient(circle, ${s.accent}22 0%, transparent 70%)`,
        opacity: 0, transform: "translate(-50%, -50%)", left: "50%", top: "50%", zIndex: 0,
      }} />

      <div className="flex items-start justify-between z-10">
        <span className="font-mono text-[10px] text-zinc-600">{s.num} ——</span>
        <span className="font-mono text-[9px] uppercase" style={{ color: s.accent, opacity: 0.7 }}>
          {s.label}
        </span>
      </div>

      <div className="z-10 flex flex-col gap-3">
        <h2 className="font-nb leading-[0.9] text-white"
          style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", whiteSpace: "pre-line" }}>
          {s.title}
        </h2>
        <p className="font-neue text-[15px] leading-[1.8] text-zinc-500">{s.desc}</p>
      </div>
    </div>
  )
}

const Services2 = () => {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const lineRef    = useRef(null)
  const gridRef    = useRef(null)
  const cardRefs   = useRef([])

  useEffect(() => {
    const cards = cardRefs.current
    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {

      // ── Initial card positions ──────────────────────────────────────────
      cards.forEach((card, i) => {
        const fromPos = isMobile ? services[i].mobileFrom : services[i].from
        gsap.set(card, { ...fromPos, transformOrigin: "center center" })
      })

      // ── Header reveal ───────────────────────────────────────────────────
      const h1 = headerRef.current.querySelector("h1")
      const h1Height = h1.offsetHeight
      gsap.set(h1, { y: h1Height + 10 })
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      })
        .to(h1, { y: 0, duration: 0.8, ease: "power3.out" })
        .to(lineRef.current, { scaleX: 1, duration: 0.8, ease: "expo.out" }, 0.15)

      // ── Desktop: all cards fly in together, scrubbed ────────────────────
      if (!isMobile) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            snap: true,
            end: "+=180%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        })
        cards.forEach((card, i) => {
          tl.to(card,
            { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.3, ease: "back.out(1.2)" },
            0.1 + i * 0.2
          )
        })
      }

      // ── Mobile: cards stacked, deal one by one ──────────────────────────
      if (isMobile) {
        // Pin for enough scroll to deal all 4 cards
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${services.length * 120}%`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        })

        cards.forEach((card, i) => {
          const slot = i / services.length
          const dur  = 1 / services.length * 0.6

          // Fly in and land
          tl.to(card,
            { x: 0, y: 0, rotation: 0, opacity: 1, duration: dur, ease: "back.out(1.2)" },
            slot
          )

          // When this card lands, nudge all previous cards slightly
          // so their edges peek out — making the stack obvious
          if (i > 0) {
            cards.slice(0, i).forEach((prev, j) => {
              const depth = i - j                          // how deep in the stack
              tl.to(prev,
                {
                  y: depth * 10,                           // shift down 10px per layer
                  rotation: depth % 2 === 0 ? -2 : 2,     // alternate slight tilt each layer
                  scale: 1 - depth * 0.02,                 // very subtle shrink for depth
                  duration: dur * 0.5,
                  ease: "power2.out",
                },
                slot + dur * 0.5                           // nudge as new card finishes landing
              )
            })
          }
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-[100%] overflow-hidden py-14 pb-40 px-6 md:px-10 font-nb flex flex-col justify-center"
      style={{ background: "#000" }}
    >
      {/* Header */}
      <div ref={headerRef} className="flex justify-between items-end pb-8 mb-14" style={{ position: "relative" }}>
        <div style={{ overflow: "hidden", paddingBottom: "0.15em" }}>
          <h1 className="font-founders text-[clamp(3rem,10vw,7rem)] leading-[0.95] mt-10 text-white uppercase" style={{ display: "block" }}>
            Services
          </h1>
        </div>
        <div ref={lineRef} className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: "#222220" }} />
      </div>

      {/* Desktop grid / Mobile stacked */}
      <div
        ref={gridRef}
        className="md:grid md:grid-cols-4 md:gap-4"
        style={{ position: "relative" }}
      >
        {services.map((s, i) => (
          <div
            key={i}
            ref={el => cardRefs.current[i] = el}
            className="md:relative md:static"
            style={{
              willChange: "transform, opacity",
              // Mobile only: absolute stack all at same position
              position: window.innerWidth < 768 ? "absolute" : undefined,
              top: 0, left: 0,
              width: window.innerWidth < 768 ? "100%" : undefined,
            }}
          >
            <ServiceCard s={s} />
          </div>
        ))}

        {/* Spacer so the section has height on mobile (cards are absolute) */}
        <div className="block md:hidden" style={{ height: `${CARD_HEIGHT}px` }} />
      </div>
    </section>
  )
}

export default Services2