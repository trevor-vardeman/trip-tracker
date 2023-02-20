import { useState } from 'react'
import { useTripContext } from './CurrentTripContext'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'

function TripName() {
  const [tripName, setTripName] = useState("")
  const {
    currentTrip, 
    setCurrentTrip
  } = useTripContext()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`/trips/${currentTrip.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({ name: tripName })
    })
    .then(r => r.json())
    .then(user => setCurrentTrip(user.trips[user.trips.length - 1]))
    .catch(e => alert(e))
  }

  return (
    <Stack>{currentTrip.name === null 
      ? <Stack direction="horizontal" gap={1}>
          <Form>
            <Form.Group controlId="formTripName">
              <Form.Control type="text" placeholder="Enter a trip name..." value={tripName} onChange={(e) => setTripName(e.target.value)}></Form.Control>
            </Form.Group>
          </Form>
          <Button size="sm" variant="dark" type="submit" onClick={handleSubmit}>Submit</Button>
        </Stack>
      : <h1>Trip | {currentTrip.name}</h1>
    }</Stack>
  )
}

export default TripName