import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ChatSpan from './components/ChatSpan'
import Message from './components/Message'
import Alert from './components/Alert'
import { UserContext } from '../providers/UserProvider'
import LogoutIcon from '../assets/icons/logout.png'
import AddContactIcon from '../assets/icons/add-contact.png'
import SmallTalkLogo from '../assets/images/small-talk-logo.png'
import '../styles/main-page.sass'

const hour = (mongoDate) => {
  const date = new Date(mongoDate)
  const hours = date.getHours()
  const minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes()
  return `${hours}:${minutes}`
}

const MainPage = () => {
  const { user, setUser } = useContext(UserContext)

  const [users, setUsers] = useState([])
  const [isSearchingUser, setIsSearchingUser] = useState(false)
  const [searchedUser, setSearchedUser] = useState(null)
  const [userChats, setUserChats] = useState()
  const [chat, setChat] = useState()
  const [chatReceiver, setChatReceiver] = useState()
  const [message, setMessage] = useState()
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`)
      const data = await response.json()
      setUsers(data)
    }
    getUsers()
  }, [])

  useEffect(() => {
    const getUserChats = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/messages/${user._id}`)
      const data = await response.json()
      setUserChats(data)
    }
    getUserChats()
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
    await fetch(`${import.meta.env.VITE_API_URL}/users/add-contact/${user._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ contactId: foundUser._id })
    })
    await fetch(`${import.meta.env.VITE_API_URL}/users/add-contact/${foundUser._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ contactId: user._id })
    })
    setAlert(true)
  }

  const selectAndLoadChat = async (userId) => {
    setChatReceiver(userId)
    const selectedChat = await fetch(`${import.meta.env.VITE_API_URL}/messages/${user._id}/${userId}`)
    const data = await selectedChat.json()
    setChat(data)
  }

  const sendMessage = async () => {
    const newMessage = {
      sender: user._id,
      receiver: chatReceiver,
      content: {
        text: message,
        date: new Date()
      }
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
    })
    const data = await response.json()
    setChat([data, ...chat])
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
          {userChats && userChats.length && userChats.map((userChat) => (
            <ChatSpan
              key={userChat._id}
              onClick={() => selectAndLoadChat(userChat._id)}
              profilePicture={userChat.picture}
              receptor={`${userChat.firstname} ${userChat.lastname}`}
              lastMessage={`${userChat.lastMessage.content?.text || 'Start a new chat!'}`}
              lastMessageTime={`${hour(userChat.lastMessage.content?.date) || 'Now'}`}
            />
          ))}
        </aside>
        <div className="chat-section">
          <div className="chat-page">
            {(chat && chat.length) ? (
              <div className="chat-page-chat">
                {chat.map((message) => (
                  <Message
                    key={message._id}
                    messageId={message._id}
                    message={message.content.text}
                    hour={hour(message.content.date)}
                    isSender={message.sender === user._id}
                  />
                ))}
              </div>
            ) : (
              <div className="chat-page-welcome">
                <img
                  src={SmallTalkLogo}
                  alt="Small Talk Logo"
                />
                <div className="chat-text-container">
                  <h1>Welcome to Small Talk!</h1>
                  <h2>Start a new chat by clicking on a contact or adding one</h2>
                </div>
              </div>
            )}
          </div>
          <div className="chat-input">
            {(chat) ? (
              <>
                <input
                  type="text"
                  placeholder="Type a message..."
                  onChange={(event) => setMessage(event.target.value)}
                />
                <button onClick={sendMessage}>Send</button> 
              </>    
            ) : null}
          </div>
        </div>
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
      {(alert) ? <Alert message="Contact has been added" setTrigger={setAlert} /> : null}
    </div>
  )
}

export default MainPage
