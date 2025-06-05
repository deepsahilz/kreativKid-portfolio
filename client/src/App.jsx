import React, { useEffect } from 'react'
import Homepage from './pages/Homepage'
import About from './pages/About'
import Work from './pages/Work'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Lenis from '@studio-freight/lenis'

const App = () => {

   useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    
    <Routes location={location} key={location.pathname}>
          {/* <Route path="/*" element={<CatGame />} /> */}
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About/>} />
          <Route path="/work" element={<Work/>} />
        </Route>
      </Routes>
  )
}

export default App