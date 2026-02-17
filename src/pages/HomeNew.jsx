import React from 'react'
import { Link } from 'react-router-dom'
import programsData from '../data/programsData'
import ProgramCard from '../components/ProgramCard'
import UniversityCard from '../components/UniversityCard'
import universitiesData from '../data/universitiesData'

// Новый, улучшенный Home с большим hero и секцией fully funded
export default function HomeNew(){
  const youth = programsData.filter(p=>p.fullyFunded)
  const featuredPrograms = programsData.slice(0,4)
  const featuredUnis = universitiesData.slice(0,4)

  return (
    <section>
  <div style={{borderRadius:12,overflow:'hidden',marginBottom:24,background: 'var(--brand-blue)',color:'white',padding:40}}>
        <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:20}}>
          <div style={{flex:1}}>
            <h1 style={{fontSize:36,margin:0,fontWeight:800}}>GlobalStep – Твой путь к международным возможностям</h1>
            <p style={{marginTop:12,opacity:0.95}}>Исследуй обучение за границей, культурные и молодежные программы, стажировки и международные обмены. Подбор программ и поддержка на всех этапах.</p>
            <div style={{display:'flex',gap:12,marginTop:18}}>
              <Link to="/programs" className="cta">Смотреть программы</Link>
              <Link to="/programs" className="btn" style={{background:'rgba(255,255,255,0.14)'}}>Молодежные программы 2026</Link>
            </div>
          </div>
          {/* removed AI widget from hero per requirements; AI chat remains global */}
        </div>
      </div>

      <div className="container">
        <h2>Популярные программы</h2>
        <p className="small">Актуальные программы и молодежные события — ознакомьтесь с подробностями и подайте заявку.</p>

        <div style={{marginTop:16}} className="grid">
          {featuredPrograms.map(p=> (
            <ProgramCard key={p.id} program={p} />
          ))}
        </div>

        <h2 style={{marginTop:28}}>Избранные университеты</h2>
        <p className="small">Университеты-партнёры и рекомендуемые места для обучения за рубежом.</p>
        <div style={{marginTop:16}} className="grid">
          {featuredUnis.map(u=> (
            <UniversityCard key={u.id} uni={u} />
          ))}
        </div>
      </div>
      {/* AI Chat теперь глобален и подключается в App.jsx */}
    </section>
  )
}
