import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

// Карточка программы — показывает ключевую информацию и кнопку "Подать заявку"
export default function ProgramCard({program}){
  // Карточка программы: только кнопка "Подробнее" ведёт на детальную страницу
  return (
    <article className="card fadeIn" style={{cursor:'default'}}>
      {program.image && <img src={program.image} alt={program.title} className="card-media" />}

      <div className="card-body">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8,gap:12}}>
          <h3 style={{margin:0}}>{program.title}</h3>
          <span className="tag">{program.type}</span>
        </div>

        <p className="small" style={{margin:6}}>{program.location}</p>
        <p style={{marginTop:8,color:'var(--muted)'}}>{(program.description||'').slice(0,140)}{(program.description||'').length>140?'...':''}</p>
      </div>

      <div className="card-footer" style={{display:'flex',gap:10,marginTop:12,alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <Link to={`/programs/${program.slug}`} className="btn secondary">Подробнее</Link>
        </div>
        <span className="small">Дедлайн: {program.deadline}</span>
      </div>

      {program.moments && program.moments.length>0 && (
        <div style={{display:'flex',gap:8,marginTop:12}}>
          {program.moments.slice(0,3).map((m,i)=>(<img key={i} src={m} alt="moment" style={{width:80,height:54,objectFit:'cover',borderRadius:8}}/>))}
        </div>
      )}
    </article>
  )
}
