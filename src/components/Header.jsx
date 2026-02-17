import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

// Хедер с навигацией — все ссылки работают через React Router
export default function Header(){
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  function openMenu(){ setMobileOpen(true) }
  function closeMenu(){ setMobileOpen(false) }

  function goTo(path){
    navigate(path)
    closeMenu()
  }

  return (
    <header className="header">
      <div className="header-inner container">
          <div className="logo" aria-hidden="true">
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div className="mark">GS</div>
              <div>
                <div style={{fontWeight:800}}>GlobalStep</div>
                <div style={{fontSize:12,color:'var(--muted)'}}>Образование за границей</div>
              </div>
            </div>
          </div>

        <nav className="nav" aria-label="Главное меню">
          <NavLink to="/" end className={({isActive})=>isActive? 'active' : ''}>Главная</NavLink>
          <NavLink to="/programs" className={({isActive})=>isActive? 'active' : ''}>Программы</NavLink>
          <NavLink to="/universities" className={({isActive})=>isActive? 'active' : ''}>Университеты</NavLink>
          <NavLink to="/cooperation" className={({isActive})=>isActive? 'active' : ''}>Сотрудничество</NavLink>
        </nav>

        <div className="hamburger">
          <button className="btn" onClick={openMenu}>☰</button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}>
          <div className="mobile-menu" onClick={(e)=>e.stopPropagation()}>
            <a onClick={()=>goTo('/')} href="#">Главная</a>
            <a onClick={()=>goTo('/programs')} href="#">Программы</a>
            <a onClick={()=>goTo('/universities')} href="#">Университеты</a>
            <a onClick={()=>goTo('/cooperation')} href="#">Сотрудничество</a>
            <div style={{marginTop:12}}>
              <button className="btn secondary" onClick={()=>{goTo('/contact')}}>Связаться</button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
