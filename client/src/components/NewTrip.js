import { useState } from 'react'
import { useHistory } from "react-router-dom"
import { useUserContext, useUserUpdate } from '../context/UserContext'
import { useTripContext } from '../context/CurrentTripContext'
import TripContainer from './TripContainer'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function NewTrip() {
  const user = useUserContext()
  const userUpdate = useUserUpdate()
  const { setCurrentTrip } = useTripContext()
  const history = useHistory()
  const [showModal, setShowModal] = useState(true)
  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !city || !country) {
      alert("Please name your trip, enter a city name, and enter a country name.")
    } else {
      const trip = {
        name: name,
        city: city,
        country: country
      }
      fetch("/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(trip)
      })
      .then(r => r.json())
      .then(user => {
        userUpdate(user)
        setCurrentTrip(user.trips[user.trips.length - 1])
        setName("")
        setCity("")
        setCountry("")
        setShowModal(false)
      })
      .catch(e => alert(e))
    }
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
                <Modal.Title>New Trip</Modal.Title>
              </Modal.Header>

              <Form.Label htmlFor="disabledTextInput">What would you like to name this trip?</Form.Label>
              <Form.Group controlId="formForName">
                <Form.Control value={name} type="text" placeholder="Name your trip..." onChange={e => setName(e.target.value)}></Form.Control>
              </Form.Group><br></br>

              <Form.Label htmlFor="disabledTextInput">Where is your journey beginning?</Form.Label>
              <Form.Group controlId="formForCity">
                <Form.Control value={city} type="text" placeholder="Enter a city name..." onChange={e => setCity(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId="formForCountry">
                <Form.Control value={country} type="text" placeholder="Enter a country name..." onChange={e => setCountry(e.target.value)}></Form.Control>
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
          <TripContainer />
      }
    </Stack>
  )
}

export default NewTrip