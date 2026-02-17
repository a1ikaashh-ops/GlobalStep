import React, { useEffect, useRef } from 'react'

export default function ChatMessages({messages = [], loading}){
  const endRef = useRef(null)

  useEffect(()=>{ if(endRef.current) endRef.current.scrollIntoView({behavior:'smooth'}) },[messages, loading])

  return (
    <div className="messages">
      {messages.map(m=> (
        <div key={m.id} className={`message ${m.role === 'user' ? 'user':'ai'}`}>
          <div className="bubble">{m.content}</div>
        </div>
      ))}
      {loading && <div className="message ai"><div className="bubble">Пишу...</div></div>}
      <div ref={endRef} />
    </div>
  )
}
