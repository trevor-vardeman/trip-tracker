import { useState } from 'react'
import { useUserUpdate } from './UserContext'
import { useTripContext } from './CurrentTripContext'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

function TripAdditions({ citySelected }) {
  const [showModal, setShowModal] = useState(false)
  const userUpdate = useUserUpdate()
  const {
    currentTrip, 
    setCurrentTrip
  } = useTripContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    const cityCountry = {
      trip_id: currentTrip.id,
      city: e.target.form[1].value,
      country: e.target.form[2].value
    }
    fetch("/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(cityCountry)
    })
    .then(r => r.json())
    .then(user => {
      userUpdate(user)
      setCurrentTrip(user.trips[user.trips.length - 1])
      setShowModal(false)
    })
    .catch(e => alert(e))
  }

  return (
    <Stack>
      {showModal
        ?
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            backdrop="static"
            keyboard={false}
          >
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>What city to next?</Modal.Title>
              </Modal.Header>

              <Form.Group controlId="formForCity">
                <Form.Control type="text" placeholder="Enter a city name..."></Form.Control>
              </Form.Group>
              <Form.Group controlId="formForCountry">
                <Form.Control type="text" placeholder="Enter a country name..."></Form.Control>
              </Form.Group>

              <Modal.Footer>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowModal(false)}
                >Close</Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
              </Modal.Footer>
            </Form>
          </Modal>
        :
          <Button onClick={() => setShowModal(true)}>Add City</Button>
      }
    </Stack>
  )
}

export default TripAdditions