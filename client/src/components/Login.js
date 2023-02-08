import { useUserContext, useUserLoginUpdate, useUserLogoutUpdate } from './UserContext'

function Login() {
  const handleLogin = useUserLoginUpdate()
  const handleLogout = useUserLogoutUpdate()
  const userLoggedIn = useUserContext()

  return (
    <div>
      <p>User Logged In? {userLoggedIn}</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Login