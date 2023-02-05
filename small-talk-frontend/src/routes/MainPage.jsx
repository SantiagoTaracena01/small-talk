import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../providers/UserProvider'

const MainPage = () => {
  const { user } = useContext(UserContext)

  const [loggedUser, setLoggedUser] = useState({ ...user })

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${loggedUser._id}`)
      const data = await response.json()
      console.log(data)
    }
    getUser()
  }, [])

  return (
    <div>
      <h1>Main Page</h1>
      <p>Welcome, {loggedUser._id}</p>
      <button onClick={() => console.log("Hello!")}>Click</button>
    </div>
  )
}

export default MainPage
