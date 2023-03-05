import React, { useState, useEffect } from 'react'
import { useUserUpdate } from '../context/UserContext'
import { useTripContext } from '../context/CurrentTripContext'
import { useCityContext } from '../context/CurrentCityContext'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'

function TripAddTransportation( props ) {
  const userUpdate = useUserUpdate()
  const { currentTrip, setCurrentTrip } = useTripContext()
  const { currentCity, setCurrentCity } = useCityContext()
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [transportationId, setTransportationId] = useState(null)
  const [cityId, setCityId] = useState(null)
  const [description, setDescription] = useState("")
  const [startLocation, setStartLocation] = useState(null)
  const [startDateTime, setStartDateTime] = useState("")
  const [endLocation, setEndLocation] = useState(null)
  const [endDateTime, setEndDateTime] = useState("")
  const [cost, setCost] = useState("")
  const sortedCities = currentTrip.cities.sort((a, b) => a.city.localeCompare(b.city))
  const closeAndClearState = () => {
    setShowModal(false)
    setEditMode(false)
    setTransportationId(null)
    setCityId(null)
    setDescription("")
    setStartLocation(null)
    setStartDateTime("")
    setEndLocation(null)
    setEndDateTime("")
    setCost("")
    props.handleClose()
  }

  useEffect(() => {
    if (Object.keys(props).length > 0) {
      let transportation = Object.values(props)[0]
      let startTime = transportation.start_datetime.substring(0,23)
      let endTime = transportation.end_datetime.substring(0,23)
      console.log(transportation)
      setShowModal(true)
      setEditMode(true)
      setTransportationId(transportation.id)
      setCityId(transportation.city_id)
      setDescription(transportation.description)
      setStartLocation(transportation.start_location)
      setStartDateTime(startTime)
      setEndLocation(transportation.end_location)
      setEndDateTime(endTime)
      setCost(transportation.cost)
    } else return
  },[props])

  const handleSubmit = e => {
    e.preventDefault()
    if (!description || !startDateTime || !endDateTime) {
      alert("Please add a description, start date/time, and end date/time.")
    } else if (editMode) {
      const transportation = {
        city_id: cityId,
        description: description,
        start_location_id: startLocation[0].id,
        start_datetime: startDateTime,
        end_location_id: endLocation[0].id,
        end_datetime: endDateTime,
        cost: cost
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
        setStartLocation(null)
        setStartDateTime("")
        setEndLocation(null)
        setEndDateTime("")
        setCost("")
      })
    } else {
      const transportation = {
        description: description,
        start_location_id: startLocation[0].id,
        start_datetime: startDateTime,
        end_location_id: endLocation[0].id,
        end_datetime: endDateTime,
        cost: cost
      }
      fetch("/transportations", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(transportation)
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

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="/new"
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
    >
      {children} &#x25bc;
    </a>
  ))

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('')
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={e => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      )
    },
  )

  return (
    <Stack>
      {!currentCity ? <Button size="sm" disabled onClick={() => alert("Please select a city first.")}>Add Transportation</Button> : <Button size="sm" onClick={() => setShowModal(true)}>Add Transportation</Button>}

      <Modal show={showModal} backdrop="static" keyboard={false} onHide={() => closeAndClearState()}>
        <Modal.Header closeButton>
          <Modal.Title>Add Transportation</Modal.Title>
        </Modal.Header>

        <Form>
          <Form.Group controlId="formForDescription">
            <Form.Control value={description} type="text" placeholder="Enter a description..." onChange={e => setDescription(e.target.value)}></Form.Control>
          </Form.Group>

          <Stack direction="horizontal" gap={3}>
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle} id="dropdownForStartLocation">Starting Location</Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                  {sortedCities.map(city => (
                    <Dropdown.Item key={city.id} size="sm" value={startLocation} onClick={() => setStartLocation([city])}>{city.city}, {city.country}</Dropdown.Item>
                  ))}
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="noCity">Don't see your city? Create it first.</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {startLocation ? <p>{startLocation[0].city}, {startLocation[0].country}</p> : null}
          </Stack>

          <Form.Group controlId="formForStartDateTime">
            <Form.Control value={startDateTime} type="datetime-local" placeholder="Select the start date/time" onChange={e => setStartDateTime(e.target.value)}></Form.Control>
          </Form.Group>

          <Stack direction="horizontal" gap={3}>
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle} id="dropdownForStartLocation">Destination</Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                  {sortedCities.map(city => (
                    <Dropdown.Item key={city.id} size="sm" value={endLocation} onClick={() => setEndLocation([city])}>{city.city}, {city.country}</Dropdown.Item>
                  ))}
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="noCity">Don't see your city? Create it first.</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {endLocation ? <p>{endLocation[0].city}, {endLocation[0].country}</p> : null}
          </Stack>

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

export default TripAddTransportation