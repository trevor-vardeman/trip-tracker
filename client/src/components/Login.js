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

  const handleLogin = e => {
    e.preventDefault()
    login(e.target.form[0].value, e.target.form[1].value)
  }

  const handleSignUp = e => {
    e.preventDefault()
    register(e.target.form[0].value, e.target.form[1].value, e.target.form[2].value)
  }

  return (
    <Stack gap={3} className="sign-in-form">
      {signIn
        ? <Stack gap={3}>
            <h1>Sign in to Travel</h1>
            <Form>
              <Form.Group controlId="usernameForm">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username"/>
              </Form.Group>

              <Form.Group controlId="passwordForm">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" autoComplete="on"/>
              </Form.Group>
              <Button variant="dark" type="submit" onClick={(e) => handleLogin(e)}>Sign In</Button>
            </Form>
            <p>New to Travel? <Alert.Link onClick={() => setSignIn(false)}>Register</Alert.Link></p>
          </Stack>
        : <Stack gap={3}>
            <h1>Sign up for Travel</h1>
            <Form>
              <Form.Group controlId="usernameForm">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username"/>
              </Form.Group>

              <Form.Group controlId="passwordForm">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" autoComplete="on" placeholder="Password"/>
              </Form.Group>

              <Form.Group controlId="passwordConfirmationForm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" autoComplete="on" placeholder="Password"/>
              </Form.Group>
              <Button variant="dark" type="submit" onClick={handleSignUp}>Sign Up</Button>
            </Form>
            <p>Already have an account? <Alert.Link onClick={() => setSignIn(true)}>Sign in</Alert.Link></p>
          </Stack>
      }
    </Stack>
  )
}

export default Login