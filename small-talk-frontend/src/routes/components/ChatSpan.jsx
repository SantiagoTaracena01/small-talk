import React from 'react'
import '../../styles/chat-span.sass'

const ChatSpan = ({ onClick, profileColor, receptor, lastMessage, lastMessageTime, unread }) => (
  <div
    className="chat-span"
    onClick={onClick}
  >
    <div
      className="profile-color"
      style={{ backgroundColor: profileColor }}
    />
    <div className="receptor-info">
      <h3>{receptor}</h3>
      <div className="receptor-message">
        <span><b>{lastMessageTime}</b></span>
        <p>{(lastMessage.length <= 30) ? lastMessage : `${lastMessage.slice(0, 30)}...`}</p>
        {unread && <div className="unread-label">!</div>}
      </div>
    </div>
  </div>
)

export default ChatSpan
