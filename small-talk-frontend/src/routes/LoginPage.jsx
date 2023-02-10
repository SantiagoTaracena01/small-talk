import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../providers/UserProvider'
import SmallTalkLogo from '../assets/images/small-talk-logo.png'
import '../styles/login-page.sass'

const LoginPage = () => {
  const [users, setUsers] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`)
      const data = await response.json()
      setUsers(data)
    }
    getUsers()
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    const user = users.find((user) => (user.username === username))
    if (user) {
      if (user.password === password) {
        setUser(user)
        navigate('/chat')
      } else {
        console.log('Wrong password')
      }
    } else {
      console.log('User not found')
    }
  }

  return (
    <main>
      <div className="login-container">
        <div className="login-icon-container">
          <img src={SmallTalkLogo} alt="Small Talk Logo" />
          <h1>Welcome to Small Talk</h1>
        </div>
        <div className="login-form">
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Log In</button>
        <p>
          Or you might want to <Link to="/sign-up">Sign Up</Link> instead
        </p>
      </div>
    </main>
  )
}

export default LoginPage
