import React from 'react'

export default function ChatSidebar({chats, activeId, onSelect, onNew, onDelete}){
  return (
    <aside className="chat-sidebar">
      <div className="sidebar-top">
        <button className="btn new-chat" onClick={onNew}>+ Новый чат</button>
      </div>

      <div className="sidebar-list">
        {chats.map(c=> (
          <div key={c.id} className={`chat-item ${c.id===activeId? 'active':''}`} onClick={()=>onSelect(c.id)}>
            <div className="chat-item-main">
              <div className="chat-title">{c.title || 'Новый чат'}</div>
              <div className="chat-date small">{new Date(c.createdAt).toLocaleString()}</div>
            </div>
            <button className="icon-delete" onClick={(e)=>{ e.stopPropagation(); onDelete(c.id) }} title="Удалить чат">🗑</button>
          </div>
        ))}
      </div>
    </aside>
  )
}
