import { useUserContext } from './UserContext'

function Profile() {
  const user = useUserContext()

  return (
    <div>Profile</div>
  )
}

export default Profile