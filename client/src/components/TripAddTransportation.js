import React, { useState, useEffect } from 'react'
import { useUserUpdate } from '../context/UserContext'
import { useTripContext } from '../context/CurrentTripContext'
import { useCityContext } from '../context/CurrentCityContext'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

function TripAddTransportation( props ) {
  const userUpdate = useUserUpdate()
  const { currentTrip, setCurrentTrip } = useTripContext()
  const { currentCity, setCurrentCity } = useCityContext()
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [transportationId, setTransportationId] = useState(null)
  const [cityId, setCityId] = useState(null)
  const [description, setDescription] = useState("")
  const [startLocationId, setStartLocationId] = useState(null)
  const [startDateTime, setStartDateTime] = useState("")
  const [endLocationId, setEndLocationId] = useState(null)
  const [endDateTime, setEndDateTime] = useState("")
  const [cost, setCost] = useState("")
  const closeAndClearState = () => {
    setShowModal(false)
    setEditMode(false)
    setTransportationId(null)
    setCityId(null)
    setDescription("")
    setStartLocationId(null)
    setStartDateTime("")
    setEndLocationId(null)
    setEndDateTime("")
    setCost("")
    props.handleClose()
  }

  useEffect(() => {
    if (Object.keys(props).length > 0) {
      let transportation = Object.values(props)[0]
      let startTime = transportation.start_datetime.substring(0,23)
      let endTime = transportation.end_datetime.substring(0,23)
      setShowModal(true)
      setEditMode(true)
      setTransportationId(transportation.id)
      setCityId(transportation.city_id)
      setDescription(transportation.description)
      setStartLocationId(transportation.start_location)
      setStartDateTime(startTime)
      setEndLocationId(transportation.end_location)
      setEndDateTime(endTime)
      setCost(transportation.cost)
    } else return
  },[props])
  const handleSubmit = e => {
    e.preventDefault()
    const finalCost = () => {
      if (cost === "") {
        return 0
      } else return cost
    }
    if (!description || !startDateTime || !endDateTime || typeof startLocationId !== "number" || typeof endLocationId !== "number") {
      alert("Please fill out the form in its entirety.")
    } else if (editMode) {
      const transportation = {
        city_id: cityId,
        description: description,
        start_location_id: startLocationId,
        start_datetime: startDateTime,
        end_location_id: endLocationId,
        end_datetime: endDateTime,
        cost: finalCost()
      }
      fetch(`/transportations/${transportationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(transportation)
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
        setTransportationId(null)
        setCityId(null)
        setDescription("")
        setStartLocationId(null)
        setStartDateTime("")
        setEndLocationId(null)
        setEndDateTime("")
        setCost("")
      })
    } else {
      const transportation = {
        description: description,
        start_location_id: startLocationId,
        start_datetime: startDateTime,
        end_location_id: endLocationId,
        end_datetime: endDateTime,
        cost: finalCost()
      }
      fetch("/transportations", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(transportation)
      })
      .then(r => {
        if (r.ok) {
          r.json().then(
            user => {
              setShowModal(false)
              userUpdate(user)
              const updatedTrip = user.trips.filter(trip => trip.id === currentTrip.id)[0]
              setCurrentTrip(updatedTrip)
              const updatedCity = updatedTrip.cities.filter(city => city.id === currentCity.id)[0]
              setCurrentCity(updatedCity)
              setDescription("")
              setStartLocationId(null)
              setStartDateTime("")
              setEndLocationId(null)
              setEndDateTime("")
              setCost("")
            }
          )
        } else {
          r.json()
          .then(r => r.error.map(e => alert(e)))
        }
      })
      .catch(e => alert(e))
    }
  }

  if (!currentTrip) {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  } else {
    return (
      <Stack>
        {!currentCity ? <Button size="sm" disabled>+ Transportation</Button> : <Button size="sm" onClick={() => setShowModal(true)}>+ Transportation</Button>}
        <Modal show={showModal} backdrop="static" keyboard={false} onHide={() => closeAndClearState()}>
          <Modal.Header closeButton>
            <Modal.Title>Add Transportation</Modal.Title>
          </Modal.Header>

          <Form>
            <Form.Group controlId="formForDescription">
              <Form.Control value={description} type="text" placeholder="Enter a description..." onChange={e => setDescription(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Control value={startLocationId} as="select" aria-label="formForSelectingDepartingCity" onChange={e => setStartLocationId(parseInt(e.target.value))}>
              <option>Select the Starting Location</option>
              {currentTrip.cities.map(city => (
                <option key={city.id} value={city.id} size="sm">{city.city}, {city.country}</option>
              ))}
            </Form.Control>
            <Form.Group controlId="formForStartDateTime">
              <Form.Control value={startDateTime} type="datetime-local" placeholder="Select the start date/time" onChange={e => setStartDateTime(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Control value={endLocationId} as="select" aria-label="formForSelectingDestination" onChange={e => setEndLocationId(parseInt(e.target.value))}>
              <option>Select the Destination</option>
              {currentTrip.cities.map(city => (
                <option key={city.id} value={city.id} size="sm">{city.city}, {city.country}</option>
              ))}
            </Form.Control>
            <Form.Group controlId="formForEndDateTime">
              <Form.Control value={endDateTime} type="datetime-local" placeholder="Select the end date/time" onChange={e => setEndDateTime(e.target.value)}></Form.Control>
            </Form.Group>
            <InputGroup id="formForCost">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control value={cost} type="number" placeholder={!cost ? "How much does this cost? (Optional)" : `$${cost}`} onChange={e => setCost(e.target.value)} />
            </InputGroup>
          </Form>

          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={() => closeAndClearState()}>Close</Button>
            <Button size="sm" variant="primary" type="submit" onClick={e => handleSubmit(e)}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </Stack>
    )
  }
}

export default TripAddTransportation