import React, {useState, useRef, useEffect} from 'react'
import programsData from '../data/programsData'
import universitiesData from '../data/universitiesData'

// Небольшой имитатор AI-чата: анализ ключевых слов и рекомендации
export default function AIChat(){
  // Global AI chat component with draggable + resizable panel
  const [open,setOpen] = useState(false)
  const [minimized,setMinimized] = useState(false)
  const [input,setInput] = useState('')
  const [messages,setMessages] = useState(()=>{
    try{
      const raw = localStorage.getItem('gs_chat_messages')
      if(raw) return JSON.parse(raw)
    }catch(e){/* ignore */}
    return [{from:'ai', text:'Привет! Я AI-консультант GlobalStep. Опишите свои навыки или интересы — я подберу подходящие программы.'}]
  })
  const [loading,setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // position (left/top) and size for draggable/resizable panel
  const initialLeft = (typeof window !== 'undefined') ? Math.max(8, window.innerWidth - 24 - 380) : 100
  const initialTop = (typeof window !== 'undefined') ? Math.max(8, window.innerHeight - 100 - 520) : 100
  const [pos, setPos] = useState({left: initialLeft, top: initialTop})
  const [size, setSize] = useState({width:380, height:520})
  const panelRef = useRef(null)
  const dragRef = useRef({dragging:false, startX:0, startY:0, startLeft:0, startTop:0})
  const resizeRef = useRef({resizing:false, startX:0, startY:0, startW:0, startH:0})

  useEffect(()=>{
    if(messagesEndRef.current){ messagesEndRef.current.scrollIntoView({behavior:'smooth'}) }
  },[messages,open])

  useEffect(()=>{
    try{ localStorage.setItem('gs_chat_messages', JSON.stringify(messages)) }catch(e){}
  },[messages])

  // Note: mouse-based drag/resize is attached when starting drag/resize (startDrag/startResize).

  function startDrag(e){
    // start dragging using mouse events
    e.preventDefault()
    dragRef.current.dragging = true
    dragRef.current.startX = e.clientX
    dragRef.current.startY = e.clientY
    dragRef.current.startLeft = pos.left
    dragRef.current.startTop = pos.top

    function onMouseMove(ev){
      if(!dragRef.current.dragging) return
      const dx = ev.clientX - dragRef.current.startX
      const dy = ev.clientY - dragRef.current.startY
      const nextLeft = Math.round(dragRef.current.startLeft + dx)
      const nextTop = Math.round(dragRef.current.startTop + dy)
      // clamp to viewport with 8px padding
      const maxLeft = Math.max(8, window.innerWidth - size.width - 8)
      const maxTop = Math.max(8, window.innerHeight - size.height - 8)
      setPos({
        left: Math.min(Math.max(8, nextLeft), maxLeft),
        top: Math.min(Math.max(8, nextTop), maxTop)
      })
    }

    function onMouseUp(){
      dragRef.current.dragging = false
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  function startResize(e){
    e.preventDefault()
    resizeRef.current.resizing = true
    resizeRef.current.startX = e.clientX
    resizeRef.current.startY = e.clientY
    resizeRef.current.startW = size.width
    resizeRef.current.startH = size.height

    function onMouseMove(ev){
      if(!resizeRef.current.resizing) return
      const dx = ev.clientX - resizeRef.current.startX
      const dy = ev.clientY - resizeRef.current.startY
      setSize({
        width: Math.max(260, resizeRef.current.startW + dx),
        height: Math.max(260, resizeRef.current.startH + dy)
      })
    }

    function onMouseUp(){
      resizeRef.current.resizing = false
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  function toggle(){ if(minimized){ setMinimized(false); setOpen(true); return } setOpen(o=>!o) }
  function closePanel(){ setOpen(false) }
  function collapse(){ setMinimized(true); setOpen(false) }

  function parseList(text){ return text.split(/[ ,;]+/).map(s=>s.trim().toLowerCase()).filter(Boolean) }

  function handleSend(e){
    e.preventDefault()
    const text = input.trim()
    if(!text) return
    setMessages(m=>[...m, {from:'user', text}])
    setInput('')
    setLoading(true)
    setTimeout(()=>{
      const reply = generateReply(text)
      setMessages(m=>[...m, {from:'ai', text:reply}])
      setLoading(false)
    }, 1100)
  }

  function generateReply(text){
    const t = text.toLowerCase()
    const tokens = parseList(t)
    const recommendations = []
    if(t.includes('лидер') || tokens.includes('лидерство')){
      const rec = programsData.filter(p=>p.fullyFunded).map(p=>p.title)
      if(rec.length) recommendations.push(`Вам могут подойти молодёжные программы: ${rec.join(', ')}`)
    }
    if(t.includes('коре') || t.includes('korea') || t.includes('korean')){
      const rec = programsData.filter(p=> (p.title||'').toLowerCase().includes('korean') || (p.location||'').toLowerCase().includes('коре') || (p.location||'').toLowerCase().includes('korea')).map(p=>p.title)
      if(rec.length) recommendations.push(`Рекомендация по Корее: ${rec.join(', ')}`)
    }
    if(tokens.length){
      const matched = programsData.filter(p=>{
        const hay = ((p.title||'') + ' ' + (p.description||'') + ' ' + (p.type||'')).toLowerCase()
        return tokens.some(s=>hay.includes(s))
      }).map(p=>p.title)
      if(matched.length) recommendations.push(`По вашим навыкам найдены программы: ${matched.join(', ')}`)
    }
    if(recommendations.length===0){
      if(t.includes('привет')) return 'Привет! Опишите навыки, интересы или страну — я подберу варианты.'
      return 'Расскажите подробнее о навыках и интересах, и я предложу подходящие программы.'
    }
    return recommendations.join('\n')
  }

  return (
    <>
      {/* Floating button (global) */}
      {!minimized && (
        <button className="fab" aria-label="Чат" onClick={toggle} title="AI-консультант">
          <span className="fab-icon">Чат</span>
        </button>
      )}
      {minimized && (
        <button className="fab small" aria-label="Чат" onClick={toggle} title="AI-консультант">
          <span className="fab-icon">Чат</span>
        </button>
      )}

      {/* Draggable + Resizable Chat panel */}
      {open && (
        <div
          ref={panelRef}
          className="chat-panel"
          style={{left: pos.left, top: pos.top, width: size.width, height: size.height, position:'fixed'}}
        >
          <div className="chat-header" onMouseDown={startDrag} style={{cursor:'move'}}>
            <div>
              <strong>AI-консультант</strong>
              <div className="small">GlobalStep</div>
            </div>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <button className="btn secondary" onClick={collapse}>Свернуть</button>
              <button className="btn secondary" onClick={closePanel}>Закрыть</button>
            </div>
          </div>

          <div className="chat-body">
            <div className="messages">
              {messages.map((m,i)=> (
                <div key={i} className={`message ${m.from}`}>
                  <div className="bubble">{m.text}</div>
                </div>
              ))}
              {loading && <div className="message ai"><div className="bubble">Пишу...</div></div>}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form className="chat-input" onSubmit={handleSend}>
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Напишите сообщение... (Enter для отправки)" />
            <button className="btn" type="submit">Отправить</button>
          </form>

          <div style={{position:'absolute',right:6,bottom:6,width:14,height:14,cursor:'nwse-resize'}} onMouseDown={startResize} />
        </div>
      )}
    </>
  )
}
