import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Properties from './pages/Properties'
import About from './pages/About'
import Signup from './pages/Signup'
import Singin from './pages/Singin'


function Layout() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/properties' element={<Properties/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/sign-up' element={<Signup/>}/>
    <Route path='sing-in' element={<Singin/>}/>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default Layout
