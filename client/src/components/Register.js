import { Link } from 'react-router-dom'
import { useUserRegister } from './context/UserContext'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Register() {
  const register = useUserRegister()

  const handleSignUp = e => {
    e.preventDefault()
    register(e.target.form[0].value, e.target.form[1].value, e.target.form[2].value)
  }

  return (
    <Stack gap={3} className="sign-in-form">
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
        </Form.Group><br></br>
        <Button variant="dark" type="submit" onClick={handleSignUp}>Sign Up</Button>
      </Form>
      <p>Already have an account? <Link to="/login">Sign in</Link></p>
    </Stack>
  )
}

export default Register