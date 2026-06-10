import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const success = login(email, password)

    if (success) {
      navigate('/')
    } else {
      setError('Invalid login. Please try again or register.')
    }
  }

  return (
    <section>
      <h2>Log In</h2>
      <p>Log in to manage your rooms, furniture items, and budget.</p>

      <form className="form-card" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <label>
          Email
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Log In</button>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </section>
  )
}

export default Login