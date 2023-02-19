import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function TripName({ currentTrip }) {
  const handleSubmit = (e) => {
    const tripName = {
      name: e.target.form[0].value
    }
    e.preventDefault()
    fetch(`/trips/${currentTrip.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(tripName)
    })
    .then(r => r.json())
    .then(data => {
      console.log(data)
    })
    .catch(e => alert(e))
  }

  return (
    <div>{currentTrip.name === null 
      ? <Form>
          <Form.Group controlId="formTripName">
            <Form.Label>Trip Name</Form.Label>
            <Form.Control type="text" placeholder="Enter a trip name..."></Form.Control>
          </Form.Group>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
      : <h1>Trip | currentTrip.name</h1>
    }</div>
  )
}

export default TripName