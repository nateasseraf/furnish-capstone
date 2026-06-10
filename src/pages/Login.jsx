import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email || !password) {
      setMessage('Please enter your email and password.')
      return
    }

    const loginSuccessful = login(email, password)

    if (!loginSuccessful) {
      setMessage('Invalid email or password.')
      return
    }

    navigate('/')
  }

  return (
    <section>
      <h2>Log In</h2>
      <p>Log in to manage your rooms, furniture items, and budget.</p>

      <form className="form-card" onSubmit={handleSubmit}>
        {message && <p className="error-message">{message}</p>}

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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Log In</button>

        <p>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </section>
  )
}

export default Login