import { useState } from 'react'
import { useUserContext } from '../context/UserContext'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'

function Plans() {
  const user = useUserContext()
  const [past, setPast] = useState(true)
  const handleView = trip => {
    console.log(trip)
  }

  if (user === null || undefined) {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  } else if (user.trips.filter(trip => trip.plan === true).length === 0) {
    return (
      <Stack gap={3}>
        <h3>Plans</h3>
        <p>No plans have been finalized.</p>
      </Stack>
    )
  } else {
    return (
      <Stack gap={3}>
        <h3>Plans</h3>
        <Stack direction="horizontal">
          <Button size="sm" variant={past ? "primary" : "secondary"} onClick={() => setPast(!past)}>Past</Button>
          <Button size="sm" variant={!past ? "primary" : "secondary"} onClick={() => setPast(!past)}>Upcoming</Button>
        </Stack>
        {user.trips.filter(trip => trip.plan === true).map(trip => (
          <Stack key={trip.id}>
            <Card className="cards">
              <Card.Header className="card-header" as="h5">{trip.name}</Card.Header>
              <Card.Text>[Dates go here]</Card.Text>
              <Card.Text>Cities: {trip.trip_summary.num_cities}</Card.Text>
              <Card.Text>Cost: ${trip.trip_summary.cost}</Card.Text>
              <Button size="sm" variant="dark" onClick={() => handleView(trip)}>View</Button>
            </Card>
          </Stack>
        ))}
      </Stack>
    )
  }
}

export default Plans