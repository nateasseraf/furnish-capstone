import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Profile() {
  const { user, updateProfile, changePassword } = useAuth()

  const [firstName, setFirstName] = useState(user.firstName || '')
  const [lastName, setLastName] = useState(user.lastName || '')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleProfileSubmit = (e) => {
    e.preventDefault()

    updateProfile({
      firstName,
      lastName,
    })

    setMessage('Profile updated.')
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()

    if (!newPassword) {
      setMessage('Enter a new password.')
      return
    }

    changePassword(newPassword)
    setNewPassword('')
    setMessage('Password updated.')
  }

  return (
    <section>
      <h2>Profile</h2>
      <p>Manage your account information.</p>

      {message && <p>{message}</p>}

      <form className="form-card" onSubmit={handleProfileSubmit}>
        <h3>Account Details</h3>

        <label>
          Email
          <input type="email" value={user.email} disabled />
        </label>

        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <button type="submit">Save Profile</button>
      </form>

      <form className="form-card" onSubmit={handlePasswordSubmit}>
        <h3>Change Password</h3>

        <label>
          New Password
          <input
            type="password"
            placeholder="Enter a new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>

        <button type="submit">Update Password</button>
      </form>
    </section>
  )
}

export default Profile