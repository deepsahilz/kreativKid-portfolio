import React, { useState, useRef, useEffect, useCallback } from "react"
import gsap from "gsap"

const services = [
  {
    num: '01',
    title: 'Photoshop &\nConcept Art',
    desc: 'Photo manipulation, surreal compositing & original concept artwork. My most personal work — where imagination has no ceiling.',
    tag: 'Fan favourite ★',
    pills: ['Manipulation', 'Compositing', 'Concept art'],
    images: ['img (10)', 'img (15)', 'img (6)'],
    accent: '#c8b8a2',
  },
  {
    num: '02',
    title: 'UI / UX\nDesign',
    desc: 'Interfaces that feel before they function. Clean, considered layouts — from wireframes to polished high-fidelity Figma files.',
    tag: 'Web & mobile',
    pills: ['Figma', 'Wireframing', 'Prototyping'],
    images: ['img (13)', 'img (4)', 'img (9)'],
    accent: '#a2b8c8',
  },
  {
    num: '03',
    title: 'Poster\nDesign',
    desc: 'Typography-led poster work with strong visual hierarchy. Each piece is built around one bold, undeniable idea.',
    tag: 'Print & digital',
    pills: ['Typography', 'Editorial', 'Print-ready'],
    images: ['img (17)', 'img (25)', 'img (12)'],
    accent: '#b8c8a2',
  },
  {
    num: '04',
    title: 'Photoshop\nEdits',
    desc: 'Precise, clean photo edits — retouching, colour grading, and enhancement. Subtle work that makes images look exactly how they should feel.',
    tag: 'Photos & portraits',
    pills: ['Retouching', 'Colour grade', 'Enhancement'],
    images: ['img (6)', 'img (7)', 'img (8)'],
    accent: '#c8a2b8',
  },
]

const GAP = 12        // px gap between cards
const ACTIVE_RATIO = 0.38   // active card takes 38% of total width (was 3.4x before — now much less aggressive)
const INACTIVE_RATIO = (1 - ACTIVE_RATIO) / (services.length - 1)

// Computes pixel widths for each card given container width and which is active
function computeWidths(containerW, activeIndex) {
  const totalGap = GAP * (services.length - 1)
  const available = containerW - totalGap
  return services.map((_, i) =>
    i === activeIndex
      ? available * ACTIVE_RATIO
      : available * INACTIVE_RATIO
  )
}

const Services2 = () => {
  const [active, setActive] = useState(0)
  const containerRef = useRef(null)
  const cardRefs     = useRef([])
  const expandedRefs = useRef([])
  const pillsRefs    = useRef([]) // array of arrays
  const imageRefs    = useRef([]) // array of arrays
  const dotRefs      = useRef([])
  const activeRef    = useRef(active) // track without re-render

  // ── resize observer to recalculate widths on container size change ──────
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      if (!containerRef.current) return
      const cw = containerRef.current.offsetWidth
      const widths = computeWidths(cw, activeRef.current)
      cardRefs.current.forEach((card, i) => {
        if (card) gsap.set(card, { width: widths[i] })
      })
    })
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // ── set initial widths once ──────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return
    const cw = containerRef.current.offsetWidth
    const widths = computeWidths(cw, active)
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      gsap.set(card, { width: widths[i] })
    })
    // hide all expanded blocks initially except active
    expandedRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.set(el, { opacity: i === active ? 1 : 0, display: i === active ? "flex" : "none" })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── main animation on active change ─────────────────────────────────────
  const prevActive = useRef(active)

  useEffect(() => {
    if (!containerRef.current) return
    const prev = prevActive.current
    prevActive.current = active
    activeRef.current = active

    const cw = containerRef.current.offsetWidth
    const widths = computeWidths(cw, active)

    // 1. Animate ALL card widths simultaneously — this is the key smooth effect
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      gsap.to(card, {
        width: widths[i],
        duration: 0.65,
        ease: "expo.inOut",
        overwrite: true,
      })
    })

    // 2. Hide previously active expanded content quickly
    if (prev !== active && expandedRefs.current[prev]) {
      gsap.to(expandedRefs.current[prev], {
        opacity: 0,
        y: 6,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
          if (expandedRefs.current[prev])
            gsap.set(expandedRefs.current[prev], { display: "none" })
        },
      })
    }

    // 3. Show new active expanded content — delayed slightly so card has opened first
    if (expandedRefs.current[active]) {
      gsap.set(expandedRefs.current[active], { display: "flex", y: 10, opacity: 0 })
      gsap.to(expandedRefs.current[active], {
        opacity: 1,
        y: 0,
        duration: 0.38,
        delay: 0.28,
        ease: "power3.out",
      })
    }

    // 4. Pills stagger
    const pills = pillsRefs.current[active]
    if (pills?.length) {
      gsap.fromTo(pills.filter(Boolean),
        { opacity: 0, y: 7, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.3, delay: 0.36, ease: "back.out(1.4)" }
      )
    }

    // 5. Images stagger
    const imgs = imageRefs.current[active]
    if (imgs?.length) {
      gsap.fromTo(imgs.filter(Boolean),
        { opacity: 0, y: 14, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.42, delay: 0.38, ease: "expo.out" }
      )
    }

    // 6. Dot indicator
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return
      gsap.to(dot, {
        width: i === active ? 22 : 8,
        backgroundColor: i === active ? "#27272a" : "#d4d4d8",
        duration: 0.4,
        ease: "expo.inOut",
      })
    })
  }, [active])

  const handleMouseEnter = useCallback((i) => {
    setActive(i)
  }, [])

  return (
    <section
      className="w-full py-20 px-6 md:px-10 font-nb text-zinc-950"
      style={{ background: "#f5f4f0" }}
    >
      {/* header */}
      <div className="flex justify-between items-end border-b border-zinc-300 pb-8 mb-14">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-400 uppercase mb-3">
            What I offer
          </p>
          <h1 className="font-founders text-[clamp(3rem,10vw,7rem)] leading-[0.88] tracking-[-0.04em] text-zinc-900 uppercase">
            Services
          </h1>
        </div>
        <div className="text-right font-mono text-[11px] tracking-[0.1em] text-zinc-400 leading-[2]">
          <span className="block">04 disciplines</span>
          <span className="block">Available for work</span>
        </div>
      </div>

      {/* cards row */}
      <div
        ref={containerRef}
        className="flex"
        style={{ height: "420px", gap: `${GAP}px` }}
      >
        {services.map((service, i) => (
          <div
            key={i}
            ref={el => cardRefs.current[i] = el}
            onMouseEnter={() => handleMouseEnter(i)}
            className="relative rounded-2xl border border-[#e0ddd7] bg-white overflow-hidden cursor-pointer flex-shrink-0"
            style={{ width: 0 /* set by gsap on mount */ }}
          >
            {/* accent top line */}
            <div
              className="absolute top-0 left-0 h-[2.5px] w-full"
              style={{
                background: service.accent,
                opacity: active === i ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />

            <div className="h-full p-7 flex flex-col justify-between overflow-hidden">

              {/* number + title — always visible */}
              <div>
                <span className="block font-mono text-[10px] tracking-[0.22em] text-zinc-400 mb-[10px] whitespace-nowrap">
                  {service.num} ——
                </span>
                <h2
                  className="font-founders text-[clamp(1.5rem,2.2vw,2.6rem)] leading-[0.92] tracking-[-0.03em] text-zinc-900"
                  // style={{ whiteSpace: "pre-line" }}
                >
                  {service.title}
                </h2>
              </div>

              {/* expanded content */}
              <div
                ref={el => expandedRefs.current[i] = el}
                className="flex flex-col gap-[12px]"
                style={{ display: "none" }}
              >
                <p className="font-mono text-[11px] leading-[1.85] text-[#888]">
                  {service.desc}
                </p>

                <div className="flex gap-[8px]" style={{ width: "100%" }}>
                  {service.images.map((img, j) => (
                    <div
                      key={j}
                      ref={el => {
                        if (!imageRefs.current[i]) imageRefs.current[i] = []
                        imageRefs.current[i][j] = el
                      }}
                      className="rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100"
                      style={{ flex: 1, height: "180px" }}
                    >
                      <img
                        src={`/images/artworks/${img}.webp`}
                        className="w-full h-full object-cover"
                        alt=""
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>

      {/* dot indicators */}
      <div className="flex justify-center mt-10 gap-[7px] items-center">
        {services.map((_, i) => (
          <button
            key={i}
            ref={el => dotRefs.current[i] = el}
            onClick={() => setActive(i)}
            aria-label={`View service ${i + 1}`}
            className="h-2 rounded-full"
            style={{ width: 8, backgroundColor: "#d4d4d8" }}
          />
        ))}
      </div>
    </section>
  )
}

export default Services2