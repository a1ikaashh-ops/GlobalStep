import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'

export default function Contact(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [message,setMessage] = useState('')
  const [sent,setSent] = useState(false)
  const loc = useLocation()
  const prefill = loc.state?.subject || ''

  function submit(e){
    e.preventDefault()
    // Простая валидация
    if(!name || !email || !message){
      alert('Пожалуйста, заполните все поля.')
      return
    }

    // Здесь обычно отправка на сервер; пока показываем уведомление
    console.log('Отправлено:', {name,email,message,prefill})
    setSent(true)
    setName('')
    setEmail('')
    setMessage('')

    setTimeout(()=>setSent(false), 4000)
  }

  return (
    <section style={{maxWidth:720}}>
      <h2>Контакты</h2>
      <p className="small">Свяжитесь с нами — мы поможем подобрать подходящую программу и оформить документы.</p>

      <form onSubmit={submit} style={{marginTop:16}}>
        <div className="form-group">
          <label>Имя</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Иван Иванов" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="ivan@example.com" />
        </div>
        <div className="form-group">
          <label>Сообщение</label>
          <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder={prefill ? `${prefill} — добавьте комментарий` : 'Ваше сообщение'} />
        </div>
        <button type="submit" className="btn">Отправить</button>
        {sent && <div style={{marginTop:12,color:'green'}}>Спасибо! Ваше сообщение отправлено.</div>}
      </form>

      <section style={{marginTop:26}}>
        <h3>Социальные сети</h3>
        <div style={{display:'flex',gap:10,marginTop:8}}>
          <a href="#">Telegram</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
        </div>
      </section>
    </section>
  )
}
