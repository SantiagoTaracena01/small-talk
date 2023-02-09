import React, { useContext, useState } from 'react'
import { UserContext } from '../providers/UserProvider'
import '../styles/profile-page.sass'

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext)

  const [updating, setUpdating] = useState(false)
  const [updatedFirstname, setUpdatedFirstname] = useState(null)
  const [updatedLastname, setUpdatedLastname] = useState(null)
  const [updatedPassword, setUpdatedPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState()

  const updateFields = async () => {
    if (user.password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: updatedFirstname,
        lastname: updatedLastname,
        password: updatedPassword
      })
    })

    if (response.status === 200) {
      alert('Account updated')
      setUpdating(!updating)
      setUser(await response.json())
    } else {
      alert('Error updating account')
    }
  }

  return (
    <main>
      <h1>{`${user.firstname} ${user.lastname}`}</h1>
      <p>Username: {user.username}</p>
      <button onClick={() => setUpdating(true)}>Update</button>
      {(updating) ? (
        <div className="account-update-popup-bg">
          <div className="account-update-popup-card">
            <h2>Update Account</h2>
            <div className="account-update-option-pair">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firstname"
                defaultValue={user.firstname}
                onChange={(event) => setUpdatedFirstname(event.target.value)}
              />
            </div>
            <div className="account-update-option-pair">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                id="lastname"
                defaultValue={user.lastname}
                onChange={(event) => setUpdatedLastname(event.target.value)}
              />
            </div>
            <div className="account-update-option-pair">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(event) => setUpdatedPassword(event.target.value)}
              />
            </div>
            <div className="account-update-option-pair">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            <button onClick={updateFields}>Update</button>
            <button onClick={() => setUpdating(false)}>Close</button>
          </div>
        </div>
      ) : null}
    </main>
  )
}

export default ProfilePage
