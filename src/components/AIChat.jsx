import React, { useEffect, useRef, useState } from 'react'
import programsData from '../data/programsData'

import ChatSidebar from './ChatSidebar'
import ChatWindow from './ChatWindow'

const STORAGE_KEY = 'gs_chat_chats_v1'

function uid(prefix = ''){
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2,8)
}

function makeTitleFromMessage(text){
  if(!text) return 'Новый чат'
  const words = text.trim().split(/\s+/).slice(0,7)
  return words.join(' ') + (words.length>=7 ? '...' : '')
}

function createEmptyChat(){
  return {
    id: uid('chat_'),
    createdAt: new Date().toISOString(),
    title: 'Новый чат',
    messages: [
      { id: uid('msg_'), role: 'assistant', content: 'Привет! Я AI-консультант GlobalStep. Опишите свои навыки или интересы — я подберу подходящие программы.', timestamp: new Date().toISOString() }
    ]
  }
}

// lightweight reply generator (kept from previous implementation)
function generateReply(text){
  const t = String(text).toLowerCase()
  const tokens = t.split(/[ ,;]+/).map(s=>s.trim()).filter(Boolean)
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

export default function AIChat(){
  // open/collapse behavior (keeps previous floating button)
  const [open,setOpen] = useState(false)
  const [minimized,setMinimized] = useState(false)

  // chat state: array of chats and active id
  const [chats, setChats] = useState(()=>{
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(raw){
        return JSON.parse(raw)
      }
      // migration: older key 'gs_chat_messages' -> create single chat
      const legacy = localStorage.getItem('gs_chat_messages')
      if(legacy){
        const msgs = JSON.parse(legacy)
        const chat = createEmptyChat()
        chat.messages = msgs.map((m,i)=>({ id: uid('m_'), role: m.from === 'ai' ? 'assistant' : 'user', content: m.text || m.content || '', timestamp: new Date().toISOString() }))
        chat.title = makeTitleFromMessage(chat.messages.find(m=>m.role==='user')?.content)
        return [chat]
      }
    }catch(e){/* ignore */}
    return [ createEmptyChat() ]
  })

  const [activeId, setActiveId] = useState(()=> (chats && chats[0] && chats[0].id) || null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(chats)) }catch(e){}
  },[chats])

  useEffect(()=>{
    // ensure activeId valid
    if(!activeId && chats.length>0){ setActiveId(chats[0].id) }
  },[chats, activeId])

  // position (left/top) and size for draggable/resizable panel
  const initialLeft = (typeof window !== 'undefined') ? Math.max(8, window.innerWidth - 24 - 760) : 100
  const initialTop = (typeof window !== 'undefined') ? Math.max(8, window.innerHeight - 100 - 520) : 100
  const [pos, setPos] = useState({left: initialLeft, top: initialTop})
  const [size, setSize] = useState({width:760, height:520})
  const dragRef = useRef({dragging:false, startX:0, startY:0, startLeft:0, startTop:0})
  const resizeRef = useRef({resizing:false, startX:0, startY:0, startW:0, startH:0})

  function startDrag(e){
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
      const maxLeft = Math.max(8, window.innerWidth - size.width - 8)
      const maxTop = Math.max(8, window.innerHeight - size.height - 8)
      setPos({ left: Math.min(Math.max(8, nextLeft), maxLeft), top: Math.min(Math.max(8, nextTop), maxTop) })
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
      setSize({ width: Math.max(320, resizeRef.current.startW + dx), height: Math.max(300, resizeRef.current.startH + dy) })
    }

    function onMouseUp(){
      resizeRef.current.resizing = false
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  function addNewChat(){
    const c = createEmptyChat()
    setChats(prev=>[c, ...prev])
    setActiveId(c.id)
    setOpen(true)
    setMinimized(false)
  }

  function deleteChat(id){
    setChats(prev=>{
      const next = prev.filter(c=>c.id!==id)
      if(next.length===0){
        const fresh = createEmptyChat()
        setActiveId(fresh.id)
        return [fresh]
      }
      if(id === activeId){ setActiveId(next[0].id) }
      return next
    })
  }

  function selectChat(id){ setActiveId(id); setOpen(true); setMinimized(false) }

  function appendMessageToActive(role, content){
    setChats(prev=>prev.map(c=>{
      if(c.id!==activeId) return c
      const next = { ...c, messages: [...c.messages, { id: uid('msg_'), role, content, timestamp: new Date().toISOString() }] }
      if(c.title === 'Новый чат' || !c.title){
        const firstUser = next.messages.find(m=>m.role==='user')
        if(firstUser) next.title = makeTitleFromMessage(firstUser.content)
      }
      return next
    }))
  }

  function handleSendUser(content){
    if(!content || !content.trim()) return
    appendMessageToActive('user', content)
    setLoading(true)
    setTimeout(()=>{ const reply = generateReply(content); appendMessageToActive('assistant', reply); setLoading(false) }, 700 + Math.random()*800)
  }

  // find active chat
  const activeChat = chats.find(c=>c.id===activeId) || chats[0]

  function toggle(){ if(minimized){ setMinimized(false); setOpen(true); return } setOpen(o=>!o) }
  function collapse(){ setMinimized(true); setOpen(false) }

  return (
    <>
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

      {open && (
        <div
          className="chat-panel chat-app fadeIn"
          style={{left: pos.left, top: pos.top, width: size.width, height: size.height, position:'fixed', zIndex:70}}
        >
          <ChatSidebar chats={chats} activeId={activeId} onSelect={selectChat} onNew={addNewChat} onDelete={deleteChat} />
          <ChatWindow chat={activeChat} onSend={handleSendUser} onClose={()=>setOpen(false)} onCollapse={collapse} loading={loading} onStartDrag={startDrag} onStartResize={startResize} />
        </div>
      )}
    </>
  )
}
