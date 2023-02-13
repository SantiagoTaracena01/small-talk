import { useState } from 'react'
import '../../styles/message.sass'

const Message = ({ messageId, message, hour, isSender }) => {
  const [currentMessage, setCurrentMessage] = useState(message)
  const [updating, setUpdating] = useState(false)

  const updateMessage = async (updatedMessage) => {
    await fetch(`${import.meta.env.VITE_API_URL}/messages/${messageId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: {
          text: updatedMessage
        }
      })
    })
  }

  const deleteMessage = async (messageId) => {
    await fetch(`${import.meta.env.VITE_API_URL}/messages/${messageId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return (
    <div className={`message ${(isSender) ? 'sent' : 'received'}`}>
      {(!updating) ? <p>{currentMessage}</p> : <input
        type="text"
        value={currentMessage}
        onChange={(event) => setCurrentMessage(event.target.value)}
      />}
      <div className="message-content">
        <span>{hour}</span>
        <div className="message-content-buttons">
        {(isSender && updating) ? <button
          className="message-button"
          onClick={() => {
            deleteMessage(messageId)
            setCurrentMessage('Message has been deleted')
          }}
        >Delete</button>: null}
        {(isSender) ? <button
          className="message-button"
          onClick={() => {
            if (updating) {
              updateMessage(currentMessage)
            }
            setUpdating(!updating)
          }}
        >{(updating) ? 'Save' : 'Edit'}</button> : null}
        </div>
      </div>
    </div>
  )
}

export default Message
