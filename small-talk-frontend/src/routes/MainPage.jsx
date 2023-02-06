import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../providers/UserProvider'

const MainPage = () => {
  const { user } = useContext(UserContext)

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}`)
      const data = await response.json()
    }
    getUser()
  }, [])

  return (
    <div>
      <h1>Main Page</h1>
      <p>Welcome, {user._id}</p>
      <Link to="/profile">Profile</Link>
    </div>
  )
}

export default MainPage
