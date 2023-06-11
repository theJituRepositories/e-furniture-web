import React, { useState } from 'react'
import Navbar from './components/pages/navbar/navbar'
import Slider from './components/slider/slider'
import Home from './components/pages/home/home'
import About from './components/pages/about/about'
import Contactus from './components/pages/contact/contact-us'
import Shop from './components/pages/shop/shop'
import Signup from './components/pages/signup/signup'
import SliderContext from './components/slider/sliderContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App () {
  const [isSliderConstrained, setIsSliderConstrained] = useState(false)
  return (
    <SliderContext.Provider
      value={{ isSliderConstrained, setIsSliderConstrained }}
    >
      <BrowserRouter>
        <Navbar />
        <Slider />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contactus />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/shop' element={<Shop />} />
        </Routes>
      </BrowserRouter>
    </SliderContext.Provider>
  )
}
export default App
