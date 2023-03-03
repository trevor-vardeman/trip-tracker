import { useState } from 'react'
import { useUserContext, useUserUpdate } from './context/UserContext'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Profile() {
  const user = useUserContext()
  const userUpdate = useUserUpdate()
  const [avatar, setAvatar] = useState(null)

  const submitAvatar = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("avatar", avatar)
    console.log("formData", formData)

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

  return (
    <div>
      {user 
        ? <Stack gap={3}>
            <Form>
              <Form.Group controlId="formAvatarUpload">
                <Form.Label>Upload an Avatar</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={e => setAvatar(e.target.files[0])}></Form.Control>
              </Form.Group>
              <Button className="small-button" onClick={e => submitAvatar(e)}>Submit</Button>
            </Form>
            {user.avatar ? <img className="img" src={`https://storage.cloud.google.com/flatiron-travel-app/${user.avatar.toString()}`} alt="userAvatar"/> : null}
          </Stack>
        : <p>You are not signed in. Click here to get signed in before editing your profile.</p>
      }
    </div>
  )
}

export default Profile