import React from 'react'
import Navbar from './components/navbar/navbar'
import Slider from './components/slider/slider'
import Home from './components/home/home'
import About from './components/about/about'
import Contactus from './components/contact/contact-us'
import Shop from './components/shop/shop'
import { BrowserRouter, Routes, Route } from 'react-router-dom'



function App () {
  return (
  
      <BrowserRouter>
        <Navbar />
        <Slider />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contactus />} />
        <Route path='/shop' element={<Shop />} />
      </Routes>
      </BrowserRouter>

    
  )
}
export default App
