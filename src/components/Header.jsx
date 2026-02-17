import React from 'react'
import { NavLink } from 'react-router-dom'

// Хедер с навигацией — все ссылки работают через React Router
export default function Header(){
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
          <button className="btn" onClick={()=>{window.location.href='/contact'}}>Связаться</button>
        </div>
      </div>
    </header>
  )
}
