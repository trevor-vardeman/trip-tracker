import { NavLink } from 'react-router-dom'
import { useUserContext, useUserLogoutUpdate } from './UserContext'

function Nav() {
  const userLoggedIn = useUserContext()
  const logout = useUserLogoutUpdate()

  return (
    <div>
      {userLoggedIn
        ? <div>
            <button onClick={logout}>logout</button>
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