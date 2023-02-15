import { useState, useContext } from 'react'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useUserUpdate } from './UserContext'

function NewTrip() {
  const [showModal, setShowModal] = useState(true)
  const [trip, setTrip] = useState(null)
  const user = useUserUpdate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const cityCountry = {
      city: e.target.form[1].value,
      country: e.target.form[2].value
    }
    fetch("/trip", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(cityCountry)
    })
    .then(r => r.json())
    .then(data => {
      console.log(data)
      // setTrip(data)
      setShowModal(false)
    })
    .catch(e => alert(e))
  }
  const handleClose = () => setShowModal(false)

  return (
    <Stack>
      {showModal 
        ?
          <Modal
            show={showModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Form>
              <Modal.Header closeButton>
                <Modal.Title>Where is your journey beginning?</Modal.Title>
              </Modal.Header>

              <Form.Group controlId="formForCity">
                <Form.Control type="text" placeholder="Enter a city name..."></Form.Control>
              </Form.Group>
              <Form.Group controlId="formForCountry">
                <Form.Control type="text" placeholder="Enter a country name..."></Form.Control>
              </Form.Group>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
              </Modal.Footer>
            </Form>
          </Modal>
        :
          <Stack>
            <p>{trip.cities[0].city}, {trip.cities[0].country}</p>
          </Stack>
      }
    </Stack>
  )
}

export default NewTrip