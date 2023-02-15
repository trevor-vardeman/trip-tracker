import { useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function NewTrip() {
  const [show, setShow] = useState(true)
  const handleSubmit = (e) => {
    console.log(e.target.form[1].value)
    setShow(false)
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