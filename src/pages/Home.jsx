import React from 'react'
import { Link } from 'react-router-dom'
import programs from '../data/programs'
import universities from '../data/universities'
import ProgramCard from '../components/ProgramCard'
import programsData from '../data/programsData'
import universitiesData from '../data/universitiesData'

export default function Home(){
  // Показываем несколько избранных программ
  // Use canonical data where possible; fall back to older `programs` file
  const featured = programsData && programsData.length ? programsData.slice(0,3) : programs.slice(0,3)

  return (
    <section>
      <div className="hero">
        <div className="hero-left">
          <h1 className="h1">Начни своё обучение за границей уже сегодня</h1>
          <p className="subtitle">Откройте новые возможности: качественное образование, карьера, международный опыт и личностный рост.</p>
          <Link to="/programs" className="cta">Смотреть программы</Link>

          <div className="features">
            <div className="feature">
              <h4>Доступное образование</h4>
              <p className="small">Разные ценовые категории и стипендии для талантливых студентов.</p>
            </div>
            <div className="feature">
              <h4>Проверенные университеты</h4>
              <p className="small">Мы отбираем только аккредитованные и надёжные учебные заведения.</p>
            </div>
            <div className="feature">
              <h4>Поддержка при поступлении</h4>
              <p className="small">Помогаем с документами, мотивацией и визовыми вопросами.</p>
            </div>
          </div>
        </div>
        <div style={{flex:1}}>
          <div style={{background:'white',padding:18,borderRadius:12}}>
            <h3 style={{marginTop:0}}>Популярные программы</h3>
              <div className="grid">
              {featured.map(p=>{
                // Ensure program has a slug (programsData uses slug)
                const program = p.slug ? p : programsData.find(d=>d.id===p.id) || p
                return <ProgramCard key={program.id} program={program} />
              })}
            </div>
          </div>
        </div>
      </div>

      <section style={{marginTop:36}}>
        <h2>Топ университетов</h2>
        <div className="grid" style={{marginTop:12}}>
          {universitiesData.map(u=>(
            <div className="card" key={u.id}>
              {u.image && <img src={u.image} alt={u.name} className="card-media" />}
              <h3>{u.name}</h3>
              <p className="small">{u.country}</p>
              <p className="small">{(u.description||'').slice(0,120)}...</p>
              <Link to={`/universities/${u.slug}`} className="btn secondary">Подробнее</Link>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}
