import { useState, useEffect } from 'react'
import { useUserUpdate } from '../context/UserContext'
import { useTripContext } from '../context/CurrentTripContext'
import { useCityContext } from '../context/CurrentCityContext'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
// import FileUpload from './FileUpload'

function TripAddActivity( props ) {
  const userUpdate = useUserUpdate()
  const { currentTrip, setCurrentTrip } = useTripContext()
  const { currentCity, setCurrentCity } = useCityContext()
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [activityId, setActivityId] = useState(null)
  const [cityId, setCityId] = useState(null)
  const [description, setDescription] = useState("")
  const [startDateTime, setStartDateTime] = useState("")
  const [endDateTime, setEndDateTime] = useState("")
  const [cost, setCost] = useState("")
  const closeAndClearState = () => {
    setShowModal(false)
    setEditMode(false)
    setActivityId(null)
    setCityId(null)
    setDescription("")
    setStartDateTime("")
    setEndDateTime("")
    setCost("")
    props.handleClose()
  }
  // const [file, setFile] = useState(null)
  // const handleFileUpload = (e, newFile) => {
  //   e.preventDefault()
  //   console.log(newFile)
  //   // setFile(newFile)
  // }

  useEffect(() => {
    if (Object.keys(props).length > 0) {
      let activity = Object.values(props)[0]
      let startTime = activity.start_datetime.substring(0,23)
      let endTime = activity.end_datetime.substring(0,23)
      setShowModal(true)
      setEditMode(true)
      setActivityId(activity.id)
      setCityId(activity.city_id)
      setDescription(activity.description)
      setStartDateTime(startTime)
      setEndDateTime(endTime)
      setCost(activity.cost)
    } else return
  },[props])

  const handleSubmit = e => {
    e.preventDefault()
    const finalCost = () => {
      if (cost === "") {
        return 0
      } else return cost
    }
    if (!description || !startDateTime || !endDateTime) {
      alert("Please add a description, start date/time, and end date/time.")
    } else if (editMode) {
      const activity = {
        city_id: cityId,
        description: description,
        start_datetime: startDateTime,
        end_datetime: endDateTime,
        cost: finalCost()
      }
      fetch(`/activities/${activityId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(activity)
      })
      .then(r => r.json())
      .then(user => {
        setShowModal(false)
        setEditMode(false)
        props.handleClose()
        userUpdate(user)
        const updatedTrip = user.trips.filter(trip => trip.id === currentTrip.id)[0]
        setCurrentTrip(updatedTrip)
        const updatedCity = updatedTrip.cities.filter(city => city.id === currentCity.id)[0]
        setCurrentCity(updatedCity)
        setActivityId(null)
        setCityId(null)
        setDescription("")
        setStartDateTime("")
        setEndDateTime("")
        setCost("")
      })
    } else {
      const activity = {
        city_id: currentCity.id,
        description: description,
        start_datetime: startDateTime,
        end_datetime: endDateTime,
        cost: finalCost()
      }
      fetch("/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(activity)
      })
      .then(r => r.json())
      .then(user => {
        setShowModal(false)
        userUpdate(user)
        const updatedTrip = user.trips.filter(trip => trip.id === currentTrip.id)[0]
        setCurrentTrip(updatedTrip)
        const updatedCity = updatedTrip.cities.filter(city => city.id === currentCity.id)[0]
        setCurrentCity(updatedCity)
        setDescription("")
        setStartDateTime("")
        setEndDateTime("")
        setCost("")
      })
      .catch(e => alert(e))
    }
  }

  return (
    <Stack>
      {!currentCity ? <Button size="sm" disabled>+ Activity</Button> : <Button size="sm" onClick={() => setShowModal(true)}>+ Activity</Button>}

      <Modal show={showModal} backdrop="static" keyboard={false} onHide={() => closeAndClearState()}>
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
            <Form.Control value={cost} type="number" placeholder={!cost ? "How much does this activity cost? (Optional)" : `${cost}`} onChange={e => setCost(e.target.value)} />
          </InputGroup>
        </Form>
        {/* <FileUpload file={file} handleFileUpload={handleFileUpload} /> */}

        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={() => closeAndClearState()}>Close</Button>
          <Button size="sm" variant="primary" type="submit" onClick={e => handleSubmit(e)}>Submit</Button>
        </Modal.Footer>
      </Modal>
  </Stack>
  )
}

export default TripAddActivity