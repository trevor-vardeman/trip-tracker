import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

function TripAddAccommodation({ selectedCity }) {
  const [showModal, setShowModal] = useState(false)
  const handleSubmit = e => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <Stack>
      <Button size="sm" onClick={() => setShowModal(true)}>Add Accommodation</Button>
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
            <Button size="sm" variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            <Button size="sm" variant="primary" type="submit" onClick={e => handleSubmit(e)}>Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal>
  </Stack>
  )
}

export default TripAddAccommodation