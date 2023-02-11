import { NavLink } from 'react-router-dom'
import { useUserContext } from './UserContext'

function Nav() {
  const userLoggedIn = useUserContext()
  return (
    <div>
      {userLoggedIn
        ? <div>
            <h1>logout</h1>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/new-trip">New Trip</NavLink>
            <NavLink to="/drafts">Drafts</NavLink>
            <NavLink to="/plans">Plans</NavLink>
            <NavLink to="/cities">Cities</NavLink>
          </div>
      :   <div>
            <NavLink to="/login">Login</NavLink>
          </div>}
    </div>
  )
}

export default Nav