import React, {useState, useEffect} from 'react'
import programsData from '../data/programsData'
import universitiesData from '../data/universitiesData'
import ProgramCard from '../components/ProgramCard'

// Простой AI-консультант: сопоставление ключевых слов + скоринг
export default function Recommend(){
  const [skills,setSkills] = useState('')
  const [english,setEnglish] = useState('')
  const [age,setAge] = useState('')
  const [interests,setInterests] = useState('')
  const [budget,setBudget] = useState('not-important')
  const [loading,setLoading] = useState(false)
  const [results,setResults] = useState([])

  function parseList(text){
    return text.split(',').map(s=>s.trim().toLowerCase()).filter(Boolean)
  }

  function scoreItem(item, input){
    // простой скоринг: +2 за совпадение навыка/interests, +1 за язык, +1 за возраст/финансирование совпадение
    let score = 0
    const skills = input.skills
    const interests = input.interests

    const hay = (item.title + ' ' + (item.shortDescription||item.description||'') + ' ' + (item.type||'')).toLowerCase()

    skills.forEach(s=>{ if(hay.includes(s)) score += 2 })
    interests.forEach(i=>{ if(hay.includes(i)) score += 2 })

    // budget match: if user wants fully funded and item is fullyFunded — +3
    if(input.budget === 'fully' && item.fullyFunded) score += 3
    if(input.budget === 'part' && !item.fullyFunded) score += 1

    // language match: check keywords like english/korean
    if(input.english){ if(hay.includes(input.english.toLowerCase())) score += 1 }

    return score
  }

  function onSubmit(e){
    e.preventDefault()
    setLoading(true)
    setResults([])

    const input = {
      skills: parseList(skills),
      english: english,
      age: Number(age) || null,
      interests: parseList(interests),
      budget: budget
    }

    // имитация работы ИИ
    setTimeout(()=>{
      // комбинированная база: youth programs + university programs
      const base = [...programsData]

      // рассчитываем score для каждого
      const scored = base.map(item=> ({...item, score: scoreItem(item,input)}))

      // фильтрация: минимум 1 балл
      const filtered = scored.filter(s=>s.score>0).sort((a,b)=>b.score-a.score)

      setResults(filtered)
      setLoading(false)
    },2000)
  }

  return (
    <section>
      <h2>AI-консультант GlobalStep</h2>
      <p className="small">Наш интеллектуальный помощник анализирует ваши навыки и подбирает лучшие международные возможности.</p>

      <div style={{display:'flex',gap:18,alignItems:'flex-start',marginTop:18}}>
        <form onSubmit={onSubmit} style={{width:360}}>
          <div className="form-group">
            <label>Навыки (через запятую)</label>
            <input value={skills} onChange={e=>setSkills(e.target.value)} placeholder="liderstvo, angliyskiy, программирование" />
          </div>
          <div className="form-group">
            <label>Уровень английского / язык</label>
            <input value={english} onChange={e=>setEnglish(e.target.value)} placeholder="IELTS 6.5, English, Korean" />
          </div>
          <div className="form-group">
            <label>Возраст</label>
            <input value={age} onChange={e=>setAge(e.target.value)} placeholder="20" />
          </div>
          <div className="form-group">
            <label>Интересы (через запятую)</label>
            <input value={interests} onChange={e=>setInterests(e.target.value)} placeholder="культура, IT, бизнес" />
          </div>
          <div className="form-group">
            <label>Бюджет</label>
            <select value={budget} onChange={e=>setBudget(e.target.value)}>
              <option value="fully">Fully funded</option>
              <option value="part">Частично</option>
              <option value="not-important">Не важно</option>
            </select>
          </div>
          <button className="btn" type="submit">Подобрать программу</button>
        </form>

        <div style={{flex:1}}>
          <div style={{minHeight:120}}>
            {loading && <div className="card">Ищем подходящие программы... (имитация AI) <div className="small">Загрузка...</div></div>}

            {!loading && results.length===0 && <div className="card"><p className="small">Результаты будут здесь после подбора.</p></div>}

            {!loading && results.length>0 && (
              <div>
                <h3>Вам подходят:</h3>
                <div className="grid">
                  {results.map(r=> <div key={r.id} className="card fadeIn"><h4>{r.title}</h4><p className="small">{r.shortDescription||r.description}</p><a className="btn secondary" href={`/programs/${r.slug}`}>Подробнее</a></div>)}
                </div>
                <div style={{marginTop:12}} className="small">Краткое объяснение: Рекомендуется, потому что вы указали {skills || 'навыки'} и {interests || 'интересы'}.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
