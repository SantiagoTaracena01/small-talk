import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ChatSpan from './components/ChatSpan'
import { UserContext } from '../providers/UserProvider'
import LogoutIcon from '../assets/icons/logout.png'
import AddContactIcon from '../assets/icons/add-contact.png'
import '../styles/main-page.sass'

const MainPage = () => {
  const { user, setUser } = useContext(UserContext)

  const [users, setUsers] = useState()
  const [isSearchingUser, setIsSearchingUser] = useState(false)
  const [searchedUser, setSearchedUser] = useState(null)
  const [userChats, setUserChats] = useState()

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`)
      const data = await response.json()
      setUsers(data)
    }
    getUsers()
  }, [])

  useEffect(() => {
    if (!users) return
    const chats = []
    user.contacts.forEach((contact) => {
      const foundChat = users.find((user) => (user._id === contact))
      chats.push(foundChat)
    })
    setUserChats(chats)
  }, [users])

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
          {userChats && userChats.map((userChat) => (
            <ChatSpan
              key={userChat._id}
              onClick={() => console.log('Chat clicked')}
              profilePicture={userChat.picture}
              receptor={`${userChat.firstname} ${userChat.lastname}`}
              lastMessage={'Hola bro'}
              lastMessageTime={`${new Date().getHours()}:${new Date().getMinutes()}`}
              unread={true}
            />
          ))}
        </aside>
      </section>
      {(isSearchingUser) ? (
        <div className="add-contact-background">
          <div className="add-contact-card">
            <h2>Add a new contact by username</h2>
            <input
              type="text"
              placeholder="Username"
              onChange={(event) => setSearchedUser(event.target.value)}
            />
            <div className="add-contact-button-container">
              <button onClick={handleAddContact}>Accept</button>
              <button onClick={() => setIsSearchingUser(false)}>Close</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MainPage
