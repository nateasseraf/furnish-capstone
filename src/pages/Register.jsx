import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!firstName || !lastName || !email || !password) {
      setMessage('Please complete all required fields.')
      return
    }

    register(firstName, lastName, email, password)
    navigate('/')
  }

  return (
    <section>
      <h2>Register</h2>
      <p>Create an account to start planning your apartment.</p>

      <form className="form-card" onSubmit={handleSubmit}>
        {message && <p className="error-message">{message}</p>}

        <label>
          First Name
          <input
            type="text"
            required
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label>
          Last Name
          <input
            type="text"
            required
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            required
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            required
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Create Account</button>

        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </section>
  )
}

export default Register