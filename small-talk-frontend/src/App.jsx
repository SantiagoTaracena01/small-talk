import React, { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const App = () => {
  const [users, setUsers] = useState()

  const getUsers = async () => {
    const response = await fetch(`${API_URL}/users`)
    const data = await response.json()
    setUsers(data)
  }

  return (
    <div>
      <button onClick={getUsers}>Get Users</button>
      {users && users.map((user) => (
        <div key={user._id}>
          <h3>{`${user.username}#${user.tag}`}</h3>
        </div>
      ))}
    </div>
  )
}

export default App
