import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import SmallTalkLogo from '../assets/images/small-talk-logo.png'
import '../styles/sign-up-page.sass'

const SignUpPage = () => {
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const handleSignUp = async (event) => {
    event.preventDefault()
    if (password === confirmPassword) {
      const user = {
        username,
        firstName,
        lastName,
        password,
      }
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const data = await response.json()
      console.log(data)
      navigate('/login')
    } else {
      console.log('Passwords do not match')
    }
  }

  return (
    <main>
      <div className="sign-up-container">
        <div className="sign-up-icon-container">
          <img src={SmallTalkLogo} alt="Small Talk Logo" />
          <h1>Sign Up to Small Talk</h1>
        </div>
        <div className="sign-up-form">
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="text"
            id="first-name"
            placeholder="First Name"
            onChange={(event) => setFirstName(event.target.value)}
          />
          <input
            type="text"
            id="last-name"
            placeholder="Last Name"
            onChange={(event) => setLastName(event.target.value)}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm Password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <button onClick={handleSignUp}>Sign Up</button>
        <p>
          If you have an account, you can <Link to="/login">Log In</Link>
        </p>
      </div>
    </main>
  )
}

export default SignUpPage
