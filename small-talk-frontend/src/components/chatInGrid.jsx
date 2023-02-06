import React from 'react'

const ChatInGrid = ({
    chatId,
    sender,
    lastTime,
    setIdSelectedChat,
    setSelectedChat
}) => (
    <div 
        className='recent-chat-container' 
        onClick={() => {
            setIdSelectedChat(chatId) 
            setSelectedChat(true)
        }}
    >
        <h4 className='sender-name'>{sender}</h4>
        <h4 className='time-sender'>{lastTime}</h4>
    </div>
)
export default ChatInGrid