import React from 'react'
import ProgramCard from '../components/ProgramCard'
import programsData from '../data/programsData'

export default function Programs(){
  return (
    <section>
      <h2>Программы обучения</h2>
      <p className="small">Выберите программу, чтобы узнать подробности и подать заявку.</p>
      <div style={{marginTop:18}} className="grid">
        {programsData.map(p=> (
          <ProgramCard key={p.id} program={p} />
        ))}
      </div>
    </section>
  )
}
