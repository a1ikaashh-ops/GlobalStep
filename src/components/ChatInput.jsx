import React, { useState } from 'react'

export default function ChatInput({onSend}){
  const [val, setVal] = useState('')

  function submit(e){
    if(e) e.preventDefault()
    const text = val.trim()
    if(!text) return
    onSend(text)
    setVal('')
  }

  return (
    <form className="chat-input" onSubmit={submit}>
      <input value={val} onChange={e=>setVal(e.target.value)} placeholder="Напишите сообщение... (Enter для отправки)" />
      <button className="btn" type="submit">Отправить</button>
    </form>
  )
}
