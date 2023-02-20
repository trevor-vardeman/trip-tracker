import { useState } from 'react'
import { useUserUpdate } from './UserContext'
import { useTripContext } from './CurrentTripContext'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

function TripAddCity() {
  const {currentTrip, setCurrentTrip} = useTripContext()
  const userUpdate = useUserUpdate()
  const [showModal, setShowModal] = useState(false)
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")

  const handleSubmit = e => {
    if (!city || !country) {
      alert("Please enter a city and country name.")
    } else {
      e.preventDefault()
      const cityCountry = {
        trip_id: currentTrip.id,
        city: city,
        country: country
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
        setCity("")
        setCountry("")
        setShowModal(false)
      })
      .catch(e => alert(e))
    }
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
            <Modal.Header closeButton>
              <Modal.Title>What city to next?</Modal.Title>
            </Modal.Header>
            <Form>
              <Form.Group controlId="formForCity">
                <Form.Control value={city} type="text" placeholder="Enter a city name..." onChange={e => setCity(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId="formForCountry">
                <Form.Control value={country} type="text" placeholder="Enter a country name..." onChange={e => setCountry(e.target.value)}></Form.Control>
              </Form.Group>
            </Form>
            <Modal.Footer>
              <Button size="sm" variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
              <Button size="sm" variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
          </Modal>
        :
          <Button size="sm" onClick={() => setShowModal(true)}>Add City</Button>
      }
    </Stack>
  )
}

export default TripAddCity