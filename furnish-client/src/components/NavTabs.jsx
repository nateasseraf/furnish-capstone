import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function NavTabs() {
  const { user } = useAuth()

  return (
    <nav>
      <NavLink to="/">Home</NavLink>

      {user ? (
        <>
          <NavLink to="/rooms">By Room</NavLink>
          <NavLink to="/add-item">Add Item</NavLink>
          <NavLink to="/budget">Budget</NavLink>
        </>
      ) : (
        <>
          <span className="disabled-tab">By Room 🔒</span>
          <span className="disabled-tab">Add Item 🔒</span>
          <span className="disabled-tab">Budget 🔒</span>
        </>
      )}
    </nav>
  )
}

export default NavTabs