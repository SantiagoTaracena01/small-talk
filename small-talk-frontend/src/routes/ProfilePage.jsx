import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../providers/UserProvider'
import LeftArrowIcon from '../assets/icons/left-arrow.png'
import '../styles/profile-page.sass'

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [updating, setUpdating] = useState(false)
  const [updatedPictureUrl, setUpdatedPictureUrl] = useState(null)
  const [updatedFirstname, setUpdatedFirstname] = useState(null)
  const [updatedLastname, setUpdatedLastname] = useState(null)
  const [updatedPassword, setUpdatedPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState()
  const [deleting, setDeleting] = useState(false)
  const [deletingPassword, setDeletingPassword] = useState(null)

  const updateFields = async () => {
    if (user.password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    console.log(updatedPictureUrl)

    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: updatedFirstname,
        lastname: updatedLastname,
        password: updatedPassword,
        picture: updatedPictureUrl,
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

  const deleteCurrentUser = async () => {
    if (user.password !== deletingPassword) {
      alert('Passwords do not match')
      return
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}`, {
      method: 'DELETE'
    })
    if (response.status === 200) {
      alert('Account deleted')
      setDeleting(!deleting)
      setUser({ })
      navigate('/login')
    } else {
      alert('Error deleting account')
    }
  }

  return (
    <main>
      <Link to="/chat">
        <img
          className="left-arrow-icon"
          src={LeftArrowIcon}
        />
      </Link>
      <div className="profile-card">
        <img
          className="profile-picture"
          src={user.picture}
        />
        <h2>{`${user.firstname} ${user.lastname}`}</h2>
        <p>Username: {user.username}</p>
        <div className="button-pair">
          <button onClick={() => setUpdating(true)}>Update</button>
          <button onClick={() => setDeleting(true)}>Delete</button>
        </div>
      </div>
      {(updating) ? (
        <div className="account-update-popup-bg">
          <div className="account-update-popup-card">
            <h2>Update Account</h2>
            <div className="account-update-form">
              <div className="account-update-option-pair">
                <label htmlFor="profile-picture">Profile Picture</label>
                <input
                  type="text"
                  id="profile-picture"
                  defaultValue={user.picture}
                  onChange={(event) => {
                    console.log('URL', event.target.value)
                    setUpdatedPictureUrl(event.target.value)
                  }}
                />
              </div>
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
            </div>
            <div className="account-update-button-pair">
              <button onClick={updateFields}>Update</button>
              <button onClick={() => setUpdating(false)}>Close</button>
            </div>
          </div>
        </div>
      ) : null}
      {(deleting) ? (
        <div className="account-delete-popup-bg">
          <div className="account-delete-popup-card">
            <h2>Delete Account</h2>
            <p>Are you sure you want to delete your account?</p>
            <div className="account-delete-form">
              <label>Password</label>
              <input
                type="password"
                onChange={(event) => setDeletingPassword(event.target.value)}
              />
            </div>
            <div className="account-delete-button-pair">
              <button onClick={deleteCurrentUser}>Delete</button>
              <button onClick={() => setDeleting(false)}>Close</button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}

export default ProfilePage
