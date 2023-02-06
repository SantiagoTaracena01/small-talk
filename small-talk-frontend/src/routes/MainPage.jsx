import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import SmallTalkLogo from '../assets/images/small-talk-logo.png'
import Chatbox from '../components/chatbox.jsx'
import '../styles/main-page.sass'
import ChatGrid from '../components/chatInGrid.jsx'

/*
const handleGetChats = (setAllChats) => {
  const requestOptions = {
    method: 'GET'
    redirect: 'follow'
  }

  fetch
}
*/

const MainPage = () => {
  const [users, setUsers] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [idSelectedChat, setIdSelectedChat] = useState()
  const [selectedChat, setSelectedChat] = useState()
  const [allChats, setAllChats] = useState()
  const navigate = useNavigate()

  // area para handles
  useEffect(() => {
    try{
      handleGetChats(setAllChats)
    } catch {
      console.log('Error obteniendo chats')
    }
  }, [])


  return(
    <main>
      <div className='colored-top' />
      <div className='chatbox-container'>
        <div className='Conversations'>
          <div className='userInfo'>
            <div className='usernName'>
              {username}
            </div>
            <button className='newChat'>
              <img src='https://static.thenounproject.com/png/1970202-200.png' alt='newchat' className='newChat-img'/>
            </button>
          </div>
          <div className='active-chats'>
            {
              allChats
              && allChats.map((chat,index) => (
                <ChatGrid
                  chatId={chat.chatid}
                  sender={chat.nombre}
                  lastTime={chat.tiempo}
                  setIdSelectedChat={setIdSelectedChat}
                  setSelectedChat={setSelectedChat}
                />
              ))
            }
          </div>
        </div>
        <Chatbox 
          chatId={idSelectedChat}
        />
      </div>
    </main>
  )
}

export default MainPage
