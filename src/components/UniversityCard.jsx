import React from 'react'
import { Link } from 'react-router-dom'

// Карточка университета
export default function UniversityCard({uni}){
  return (
    <article className="card fadeIn" style={{cursor:'default'}}>
      {uni.image && <img src={uni.image} alt={uni.name} className="card-media" />}
        <div className="card-body">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
            <h3 style={{margin:0}}>{uni.name}</h3>
            <div className="tag" style={{whiteSpace:'nowrap'}}>{uni.country}</div>
          </div>

          <p style={{marginTop:10,color:'var(--muted)'}}>{uni.description.slice(0,140)}{uni.description.length>140?'...':''}</p>
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',marginTop:12,gap:8}}>
          {/* Только кнопка "Подробнее" ведёт на страницу университета */}
          <Link to={`/universities/${uni.slug}`} className="btn">Подробнее</Link>
          <div style={{marginTop:4}} className="small">Стоимость: {uni.tuitionFees}</div>
        </div>
      {uni.moments && uni.moments.length>0 && (
        <div style={{display:'flex',gap:8,marginTop:12}}>
          {uni.moments.slice(0,3).map((m,i)=>(<img key={i} src={m} alt="moment" style={{width:80,height:54,objectFit:'cover',borderRadius:8}}/>))}
        </div>
      )}
    </article>
  )
}
