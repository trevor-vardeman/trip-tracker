import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import { Link } from 'react-router-dom'
import { useUserLogin } from '../context/UserContext'

function Login() {
  const login = useUserLogin()

  const handleLogin = e => {
    e.preventDefault()
    login(e.target.form[0].value, e.target.form[1].value)
  }

  return (
    <Stack gap={3} className="definite-center">
      <Stack gap={3}>
        <h1>Sign in to Trip Tracker</h1>
        <Form>
          <Form.Group controlId="usernameForm">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username"/>
          </Form.Group>

          <Form.Group controlId="passwordForm">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" autoComplete="on"/>
          </Form.Group><br></br>
          <Button variant="dark" type="submit" onClick={(e) => handleLogin(e)}>Sign In</Button>
        </Form>
        <p>New to Trip Tracker? <Link to="/register">Register</Link></p>
      </Stack>
    </Stack>
  )
}

export default Login