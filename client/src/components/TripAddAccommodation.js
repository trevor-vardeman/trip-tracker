import { useState } from 'react'
import { useUserUpdate } from '../context/UserContext'
import { useTripContext } from '../context/CurrentTripContext'
import { useCityContext } from '../context/CurrentCityContext'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

function TripAddActivity() {
  const userUpdate = useUserUpdate()
  const {setCurrentTrip} = useTripContext()
  const { currentCity } = useCityContext()
  const [showModal, setShowModal] = useState(false)
  const [description, setDescription] = useState("")
  const [startDateTime, setStartDateTime] = useState("")
  const [endDateTime, setEndDateTime] = useState("")
  const [cost, setCost] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    if (!description || !startDateTime || !endDateTime) {
      alert("Please add a description, start date/time, and end date/time.")
    } else {
      const accommodation = {
        city_id: currentCity.id,
        description: description,
        start_datetime: startDateTime,
        end_datetime: endDateTime,
        cost: cost
      }
      fetch("/accommodations", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(accommodation)
      })
      .then(r => r.json())
      .then(user => {
        console.log(user)
        userUpdate(user)
        setCurrentTrip(user.trips[user.trips.length - 1])
        setDescription("")
        setStartDateTime("")
        setEndDateTime("")
        setCost("")
        setShowModal(false)
      })
      .catch(e => alert(e))
    }
  }

  return (
    <Stack>
      {!currentCity ? <Button size="sm" disabled onClick={() => alert("Please select a city first.")}>Add Accommodation</Button> : <Button size="sm" onClick={() => setShowModal(true)}>Add Accommodation</Button>}

      <Modal show={showModal} backdrop="static" keyboard={false} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          {!currentCity ? null : <Modal.Title>Add Accommodations in {currentCity.city}</Modal.Title>}
        </Modal.Header>

        <Form>
          <Form.Group controlId="formForDescription">
            <Form.Control value={description} type="text" placeholder="Enter a description..." onChange={e => setDescription(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="formForStartDateTime">
            <Form.Control value={startDateTime} type="datetime-local" placeholder="Select the start date/time" onChange={e => setStartDateTime(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="formForEndDateTime">
            <Form.Control value={endDateTime} type="datetime-local" placeholder="Select the end date/time" onChange={e => setEndDateTime(e.target.value)}></Form.Control>
          </Form.Group>
          <InputGroup id="formForCost">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control value={cost} type="number" placeholder={!cost ? "How much does this stay cost? (Optional)" : `$${cost}`} onChange={e => setCost(e.target.value)} />
          </InputGroup>
        </Form>

        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button size="sm" variant="primary" type="submit" onClick={e => handleSubmit(e)}>Submit</Button>
        </Modal.Footer>
      </Modal>
  </Stack>
  )
}

export default TripAddActivity