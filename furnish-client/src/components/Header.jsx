import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Header() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header>
      <h1>Furnish</h1>

      {user ? (
        <div className="account-menu">
          <button onClick={() => setIsOpen(!isOpen)}>
            Hey {user.firstName} ▾
          </button>

          {isOpen && (
            <div className="dropdown">
              <Link to="/profile">Profile</Link>
              <button onClick={logout}>Log out</button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login">Log In</Link>
      )}
    </header>
  )
}

export default Header