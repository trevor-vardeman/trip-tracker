import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import { useTripContext } from '../context/CurrentTripContext'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'

function Cities() {
  const history = useHistory()
  const user = useUserContext()
  const { setCurrentTrip } = useTripContext()
  const [past, setPast] = useState(false)
  const handleOpenTrip = city => {
    setCurrentTrip(user.trips.find(trip => trip.id === city.trip_id))
    history.push(`/trips/${city.trip_id}`)
  }

  const sortedCities = () => {
    if (!user.cities) {
      return 
    } else  {
      let now = new Date()
      let citiesWithDates = user.cities.filter(city => city.arrival_date !== null && city.departure_date !== null)
      citiesWithDates.sort((a, b) => a.arrival_date.localeCompare(b.arrival_date))
      let upcomingDates = citiesWithDates.filter(city => city.departure_date > now.toISOString())

      let citiesWithoutDates = user.cities.filter(city => city.arrival_date === null || city.departure_date === null)
      citiesWithoutDates.sort((a, b) => a.city.localeCompare(b.city))

      let pastDates = citiesWithDates.filter(city => city.departure_date < now.toISOString())

      let allUpcomingTrips = [...upcomingDates, ...citiesWithoutDates]
      return {upcoming: allUpcomingTrips, past: pastDates}
    }
  }

  if (!user) {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  } else if (user.cities.length === 0) {
    return (
      <Stack className="centered" gap={3}>
        <h5>Cities</h5>
        <p>No cities have been added.</p>
      </Stack>
    )
  } else {
    return (
      <Stack className="centered" gap={3}>
        <h5>Cities</h5>
        <Stack className="centered" direction="horizontal">
          <Button size="sm" variant={!past ? "primary" : "secondary"} onClick={() => setPast(!past)}>Upcoming</Button>
          <Button size="sm" variant={past ? "primary" : "secondary"} onClick={() => setPast(!past)}>Past</Button>
        </Stack>
        <Table className="centered" size="sm" striped bordered hover>
          <thead>
            <tr>
              <th>Dates</th>
              <th>City</th>
              <th>Country</th>
              <th>View Trip</th>
            </tr>
          </thead>
          <tbody>
            {!past 
              ? sortedCities().upcoming.map(city => (
                  <tr className="centered" key={city.id}>
                    {city.arrival_date && city.departure_date ? <td>{city.arrival_date.split("T")[0]} - {city.departure_date.split("T")[0]}</td> : <td>No dates yet</td>}
                    <td>{city.city}</td>
                    <td>{city.country}</td>
                    <td><img className="hover" src="/assets/arrow-up-right-circle.svg" alt="bootstrapOpenIcon" width="20" height="20" onClick={() => handleOpenTrip(city)}/></td>
                  </tr>
                ))
              : sortedCities().past.map(city => (
                  <tr className="centered" key={city.id}>
                    {city.arrival_date && city.departure_date ? <td>{city.arrival_date.split("T")[0]} - {city.departure_date.split("T")[0]}</td> : <td>No dates yet</td>}
                    <td>{city.city}</td>
                    <td>{city.country}</td>
                    <td><img className="hover" src="/assets/arrow-up-right-circle.svg" alt="bootstrapOpenIcon" width="20" height="20" onClick={() => handleOpenTrip(city)}/></td>
                  </tr>
                ))
            }
          </tbody>
        </Table>
      </Stack>
    )
  }
}

export default Cities