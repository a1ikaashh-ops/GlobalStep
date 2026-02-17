import React, {useState} from 'react'

export default function Cooperation(){
  const [form, setForm] = useState({org:'', contact:'', email:'', description:'', website:''})
  const [status, setStatus] = useState(null)

  function handleChange(e){
    const {name,value} = e.target
    setForm(f=>({...f,[name]:value}))
  }

  function handleSubmit(e){
    e.preventDefault()
    // Простая валидация
    if(!form.org || !form.contact || !form.email){
      setStatus({type:'error',text:'Пожалуйста, заполните имя организации, контактное лицо и email.'})
      return
    }
    // В реальном проекте сюда уходит запрос на бэкенд
    console.log('Cooperation form submitted', form)
    setStatus({type:'success',text:'Спасибо! Мы получили ваше предложение и свяжемся в ближайшее время.'})
    setForm({org:'', contact:'', email:'', description:'', website:''})
  }

  return (
    <section>
      <div className="container">
        <h1>Сотрудничество</h1>
        <p className="small">GlobalStep открыт к сотрудничеству с организациями, университетами и программами. Ниже — контакты и форма для предложений.</p>

        <div style={{display:'grid',gridTemplateColumns:'1fr 420px',gap:24,marginTop:18}}>
          <div>
            <h3>Как предложить программу</h3>
            <ol className="small">
              <li>Заполните форму справа: укажите название организации и контактное лицо.</li>
              <li>Добавьте описание программы и ссылку на сайт для проверки.</li>
              <li>Мы рассматриваем заявки в течение 7 рабочих дней и свяжемся для дальнейших шагов.</li>
              <li>Для срочных предложений пишите сразу на <strong>partners@globalstep.example</strong>.</li>
            </ol>

            <h3 style={{marginTop:18}}>Контакты</h3>
            <p className="small">Email: <a href="mailto:partners@globalstep.example">partners@globalstep.example</a></p>
            <p className="small">Телефон: <a href="tel:+996312456789">+996 (312) 45-67-89</a></p>
            <p className="small">Соцсети: <a href="#">Telegram</a>, <a href="#">Instagram</a>, <a href="#">LinkedIn</a></p>

            <h3 style={{marginTop:18}}>Требования к предложению</h3>
            <ul className="small">
              <li>Краткое описание программы (цель, длительность, аудитория).</li>
              <li>Информация о финансировании и что покрывается.</li>
              <li>Контактное лицо и ссылки на официальные ресурсы.</li>
            </ul>
          </div>

          <aside>
            <div className="card">
              <h4>Форма предложения программы</h4>
              {status && (
                <div style={{padding:8,marginBottom:8,background: status.type==='success'? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.08)',borderRadius:8}}>
                  <div className="small">{status.text}</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Название организации</label>
                  <input name="org" value={form.org} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Контактное лицо</label>
                  <input name="contact" value={form.contact} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input name="email" value={form.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Описание программы</label>
                  <textarea name="description" value={form.description} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Ссылка на сайт</label>
                  <input name="website" value={form.website} onChange={handleChange} />
                </div>

                <div style={{display:'flex',justifyContent:'flex-end'}}>
                  <button className="btn" type="submit">Отправить</button>
                </div>
              </form>
            </div>
          </aside>
        </div>

      </div>
    </section>
  )
}
