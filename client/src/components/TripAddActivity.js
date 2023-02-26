import { useState } from 'react'
import { useUserUpdate } from './UserContext'
import { useTripContext } from './CurrentTripContext'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import FileUpload from './FileUpload'

function TripAddActivity({ selectedCity }) {
  const userUpdate = useUserUpdate()
  const {setCurrentTrip} = useTripContext()
  const [showModal, setShowModal] = useState(false)
  const [description, setDescription] = useState("")
  const [startDateTime, setStartDateTime] = useState("")
  const [endDateTime, setEndDateTime] = useState("")
  const [cost, setCost] = useState("")
  const [file, setFile] = useState(null)
  const handleFileUpload = (e, newFile) => {
    e.preventDefault()
    console.log(newFile)
    // setFile(newFile)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const activity = {
      city_id: selectedCity.id,
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
      const newestTrip = user.trips[user.trips.length - 1]
      const newestCity = newestTrip.cities[newestTrip.cities.length - 1]
      const newestActivity = newestCity.activities[newestCity.activities.length - 1]
      setShowModal(false)
      console.log("user", user)
  })}

  return (
    <Stack>
      {!selectedCity ? <Button size="sm" disabled onClick={() => alert("Please select a city first.")}>Add Activity</Button> : <Button size="sm" onClick={() => setShowModal(true)}>Add Activity</Button>}

      <Modal show={showModal} backdrop="static" keyboard={false} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          {!selectedCity ? null : <Modal.Title>Add an Activity in {selectedCity.city}</Modal.Title>}
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
        <FileUpload file={file} handleFileUpload={handleFileUpload} />

        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button size="sm" variant="primary" type="submit" onClick={e => handleSubmit(e)}>Submit</Button>
        </Modal.Footer>
      </Modal>
  </Stack>
  )
}

export default TripAddActivity