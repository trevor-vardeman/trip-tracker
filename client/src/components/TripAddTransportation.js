import React, { useState } from 'react'
import { useUserUpdate } from './context/UserContext'
import { useTripContext } from './context/CurrentTripContext'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'

function TripAddActivity({ selectedCity, handleCitySelection }) {
  const userUpdate = useUserUpdate()
  const {currentTrip, setCurrentTrip} = useTripContext()
  const [showModal, setShowModal] = useState(false)
  const [description, setDescription] = useState("")
  const [startLocation, setStartLocation] = useState(null)
  const [startDateTime, setStartDateTime] = useState("")
  const [endLocation, setEndLocation] = useState(null)
  const [endDateTime, setEndDateTime] = useState("")
  const [cost, setCost] = useState("")
  const sortedCities = currentTrip.cities.sort((a, b) => a.city.localeCompare(b.city))

  const handleSubmit = e => {
    e.preventDefault()
    if (!description || !startDateTime || !endDateTime) {
      alert("Please add a description, start date/time, and end date/time.")
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
      {!selectedCity ? <Button size="sm" disabled onClick={() => alert("Please select a city first.")}>Add Transportation</Button> : <Button size="sm" onClick={() => setShowModal(true)}>Add Transportation</Button>}

      <Modal show={showModal} backdrop="static" keyboard={false} onHide={() => setShowModal(false)}>
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
          <Button size="sm" variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button size="sm" variant="primary" type="submit" onClick={e => handleSubmit(e)}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </Stack>
  )
}

export default TripAddActivity