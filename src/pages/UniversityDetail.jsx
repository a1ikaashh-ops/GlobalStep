import React from 'react'
import { useParams, Link } from 'react-router-dom'
import universitiesData from '../data/universitiesData'

export default function UniversityDetail(){
  const { slug } = useParams()
  // Находим университет по slug
  const uni = universitiesData.find(u=>u.slug===slug)

  if(!uni){
    return (
      <div>
        <h2>Университет не найден</h2>
        <p className="small">Проверьте список университетов.</p>
        <Link to="/universities" className="btn secondary">К списку университетов</Link>
      </div>
    )
  }

  return (
    <section>
      {/* Hero */}
      <div style={{marginBottom:24}}>
        {uni.image && <img src={uni.image} alt={uni.name} style={{width:'100%',height:300,objectFit:'cover',borderRadius:12,display:'block'}} />}
        <div className="container" style={{marginTop:12}}>
          <h1 style={{margin:0}}>{uni.name}</h1>
          <p className="small" style={{opacity:0.95,marginTop:8}}>{uni.country}</p>
        </div>
      </div>

      <div className="container" style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:24}}>
        <div>
          <h3>Описание</h3>
          <p className="small">{uni.description}</p>

          <h3 style={{marginTop:18}}>Стоимость обучения</h3>
          <p className="small">{uni.tuitionFees}</p>

          <h3 style={{marginTop:18}}>Популярные программы</h3>
          <ul>
            {uni.popularPrograms.map((p,i)=>(<li key={i} className="small">{p}</li>))}
          </ul>

          <h3 style={{marginTop:18}}>Требования к поступлению</h3>
          <p className="small">{uni.admissionRequirements}</p>

          <div style={{marginTop:18}}>
            <a href={uni.officialWebsite} target="_blank" className="btn">Официальный сайт</a>
            <Link to="/contact" className="btn secondary" style={{marginLeft:12}}>Подать заявку</Link>
          </div>
        </div>

        <aside>
          <div className="card">
            <h4>Контакты и соцсети</h4>
            <p className="small">Веб: <a href={uni.officialWebsite} target="_blank">{uni.officialWebsite}</a></p>
            <p className="small">Instagram: {uni.socialMedia.instagram ? <a href={uni.socialMedia.instagram} target="_blank">Открыть</a> : '—'}</p>
            <p className="small">Telegram: {uni.socialMedia.telegram ? <a href={uni.socialMedia.telegram} target="_blank">Открыть</a> : '—'}</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
