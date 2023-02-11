import { useState } from 'react'
import { useUserRegister, useUserLogin } from './UserContext'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

function Login() {
  const login = useUserLogin()
  const register = useUserRegister()
  const [signIn, setSignIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  console.log("Do you need state here for username/password, or just send it when the form is submitted?")

  const handleLogin = e => {
    e.preventDefault()
    login(username, password)
  }

  const handleSignUp = e => {
    e.preventDefault()
    register(username, password, passwordConfirmation)
  }

  return (
    <Stack gap={3} className="sign-in-form">
      {signIn
        ? <Stack gap={3}>
            <h1>Sign in to Travel</h1>
            <Form>
              <Form.Group controlId="usernameForm">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="passwordForm">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" autoComplete="on" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
            </Form>
            <Button variant="dark" type="submit" onClick={(handleLogin)}>Sign In</Button>
            <p>New to Travel? <Alert.Link onClick={() => setSignIn(false)}>Register</Alert.Link></p>
          </Stack>
        : <Stack gap={3}>
            <h1>Sign up for Travel</h1>
            <Form>
              <Form.Group controlId="usernameForm">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="passwordForm">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" autoComplete="on" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="passwordConfirmationForm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" autoComplete="on" placeholder="Password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
              </Form.Group>
            </Form>
            <Button variant="dark" type="submit" onClick={handleSignUp}>Sign Up</Button>
            <p>Already have an account? <Alert.Link onClick={() => setSignIn(true)}>Sign in</Alert.Link></p>
          </Stack>
      }
    </Stack>
  )
}

export default Login