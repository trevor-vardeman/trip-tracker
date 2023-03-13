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
  const sortedDrafts = () => {
    if (user.cities === null) {
      return 
    } else  {
      let tripsWithDates = user.trips.filter(trip => trip.trip_summary.departure_date !== null && trip.trip_summary.return_date !== null)
      let tripsWithoutDates = user.trips.filter(trip => trip.trip_summary.departure_date === null || trip.trip_summary.return_date === null)
      tripsWithDates.sort((a, b) => a.trip_summary.departure_date.localeCompare(b.trip_summary.departure_date))
      tripsWithoutDates.sort((a, b) => a.name.localeCompare(b.name))
      return [...tripsWithDates, ...tripsWithoutDates]
    }
  }

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
    history.push(`/trips/${trip.id}`)
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

  if (!user) {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  } else if (user.trips.filter(trip => trip.plan === false).length === 0) {
    return (
      <Stack className="centered" gap={3}>
        <h5>Drafts</h5>
        <p>No drafts have been saved.</p>
      </Stack>
    )
  } else {
    return (
      <Stack className="centered" gap={3}>
        <h5>Drafts</h5>
        {sortedDrafts().filter(trip => trip.plan === false).map(trip => (
          <Stack className="centered" key={trip.id}>
            <Card className="cards">
              <Card.Header className="card-header" as="h5">{trip.name}</Card.Header>
              <Card.Text className="p">{trip.trip_summary.departure_date && trip.trip_summary.return_date ? <td>{trip.trip_summary.departure_date.split("T")[0]} - {trip.trip_summary.return_date.split("T")[0]}</td> : <td>No dates yet</td>}</Card.Text>
              <Card.Text className="p">Cities: {trip.trip_summary.num_cities}</Card.Text>
              <Card.Text className="p">Accommodations: {trip.trip_summary.accommodations}</Card.Text>
              <Card.Text className="p">Activities: {trip.trip_summary.activities}</Card.Text>
              <Card.Text className="p">Transportation: {trip.trip_summary.transportations}</Card.Text>
              <Card.Text className="p">Cost: ${trip.trip_summary.cost}</Card.Text>
              <Stack className="card-buttons" direction="horizontal" gap={3}>
                <Button size="sm" variant="danger" onClick={() => handleDelete(trip)}>Delete</Button>
                <Button size="sm" variant="warning" type="submit" onClick={() => handleEdit(trip)}>Edit</Button>
                <Button size="sm" variant="primary" type="submit" onClick={() => handleFinalize(trip)}>Finalize</Button>
              </Stack>
            </Card>
          </Stack>
        ))}
      </Stack>
    )
  }
}

export default Drafts