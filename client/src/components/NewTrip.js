import { useState } from 'react'
import { useHistory } from "react-router-dom"
import { useUserContext, useUserUpdate } from './UserContext'
import { useTripContext } from './CurrentTripContext'
import TripContainer from './TripContainer'
import Trip from './Trip'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function NewTrip() {
  const user = useUserContext()
  const userUpdate = useUserUpdate()
  const {currentTrip, setCurrentTrip} = useTripContext()
  const history = useHistory()
  const [showModal, setShowModal] = useState(true)
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!city || !country) {
      alert("Please enter a city and country name.")
    } else {
      const cityCountry = {
        city: city,
        country: country
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
                <Modal.Title>Where is your journey beginning?</Modal.Title>
              </Modal.Header>

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