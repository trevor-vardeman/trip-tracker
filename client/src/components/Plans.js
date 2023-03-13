import { useState } from 'react'
import { useHistory } from "react-router-dom"
import { useUserContext } from '../context/UserContext'
import { useTripContext } from '../context/CurrentTripContext'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'

function Plans() {
  const history = useHistory()
  const user = useUserContext()
  const { setCurrentTrip } = useTripContext()
  const [past, setPast] = useState(false)
  const handleView = trip => {
    setCurrentTrip(trip)
    history.push(`/trips/${trip.id}`)
  }
  const sortedPlans = () => {
    if (user.cities === null) {
      return 
    } else  {
      let now = new Date()
      let tripsWithDates = user.trips.filter(trip => trip.trip_summary.departure_date !== null && trip.trip_summary.return_date !== null)
      tripsWithDates.sort((a, b) => a.trip_summary.departure_date.localeCompare(b.trip_summary.departure_date))
      let upcomingDates = tripsWithDates.filter(trip => trip.trip_summary.return_date > now.toISOString())

      let tripsWithoutDates = user.trips.filter(trip => trip.trip_summary.departure_date === null || trip.trip_summary.return_date === null)
      tripsWithoutDates.sort((a, b) => a.name.localeCompare(b.name))
      let pastDates = tripsWithDates.filter(trip => trip.trip_summary.return_date < now.toISOString())
      let allUpcomingPlans = [...upcomingDates, ...tripsWithoutDates]
      return {upcoming: allUpcomingPlans, past: pastDates}
    }
  }

  if (!user) {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  } else if (user.trips.filter(trip => trip.plan === true).length === 0) {
    return (
      <Stack className="centered" gap={3}>
        <h5>Plans</h5>
        <p>No plans have been finalized.</p>
      </Stack>
    )
  } else {
    return (
      <Stack className="centered" gap={3}>
        <h5>Plans</h5>
        <Stack className="centered" direction="horizontal">
          <Button size="sm" variant={!past ? "primary" : "secondary"} onClick={() => setPast(!past)}>Upcoming</Button>
          <Button size="sm" variant={past ? "primary" : "secondary"} onClick={() => setPast(!past)}>Past</Button>
        </Stack>
          {!past
            ? sortedPlans().upcoming.filter(trip => trip.plan === true).map(trip => (
                <Stack className="centered" key={trip.id}>
                  <Card className="cards">
                    <Card.Header className="card-header" as="h5">{trip.name}</Card.Header>
                    <Card.Text className="p">{trip.trip_summary.departure_date && trip.trip_summary.return_date ? <td>{trip.trip_summary.departure_date.split("T")[0]} - {trip.trip_summary.return_date.split("T")[0]}</td> : <td>No dates yet</td>}</Card.Text>
                    <Card.Text className="p">Cities: {trip.trip_summary.num_cities}</Card.Text>
                    <Card.Text className="p">Accommodations: {trip.trip_summary.accommodations}</Card.Text>
                    <Card.Text className="p">Activities: {trip.trip_summary.activities}</Card.Text>
                    <Card.Text className="p">Transportation: {trip.trip_summary.transportations}</Card.Text>
                    <Card.Text className="p">Cost: ${trip.trip_summary.cost}</Card.Text>
                    <Button size="sm" variant="dark" onClick={() => handleView(trip)}>View</Button>
                  </Card>
                </Stack>
              ))
            : sortedPlans().past.filter(trip => trip.plan === true).map(trip => (
                <Stack className="centered" key={trip.id}>
                  <Card className="cards">
                    <Card.Header className="card-header" as="h5">{trip.name}</Card.Header>
                    <Card.Text className="p">{trip.trip_summary.departure_date && trip.trip_summary.return_date ? <td>{trip.trip_summary.departure_date.split("T")[0]} - {trip.trip_summary.return_date.split("T")[0]}</td> : <td>No dates yet</td>}</Card.Text>
                    <Card.Text className="p">Cities: {trip.trip_summary.num_cities}</Card.Text>
                    <Card.Text className="p">Accommodations: {trip.trip_summary.accommodations}</Card.Text>
                    <Card.Text className="p">Activities: {trip.trip_summary.activities}</Card.Text>
                    <Card.Text className="p">Transportation: {trip.trip_summary.transportations}</Card.Text>
                    <Card.Text className="p">Cost: ${trip.trip_summary.cost}</Card.Text>
                    <Button size="sm" variant="dark" onClick={() => handleView(trip)}>View</Button>
                  </Card>
                </Stack>
              ))}
        </Stack>
    )
  }
}

export default Plans