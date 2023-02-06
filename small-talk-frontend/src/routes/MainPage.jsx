import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ChatSpan from './components/ChatSpan'
import { UserContext } from '../providers/UserProvider'
import '../styles/main-page.sass'

const chats = [
  {
    id: 1,
    profileColor: '#FFBD44',
    receptor: 'Marco Jurado',
    lastMessage: 'Hola, ¿cómo estás?',
    lastMessageTime: '23:45',
    unread: true
  },
  {
    id: 2,
    profileColor: '#C2F6FF',
    receptor: 'Gabriel Vicente',
    lastMessage: 'Bro, fijate que hay qué trabajar bastante en Bases de Datos',
    lastMessageTime: '23:36',
    unread: true
  }
]

const MainPage = () => {
  const { user } = useContext(UserContext)

  useEffect(() => {
    const getChats = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chats/${user._id}`)
      const data = await response.json()
      console.log(data)
    }
    getChats()
  }, [])

  return (
    <div className="main-page">
      <header>
        <Link to="/profile">
          <div
            className="main-page-profile-color"
            style={{ backgroundColor: '#2286DD' }}
          />
        </Link>
      </header>
      <section>
        <aside>
          {chats.map((chat) => (
            <ChatSpan 
              key={chat.id}
              onClick={() => console.log('Chat clicked')}
              profileColor={chat.profileColor}
              receptor={chat.receptor}
              lastMessage={chat.lastMessage}
              lastMessageTime={chat.lastMessageTime}
              unread={chat.unread}
            />
          ))}
        </aside>
      </section>
    </div>
  )
}

export default MainPage
