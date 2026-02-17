import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <div style={{textAlign:'center',padding:40}}>
      <h2>Страница не найдена</h2>
      <p className="small">Похоже, такой страницы не существует.</p>
      <Link to="/" className="btn">Вернуться на главную</Link>
    </div>
  )
}
