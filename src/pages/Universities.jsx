import React from 'react'
import UniversityCard from '../components/UniversityCard'
import universitiesData from '../data/universitiesData'

export default function Universities(){
  return (
    <section>
      <h2>Университеты</h2>
      <p className="small">Минимум 6 университетов из разных стран — краткие описания и кнопка «Подробнее».</p>
      <div style={{marginTop:18}} className="grid">
        {universitiesData.map(u=> <UniversityCard key={u.id} uni={u} />)}
      </div>
    </section>
  )
}
