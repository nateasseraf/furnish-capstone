import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('furnishUser')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const register = (firstName, email, password) => {
    const newUser = {
      firstName,
      lastName: '',
      email,
      password,
    }

    localStorage.setItem('furnishUser', JSON.stringify(newUser))
    setUser(newUser)
  }

  const login = (email, password) => {
    const savedUser = JSON.parse(localStorage.getItem('furnishUser'))

    if (
      savedUser &&
      savedUser.email === email &&
      savedUser.password === password
    ) {
      setUser(savedUser)
      return true
    }

    return false
  }

  const updateProfile = (updatedProfile) => {
    const updatedUser = {
      ...user,
      ...updatedProfile,
    }

    localStorage.setItem('furnishUser', JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  const changePassword = (newPassword) => {
    const updatedUser = {
      ...user,
      password: newPassword,
    }

    localStorage.setItem('furnishUser', JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  const logout = () => {
    localStorage.removeItem('furnishUser')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        updateProfile,
        changePassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}