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
            <NavLink to="/profile"><img href="" className="circle" src={`https://storage.cloud.google.com/flatiron-travel-app/${user.avatar.toString()}`} alt="userAvatar"/></NavLink>
            <NavLink to="/new-trip">New Trip</NavLink>
            <NavLink to="/drafts">Drafts</NavLink>
            <NavLink to="/plans">Plans</NavLink>
            <NavLink to="/cities">Cities</NavLink>
            <button className="small-button" onClick={logout}>logout</button>
          </Stack>
      :   <Stack>
            <NavLink to="/register">Sign in</NavLink>
          </Stack>}
    </Stack>
  )
}

export default Nav