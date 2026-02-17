import React from 'react'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'

export default function ChatWindow({chat, onSend, onClose, onCollapse, loading, onStartDrag, onStartResize, style}){
  if(!chat) return null

  return (
    <div className="chat-window" style={style}>
      <div className="chat-header" onMouseDown={onStartDrag} style={{cursor:'move'}}>
        <div>
          <strong>{chat.title || 'Новый чат'}</strong>
          <div className="small">{new Date(chat.createdAt).toLocaleString()}</div>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <button className="btn secondary" onClick={onCollapse}>Свернуть</button>
          <button className="btn secondary" onClick={onClose}>Закрыть</button>
        </div>
      </div>

      <div className="chat-body">
        <ChatMessages messages={chat.messages} loading={loading} />
      </div>

      <ChatInput onSend={onSend} />

      <div style={{position:'absolute',right:6,bottom:6,width:18,height:18,cursor:'nwse-resize'}} onMouseDown={onStartResize} />
    </div>
  )
}
