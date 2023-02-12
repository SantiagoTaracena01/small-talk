import React from 'react'

const Message = ({ message, hour, isSender }) => {
  return (
    <div className={`message ${(isSender) ? 'sent' : 'received'}`}>
      <p>{message}</p>
      <span>{hour}</span>
    </div>
  )
}

export default Message
