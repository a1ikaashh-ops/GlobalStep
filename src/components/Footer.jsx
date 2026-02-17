import React from 'react'

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div className="mark" style={{width:44,height:44,background:'var(--brand-blue)',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:8,fontWeight:700}}>GS</div>
            <div>
              <div style={{fontWeight:800}}>GlobalStep</div>
              <div style={{fontSize:13,color:'rgba(255,255,255,0.8)'}}>Помогаем поступить в лучшие университеты мира</div>
            </div>
          </div>
          <p style={{marginTop:12,color:'rgba(255,255,255,0.85)'}}>Адрес: Бишкек, Кыргызстан</p>
          <p style={{marginTop:6,color:'rgba(255,255,255,0.85)'}}>Телефон: +996 (312) 45-67-89</p>
          <p style={{marginTop:6,color:'rgba(255,255,255,0.85)'}}>Email: info@globalstep.example</p>
        </div>

        <div>
          <h4>Быстрые ссылки</h4>
          <ul style={{listStyle:'none',padding:0}}>
            <li><a href="/">Главная</a></li>
            <li><a href="/programs">Программы</a></li>
            <li><a href="/universities">Университеты</a></li>
            <li><a href="/about">О нас</a></li>
            <li><a href="/contact">Контакты</a></li>
            <li><a href="/cooperation">Сотрудничество</a></li>
          </ul>
        </div>

        <div>
          <h4>Социальные сети</h4>
          <p style={{margin:0}}><a href="#">Telegram</a></p>
          <p style={{margin:0}}><a href="#">Instagram</a></p>
          <p style={{margin:0}}><a href="#">LinkedIn</a></p>
        </div>
      </div>
    </footer>
  )
}
