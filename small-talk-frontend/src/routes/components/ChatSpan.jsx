import React from 'react'
import '../../styles/chat-span.sass'

const ChatSpan = ({ onClick, profilePicture, receptor, lastMessage, lastMessageTime }) => (
  <div
    className="chat-span"
    onClick={onClick}
  >
    <img
      className="profile-picture"
      src={profilePicture}
    />
    <div className="receptor-info">
      <h3>{receptor}</h3>
      <div className="receptor-message">
        <span><b>{lastMessageTime}</b></span>
        <p>{(lastMessage.length <= 30) ? lastMessage : `${lastMessage.slice(0, 30)}...`}</p>
      </div>
    </div>
  </div>
)

export default ChatSpan
