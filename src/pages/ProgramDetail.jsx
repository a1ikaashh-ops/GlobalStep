import React from 'react'
import { useParams, Link } from 'react-router-dom'
import programsData from '../data/programsData'

// Детальная страница программы по slug
export default function ProgramDetail(){
  const { slug } = useParams()
  const program = programsData.find(p=>p.slug===slug)

  if(!program){
    return (
      <div>
        <h2>Программа не найдена</h2>
        <p className="small">Проверьте список программ.</p>
        <Link to="/programs" className="btn secondary">К списку программ</Link>
      </div>
    )
  }

  return (
    <section>
      {/* Hero */}
      <div style={{marginBottom:24}}>
        {program.image && <img src={program.image} alt={program.title} style={{width:'100%',height:300,objectFit:'cover',borderRadius:12,display:'block'}} />}
        <div className="container" style={{marginTop:12}}>
          <h1 style={{margin:0}}>{program.title}</h1>
          <p className="small" style={{opacity:0.95,marginTop:8}}>{program.location} · {program.type}</p>
        </div>
      </div>

      <div className="container" style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:24}}>
        <div>
          <h3>Описание</h3>
          <p className="small">{program.description}</p>

          <h3 style={{marginTop:18}}>Что покрывается</h3>
          <ul>
            {program.covered && program.covered.map((c,i)=>(<li key={i} className="small">{c}</li>))}
          </ul>

          {/* Требования удалены по запросу — сохраняем остальную информацию */}

          <h3 style={{marginTop:18}}>Дедлайн и статус</h3>
          <p className="small">{program.deadline} · {program.status}</p>

          <h3 style={{marginTop:18}}>Официальная ссылка</h3>
          <p className="small"><a href={program.officialLink} target="_blank">{program.officialLink}</a></p>

          <h3 style={{marginTop:18}}>Социальные сети</h3>
          <p className="small">Instagram: {program.socialMedia.instagram ? <a href={program.socialMedia.instagram} target="_blank">Открыть</a> : '—'}</p>
          <p className="small">Telegram: {program.socialMedia.telegram ? <a href={program.socialMedia.telegram} target="_blank">Открыть</a> : '—'}</p>

          <div style={{marginTop:18}}>
            <Link to="/contact" className="btn">Подать заявку</Link>
          </div>
        </div>

        <aside>
          <div className="card">
            <h4>Краткая информация</h4>
            <p className="small">Тип: {program.type}</p>
            <p className="small">Локация: {program.location}</p>
            <p className="small">Статус: {program.status}</p>
            <p className="small">Дедлайн: {program.deadline}</p>
            <Link to="/contact" className="btn" style={{marginTop:12}}>Подать заявку</Link>
          </div>
        </aside>
      </div>
    </section>
  )
}
