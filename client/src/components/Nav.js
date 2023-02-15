import { NavLink } from 'react-router-dom'
import { useUserContext, useUserLogout } from './UserContext'
import Stack from 'react-bootstrap/Stack'

function Nav() {
  const user = useUserContext()
  const logout = useUserLogout()

  return (
    <Stack gap={3}>
      {user
        ? <Stack gap={3}>
            <button onClick={logout}>logout</button>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/new-trip">New Trip</NavLink>
            <NavLink to="/drafts">Drafts</NavLink>
            <NavLink to="/plans">Plans</NavLink>
            <NavLink to="/cities">Cities</NavLink>
          </Stack>
      :   <Stack>
            <NavLink to="/register">Sign in</NavLink>
          </Stack>}
    </Stack>
  )
}

export default Nav