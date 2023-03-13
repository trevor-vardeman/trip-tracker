import { useState } from 'react'
import { useUserContext, useUserUpdate } from '../context/UserContext'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

function Profile() {
  const user = useUserContext()
  const userUpdate = useUserUpdate()
  const [avatar, setAvatar] = useState(null)

  const submitAvatar = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("avatar", avatar)
    fetch("/user-avatar", {
      method: "POST",
      body: formData,
    })
    .then(r => r.json())
    .then(userData => {
      userUpdate(userData)
      setAvatar(null)
    })
  }

  if (!user) {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  } else return (
    <Stack className="centered" gap={3}>
      <h5>Profile</h5>
      <p className="p">Upload a Profile Picture</p>
      <Form>
        <Form.Group controlId="formAvatarUpload">
          <Stack direction="horizontal">
            <Form.Control type="file" accept="image/*" onChange={e => setAvatar(e.target.files[0])}></Form.Control>
            <Button className="small-button" onClick={e => submitAvatar(e)}>Submit</Button>
          </Stack>
        </Form.Group>
      </Form>
      {user.avatar ? <img className="profile-img" src={`https://storage.cloud.google.com/flatiron-travel-app/${user.avatar.toString()}`} alt="userAvatar"/> : null}
    </Stack>
  )
}

export default Profile