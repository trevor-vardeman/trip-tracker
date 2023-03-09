import { NavLink } from 'react-router-dom'
import { useUserContext, useUserLogout } from '../context/UserContext'
import Stack from 'react-bootstrap/Stack'

function Nav() {
  const user = useUserContext()
  const logout = useUserLogout()

  if (user) {
    return (
      <Stack className="nav" direction="horizontal" gap={3}>
        {user.avatar ? <NavLink to="/profile"><img href="" className="profile-avatar" src={`https://storage.cloud.google.com/flatiron-travel-app/${user.avatar.toString()}`} alt="userAvatar"/></NavLink> : <NavLink to="/profile">Profile</NavLink>}
        <NavLink to="/new-trip">New Trip</NavLink>
        <NavLink to="/drafts">Drafts</NavLink>
        <NavLink to="/plans">Plans</NavLink>
        <NavLink to="/cities">Cities</NavLink>
        <NavLink to="/tags">Tags</NavLink>
        <button className="small-button" onClick={logout}>logout</button>
      </Stack>
    )
  } else return null
}

export default Nav