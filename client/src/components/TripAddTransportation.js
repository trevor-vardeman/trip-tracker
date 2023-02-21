import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'

function TripAddTransportation({ selectedCity }) {
  const [showModal, setShowModal] = useState(false)
  const handleSubmit = e => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <Stack>
      <Button size="sm" onClick={() => setShowModal(true)}>Add Transportation</Button>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Transportation</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group controlId="formForType">
            <Form.Control type="text" placeholder="Enter a city name..."></Form.Control>
          </Form.Group>
          <Form.Group controlId="formForCountry">
            <Form.Control type="text" placeholder="Enter a country name..."></Form.Control>
          </Form.Group>
        </Form>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            <Button size="sm" variant="primary" type="submit" onClick={e => handleSubmit(e)}>Submit</Button>
          </Modal.Footer>
      </Modal>
  </Stack>
  )
}

export default TripAddTransportation