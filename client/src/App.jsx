import React from 'react'
import Homepage from './pages/Homepage'
import About from './pages/About'
import Work from './pages/Work'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'

const App = () => {
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