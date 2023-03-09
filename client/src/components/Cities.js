import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'

function Cities() {
  const user = useUserContext()
  const [past, setPast] = useState(false)
  const sortedCities = () => {
    if (user.cities === null) {
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

  if (user === null || undefined) {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  } else if (user.cities.length === 0) {
    return (
      <Stack className="centered" gap={3}>
        <h3>Cities</h3>
        <p>No cities have been added.</p>
      </Stack>
    )
  } else {
    return (
      <Stack className="centered cities" gap={3}>
        <h3>Cities</h3>
        <Stack className="centered" direction="horizontal">
          <Button size="sm" variant={!past ? "primary" : "secondary"} onClick={() => setPast(!past)}>Upcoming</Button>
          <Button size="sm" variant={past ? "primary" : "secondary"} onClick={() => setPast(!past)}>Past</Button>
        </Stack>
        <Table size="sm">
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
                  <tr key={city.id}>
                    {city.arrival_date && city.departure_date ? <td>{city.arrival_date.split("T")[0]} - {city.departure_date.split("T")[0]}</td> : <td>No dates yet</td>}
                    <td>{city.city}</td>
                    <td>{city.country}</td>
                    <Link to={`/trips/${city.trip_id}`}>Open Trip</Link>
                  </tr>
                ))
              : sortedCities().past.map(city => (
                  <tr key={city.id}>
                    {city.arrival_date && city.departure_date ? <td>{city.arrival_date.split("T")[0]} - {city.departure_date.split("T")[0]}</td> : <td>No dates yet</td>}
                    <td>{city.city}</td>
                    <td>{city.country}</td>
                    <Link to={`/trips/${city.trip_id}`}>Open Trip</Link>
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