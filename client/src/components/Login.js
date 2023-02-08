import { useUserContext, useUserLoginUpdate, useUserLogoutUpdate } from './UserContext'

function Login() {
  const handleLogin = useUserLoginUpdate()
  const handleLogout = useUserLogoutUpdate()
  const userLoggedIn = useUserContext()

  console.log(`User Logged In? ${userLoggedIn}`)

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Login