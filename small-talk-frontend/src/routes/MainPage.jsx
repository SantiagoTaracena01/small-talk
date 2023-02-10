import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ChatSpan from './components/ChatSpan'
import { UserContext } from '../providers/UserProvider'
import LogoutIcon from '../assets/icons/logout.png'
import AddContactIcon from '../assets/icons/add-contact.png'
import '../styles/main-page.sass'

const chats = [
  {
    id: 1,
    picture: 'https://avatars.githubusercontent.com/u/60157453?v=4',
    receptor: 'MaJu502',
    receptorFirstname: 'Marco',
    receptorLastname: 'Jurado',
    lastMessage: 'Hola, ¿cómo estás?',
    lastMessageTime: '23:45',
    unread: true
  },
  {
    id: 2,
    picture: 'https://avatars.githubusercontent.com/u/60375344?v=4',
    receptor: 'GabrielVicente-GT',
    receptorFirstname: 'Gabriel',
    receptorLastname: 'Vicente',
    lastMessage: 'Bro, fijate que hay qué trabajar bastante en Bases de Datos',
    lastMessageTime: '23:36',
    unread: true
  },
  {
    id: 2,
    profileColor: '#C2F6FF',
    receptor: 'GabrielVicente-GT',
    receptorFirstname: 'Gabriel',
    receptorLastname: 'Vicente',
    lastMessage: 'Bro, fijate que hay qué trabajar bastante en Bases de Datos',
    lastMessageTime: '23:36',
    unread: true
  },
  {
    id: 2,
    profileColor: '#C2F6FF',
    receptor: 'GabrielVicente-GT',
    receptorFirstname: 'Gabriel',
    receptorLastname: 'Vicente',
    lastMessage: 'Bro, fijate que hay qué trabajar bastante en Bases de Datos',
    lastMessageTime: '23:36',
    unread: true
  },
  {
    id: 2,
    profileColor: '#C2F6FF',
    receptor: 'GabrielVicente-GT',
    receptorFirstname: 'Gabriel',
    receptorLastname: 'Vicente',
    lastMessage: 'Bro, fijate que hay qué trabajar bastante en Bases de Datos',
    lastMessageTime: '23:36',
    unread: true
  },
  {
    id: 2,
    profileColor: '#C2F6FF',
    receptor: 'GabrielVicente-GT',
    receptorFirstname: 'Gabriel',
    receptorLastname: 'Vicente',
    lastMessage: 'Bro, fijate que hay qué trabajar bastante en Bases de Datos',
    lastMessageTime: '23:36',
    unread: true
  },
  {
    id: 2,
    profileColor: '#C2F6FF',
    receptor: 'GabrielVicente-GT',
    receptorFirstname: 'Gabriel',
    receptorLastname: 'Vicente',
    lastMessage: 'Bro, fijate que hay qué trabajar bastante en Bases de Datos',
    lastMessageTime: '23:36',
    unread: true
  },
  {
    id: 2,
    profileColor: '#C2F6FF',
    receptor: 'GabrielVicente-GT',
    receptorFirstname: 'Gabriel',
    receptorLastname: 'Vicente',
    lastMessage: 'Bro, fijate que hay qué trabajar bastante en Bases de Datos',
    lastMessageTime: '23:36',
    unread: true
  },
  {
    id: 2,
    profileColor: '#C2F6FF',
    receptor: 'GabrielVicente-GT',
    receptorFirstname: 'Gabriel',
    receptorLastname: 'Vicente',
    lastMessage: 'Bro, fijate que hay qué trabajar bastante en Bases de Datos',
    lastMessageTime: '23:36',
    unread: true
  },
  {
    id: 2,
    profileColor: '#C2F6FF',
    receptor: 'GabrielVicente-GT',
    receptorFirstname: 'Gabriel',
    receptorLastname: 'Vicente',
    lastMessage: 'Bro, fijate que hay qué trabajar bastante en Bases de Datos',
    lastMessageTime: '23:36',
    unread: true
  },
  {
    id: 2,
    profileColor: '#C2F6FF',
    receptor: 'GabrielVicente-GT',
    receptorFirstname: 'Gabriel',
    receptorLastname: 'Vicente',
    lastMessage: 'Bro, fijate que hay qué trabajar bastante en Bases de Datos',
    lastMessageTime: '23:36',
    unread: true
  },
  {
    id: 2,
    profileColor: '#C2F6FF',
    receptor: 'GabrielVicente-GT',
    receptorFirstname: 'Gabriel',
    receptorLastname: 'Vicente',
    lastMessage: 'Bro, fijate que hay qué trabajar bastante en Bases de Datos',
    lastMessageTime: '23:36',
    unread: true
  },
  {
    id: 2,
    profileColor: '#C2F6FF',
    receptor: 'GabrielVicente-GT',
    receptorFirstname: 'Gabriel',
    receptorLastname: 'Vicente',
    lastMessage: 'Bro, fijate que hay qué trabajar bastante en Bases de Datos',
    lastMessageTime: '23:36',
    unread: true
  },
  {
    id: 2,
    profileColor: '#C2F6FF',
    receptor: 'GabrielVicente-GT',
    receptorFirstname: 'Gabriel',
    receptorLastname: 'Vicente',
    lastMessage: 'Bro, fijate que hay qué trabajar bastante en Bases de Datos',
    lastMessageTime: '23:36',
    unread: true
  },
  {
    id: 2,
    profileColor: '#C2F6FF',
    receptor: 'GabrielVicente-GT',
    receptorFirstname: 'Gabriel',
    receptorLastname: 'Vicente',
    lastMessage: 'Bro, fijate que hay qué trabajar bastante en Bases de Datos',
    lastMessageTime: '23:36',
    unread: true
  },
  {
    id: 2,
    profileColor: '#C2F6FF',
    receptor: 'GabrielVicente-GT',
    receptorFirstname: 'Gabriel',
    receptorLastname: 'Vicente',
    lastMessage: 'Bro, fijate que hay qué trabajar bastante en Bases de Datos',
    lastMessageTime: '23:36',
    unread: true
  },
  {
    id: 2,
    profileColor: '#C2F6FF',
    receptor: 'GabrielVicente-GT',
    receptorFirstname: 'Gabriel',
    receptorLastname: 'Vicente',
    lastMessage: 'Bro, fijate que hay qué trabajar bastante en Bases de Datos',
    lastMessageTime: '23:36',
    unread: true
  },
  {
    id: 2,
    profileColor: '#C2F6FF',
    receptor: 'GabrielVicente-GT',
    receptorFirstname: 'Gabriel',
    receptorLastname: 'Vicente',
    lastMessage: 'Bro, fijate que hay qué trabajar bastante en Bases de Datos',
    lastMessageTime: '23:36',
    unread: true
  }
]

const MainPage = () => {
  const { user, setUser } = useContext(UserContext)

  const [isSearchingUser, setIsSearchingUser] = useState(false)
  const [searchedUser, setSearchedUser] = useState(null)

  return (
    <div className="main-page">
      <header>
        <Link to="/login">
          <img 
            className="main-page-logout-icon"
            src={LogoutIcon}
            alt="Logout Icon"
            onClick={() => setUser({ })}
          />
        </Link>
        <Link to="/profile">
          <img
            className="main-page-profile-picture"
            src={user.picture}
          />
        </Link>
        <img
          className="main-page-add-contact-icon"
          src={AddContactIcon}
          alt="Add Contact Icon"
          onClick={() => setIsSearchingUser(true)}
        />
      </header>
      <section>

        <aside>
          {chats.map((chat) => (
            <ChatSpan 
              key={chat.id}
              onClick={() => console.log('Chat clicked')}
              profilePicture={chat.picture}
              receptor={chat.receptor}
              lastMessage={chat.lastMessage}
              lastMessageTime={chat.lastMessageTime}
              unread={chat.unread}
            />
          ))}
        </aside>

      </section>
      {(isSearchingUser) ? (
        <div className="add-contact-background">
          <div className="add-contact-card">
            <button onClick={() => setIsSearchingUser(false)}>Cerrar</button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MainPage
