import { useState } from 'react'
import { useUserUpdate } from '../context/UserContext'
import { useTripContext } from '../context/CurrentTripContext'
import { useCityContext } from '../context/CurrentCityContext'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
// import FileUpload from './FileUpload'

function TripAddActivity() {
  const userUpdate = useUserUpdate()
  const { currentTrip, setCurrentTrip } = useTripContext()
  const { currentCity, setCurrentCity } = useCityContext()
  const [showModal, setShowModal] = useState(false)
  const [description, setDescription] = useState("")
  const [startDateTime, setStartDateTime] = useState("")
  const [endDateTime, setEndDateTime] = useState("")
  const [cost, setCost] = useState("")
  // const [file, setFile] = useState(null)
  // const handleFileUpload = (e, newFile) => {
  //   e.preventDefault()
  //   console.log(newFile)
  //   // setFile(newFile)
  // }

  const handleSubmit = e => {
    e.preventDefault()

    const activity = {
      city_id: currentCity.id,
      description: description,
      start_datetime: startDateTime,
      end_datetime: endDateTime,
      cost: cost
    }

    fetch("/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(activity)
    })
    .then(r => r.json())
    .then(user => {
      const updatedTrip = user.trips.filter(trip => trip.id === currentTrip.id)[0]
      setCurrentTrip(updatedTrip)
      const updatedCity = updatedTrip.cities.filter(city => city.id === currentCity.id)[0]
      setCurrentCity(updatedCity)
      userUpdate(user)
      setShowModal(false)
  })}

  return (
    <Stack>
      {!currentCity ? <Button size="sm" disabled onClick={() => alert("Please select a city first.")}>Add Activity</Button> : <Button size="sm" onClick={() => setShowModal(true)}>Add Activity</Button>}

      <Modal show={showModal} backdrop="static" keyboard={false} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          {!currentCity ? null : <Modal.Title>Add an Activity in {currentCity.city}</Modal.Title>}
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
            <Form.Control value={cost} type="number" placeholder={!cost ? "How much does this activity cost? (Optional)" : `$${cost}`} onChange={e => setCost(e.target.value)} />
          </InputGroup>
        </Form>
        {/* <FileUpload file={file} handleFileUpload={handleFileUpload} /> */}

        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button size="sm" variant="primary" type="submit" onClick={e => handleSubmit(e)}>Submit</Button>
        </Modal.Footer>
      </Modal>
  </Stack>
  )
}

export default TripAddActivity