import { useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function NewTrip() {
  const [show, setShow] = useState(true)
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
      setShow(false)
    })
    .catch(e => alert(e))
  }
  const handleClose = () => setShow(false)

  return (
    <Stack>
      {show 
        ?
          <Modal
            show={show}
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
            <p>Underlying page</p>
          </Stack>
      }
    </Stack>
  )
}

export default NewTrip