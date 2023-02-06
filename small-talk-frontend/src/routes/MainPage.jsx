import React, { useContext, useEffect } from 'react'
import { UserContext } from '../providers/UserProvider'

const MainPage = () => {
  const { user } = useContext(UserContext)

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
      <p>Welcome, {user._id}</p>
      <button onClick={() => console.log("Hello!")}>Click</button>
    </div>
  )
}

export default MainPage
