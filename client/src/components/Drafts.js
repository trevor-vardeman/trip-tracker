import { useHistory } from "react-router-dom"
import { useUserContext, useUserUpdate } from '../context/UserContext'
import { useTripContext } from '../context/CurrentTripContext'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'

function Drafts() {
  const history = useHistory()
  const user = useUserContext()
  const { setCurrentTrip } = useTripContext()
  const userUpdate = useUserUpdate()

  const handleDelete = trip => {
    fetch(`/trips/${trip.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .catch(e => alert(e))
    .then(r => r.json())
    .then(user => {
      userUpdate(user)
    })
    .catch(e => alert(e))
  }

  const handleEdit = trip => {
    setCurrentTrip(trip)
    history.push(`/drafts/${trip.id}`)
  }

  const handleFinalize = trip => {
    fetch(`/trips/${trip.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({plan: true})
    })
    .then(r => r.json())
    .then(user => {
      userUpdate(user)
    })
    .catch(e => alert(e))
  }

  if (user === null || undefined) {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  } else if (user.trips.filter(trip => trip.plan === false).length === 0) {
    return (
      <Stack gap={3}>
        <h3>Drafts</h3>
        <p>No drafts have been saved.</p>
      </Stack>
    )
  } else {
    return (
      <Stack gap={3}>
        <h3>Drafts</h3>
        {user.trips.filter(trip => trip.plan === false).map(trip => (
          <Stack key={trip.id}>
            <Card className="cards">
              <Card.Header className="card-header" as="h5">{trip.name}</Card.Header>
              <Card.Text>[Dates go here]</Card.Text>
              <Card.Text>Cities: {trip.trip_summary.num_cities}</Card.Text>
              <Card.Text>Cost: ${trip.trip_summary.cost}</Card.Text>
              <Stack className="card-buttons" direction="horizontal" gap={3}>
                <Button size="sm" variant="danger" onClick={() => handleDelete(trip)}>Delete</Button>
                <Button size="sm" variant="warning" type="submit" onClick={() => handleEdit(trip)}>Edit</Button>
                <Button size="sm" variant="dark" type="submit" onClick={() => handleFinalize(trip)}>Finalize</Button>
              </Stack>
            </Card>
          </Stack>
        ))}
      </Stack>
    )
  }
}

export default Drafts