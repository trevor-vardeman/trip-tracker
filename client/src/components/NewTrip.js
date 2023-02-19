import { useState } from 'react'
import { useHistory } from "react-router-dom"
import { useUserContext, useUserUpdate } from './UserContext'
import Trip from './Trip'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useTripContext } from './CurrentTripContext'

function NewTrip() {
  const [showModal, setShowModal] = useState(true)
  const user = useUserContext()
  const userUpdate = useUserUpdate()
  const history = useHistory()
  const {
    currentTrip, 
    setCurrentTrip
  } = useTripContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    const cityCountry = {
      city: e.target.form[1].value,
      country: e.target.form[2].value
    }
    fetch("/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(cityCountry)
    })
    .then(r => r.json())
    .then(user => {
      console.log(user)
      userUpdate(user)
      setCurrentTrip(user.trips[user.trips.length - 1])
      console.log(user.trips[user.trips.length - 1])
      setShowModal(false)
    })
    .catch(e => alert(e))
  }

  return (
    <Stack>
      {showModal && user
        ?
          <Modal
            show={showModal}
            onHide={() => {
              setShowModal(false)
              history.push("/")
            }}
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
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    setShowModal(false)
                    history.push("/")
                  }}
                >Close</Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
              </Modal.Footer>
            </Form>
          </Modal>
        :
          <Trip currentTrip={currentTrip} />
      }
    </Stack>
  )
}

export default NewTrip