import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { FurnishProvider } from './context/FurnishContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <FurnishProvider>
        <App />
      </FurnishProvider>
    </AuthProvider>
  </StrictMode>,
)