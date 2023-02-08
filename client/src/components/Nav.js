import { NavLink } from 'react-router-dom'

function Nav() {
  return (
    <div>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/new-trip">New Trip</NavLink>
      <NavLink to="/drafts">Drafts</NavLink>
      <NavLink to="/plans">Plans</NavLink>
      <NavLink to="/cities">Cities</NavLink>
    </div>
  )
}

export default Nav