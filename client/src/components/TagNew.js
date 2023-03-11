import { useState } from 'react'
import { useUserUpdate } from '../context/UserContext'
import { useTripContext } from '../context/CurrentTripContext'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function TagNew() {
  const userUpdate = useUserUpdate()
  const { currentTrip } = useTripContext()
  const [tag, setTag] = useState("")
  const handleSubmit = e => {
    e.preventDefault()
    fetch("/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({
        name: tag,
        trip_id: currentTrip.id
      })
    })
    .then(r => {
      if (r.ok) {
        r.json().then(user => {
          userUpdate(user)
          setTag("")
        })
      } else {
        r.json().then(r => alert(r.error))
      }
    })
    .catch(e => alert(e))
  }

  return (
    <Stack>
      <p>Couldn't find a tag by searching?</p>
      <Stack direction="horizontal">
        <Form>
          <Form.Group controlId="formForNewTag">
            <Form.Control value={tag} type="text" placeholder="Enter a new tag..." onChange={e => setTag(e.target.value.toLowerCase())}></Form.Control>
          </Form.Group>
        </Form>
        <Button type="submit" size="sm" variant="primary" onClick={e => handleSubmit(e)}>Submit</Button>
      </Stack>
    </Stack>
  )
}

export default TagNew