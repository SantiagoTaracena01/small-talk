import React from 'react'
import '../styles/chatBubble.sass'

const ChatBubble = ({
    content,
    time,
    sender
}) => (
    <div className='bubble'>
        <h2 className='sender-name'>{sender}</h2>
        <p className='content-text'>{content}</p>
        <h2 className='tiempo'>{time}</h2>
    </div>
)
export default ChatBubble