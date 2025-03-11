import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Properties from './pages/Properties'
import About from './pages/About'
import Signup from './pages/Signup'
import Singin from './pages/Singin'
import Header from './components/Header'


function Layout() {
  return (
   <>
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/properties' element={<Properties/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/sign-up' element={<Signup/>}/>
    <Route path='sign-in' element={<Singin/>}/>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default Layout
