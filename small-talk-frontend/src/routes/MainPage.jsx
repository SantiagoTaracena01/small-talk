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
  const [users, setUsers] = useState()
  const [isSearchingUser, setIsSearchingUser] = useState(false)
  const [searchedUser, setSearchedUser] = useState(null)

  // get users in db
  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`)
      const data = await response.json()
      setUsers(data)
    }
    getUsers()
  }, [])

  const handleLogout = async () => {
    setUser({ })
    await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: null,
        firstname: null,
        lastname: null,
        password: null,
        contacts: null,
        picture: null,
        logged: false,
      })
    })
  }

  const handleAddContact = async () => {
    const foundUser = users.find((user) => (user.username === searchedUser))
    await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: null,
        firstname: null,
        lastname: null,
        password: null,
        contacts: [...user.contacts, foundUser._id],
        picture: null,
        logged: false,
      })
    })
  }

  return (
    <div className="main-page">
      <header>
        <Link to="/login">
          <img
            className="main-page-logout-icon"
            src={LogoutIcon}
            alt="Logout Icon"
            onClick={handleLogout}
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
            <input
              className="add-contact-input-user"
              type="text"
              id="username-add"
              placeholder="Username que deseas agregar"
              onChange={(event) => setSearchedUser(event.target.value)}
            />
            <p className='DYM-text'>Quieres decir...</p>
            <div className='add-contact-did-you-mean-container'>
              {dymSuggestions.map((suggestion) => (
                <p className='suggestion-inside-add-contact'>{suggestion.userN}</p>
              ))}
            </div>
            <div className='container-btns'>
              <button className="close-btn" onClick={handleAddContact}>Accept</button>
              <button className='close-btn' onClick={() => setIsSearchingUser(false)}>Close</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MainPage
