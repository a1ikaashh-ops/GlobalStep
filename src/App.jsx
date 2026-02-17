import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import HomeNew from './pages/HomeNew'
import Programs from './pages/Programs'
import ProgramDetail from './pages/ProgramDetail'
import Universities from './pages/Universities'
import UniversityDetail from './pages/UniversityDetail'
import Requirements from './pages/Requirements'
import Cooperation from './pages/Cooperation'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import AIChat from './components/AIChat'

// Главный компонент приложения; определяет маршруты
export default function App(){
  return (
    <div>
      <Header />
      <main className="container" style={{paddingTop:20,paddingBottom:60}}>
        <Routes>
          <Route path="/" element={<HomeNew/>} />
          <Route path="/programs" element={<Programs/>} />
          <Route path="/programs/:slug" element={<ProgramDetail/>} />
          <Route path="/universities" element={<Universities/>} />
          <Route path="/universities/:slug" element={<UniversityDetail/>} />
          
          <Route path="/requirements" element={<Requirements/>} />
          <Route path="/cooperation" element={<Cooperation/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </main>
      <Footer />
      {/* Global AI Chat available on all pages */}
      <AIChat />
    </div>
  )
}
