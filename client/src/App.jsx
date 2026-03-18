import React, { useEffect } from 'react'
import Homepage from './pages/Homepage'
import About from './pages/About'
import Work from './pages/Work'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  const location = useLocation()

  // ── Lenis smooth scroll ──────────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Connect Lenis to GSAP ticker so they stay in sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()               // ← stop lenis on unmount
      gsap.ticker.remove(lenis.raf) // ← detach from gsap ticker
    }
  }, [])

  // ── Refresh ScrollTrigger on every route change ──────────────────────
  useEffect(() => {
    // Scroll to top first, then let ScrollTrigger recalculate
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="about" element={<About />} />
        <Route path="work" element={<Work />} />
      </Route>
    </Routes>
  )
}

export default App