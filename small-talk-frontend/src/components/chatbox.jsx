import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import SmallTalkLogo from '../assets/images/small-talk-logo.png'
import '../styles/chatbox.sass'
import ChatBubble from '../components/chatBubble.jsx'


const ChatBox = () => {
  const [users, setUsers] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [senderUSR, setSenderUSR] = useState()
  const [chatBubbles, setChatBubbles] = useState()
  const navigate = useNavigate()

  // area para handles

  return(
    <div className='chatbox-containter'>
      <div className='chatinfo'>
        <div className='usernName-chat'>
          {senderUSR}
        </div>
      </div>
      <div className='chat-content-container'>
        {
          chatBubbles
          && chatBubbles.map((bubble,index) => (
            <ChatBubble
              content={bubble.content}
              time={bubble.time}
            />
          ))
        }
      </div>
      <div className='write-bar'>
        <textarea placeholder='Escribe un mensaje aqui' className='message-area'></textarea>
        <button className='send-btn'>
          <img src="https://cdn-icons-png.flaticon.com/512/660/660619.png" alt="send button" />
        </button>
      </div>
    </div>
  )
}

export default ChatBox