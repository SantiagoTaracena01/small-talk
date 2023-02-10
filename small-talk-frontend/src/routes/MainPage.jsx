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
    profileColor: '#FFBD44',
    receptor: 'MaJu502',
    receptorFirstname: 'Marco',
    receptorLastname: 'Jurado',
    lastMessage: 'Hola, ¿cómo estás?',
    lastMessageTime: '23:45',
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
const dymSuggestions = [
  {
    id: 1,
    userN: 'Gabo'
  },
  {
    id: 1,
    userN: 'Bidkoin'
  },
  {
    id: 1,
    userN: 'Hector'
  }
]

const MainPage = () => {
  const { user, setUser } = useContext(UserContext)
  //const [dymSuggestions, setDymSuggestions] = useState(false)

  const [isSearchingUser, setIsSearchingUser] = useState(false)
  const [searchedUser, setSearchedUser] = useState(null)

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
        <Link to="/login">
          <img 
            className="main-page-logout-icon"
            src={LogoutIcon}
            alt="Logout Icon"
            onClick={() => setUser({ })}
          />
        </Link>
        <Link to="/profile">
          <div
            className="main-page-profile-color"
            style={{ backgroundColor: '#2286DD' }}
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
              profileColor={chat.profileColor}
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
            <div className='add-contact-profile-color' />
            <input className='add-contact-input-user' type="text" id="username-add" placeholder="Username que deseas agregar" onChange={(event) => setSearchedUser(event.target.value)}/>
            <p className='DYM-text'>Quieres decir...</p>
            <div className='add-contact-did-you-mean-container'>
              {dymSuggestions.map((suggestion) => (
                <p className='suggestion-inside-add-contact'>{suggestion.userN}</p>
              ))}
            </div>
            <button className='close-btn' onClick={() => setIsSearchingUser(false)}>Cerrar</button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MainPage
