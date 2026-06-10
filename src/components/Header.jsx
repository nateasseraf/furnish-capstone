import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.png'

function Header() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header>
      <Link to="/" className="logo-link">
        <img src={logo} alt="Furnish logo" className="logo-image" />
      </Link>

      {user ? (
        <div className="account-menu">
          <button onClick={() => setIsOpen(!isOpen)}>
            Hey {user.firstName} ▾
          </button>

          {isOpen && (
            <div className="dropdown">
              <Link to="/profile" onClick={() => setIsOpen(false)}>
                Profile
              </Link>

              <button
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
              >
                Log out
              </button>
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