import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'

function Cities() {
  const user = useUserContext()
  const [past, setPast] = useState(true)

  if (user === null || undefined) {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  } else if (user.cities.length === 0) {
    return (
      <Stack gap={3}>
        <h3>Cities</h3>
        <p>No cities have been added.</p>
      </Stack>
    )
  } else {
    return (
      <Stack gap={3}>
        <h3>Cities</h3>
        <Stack direction="horizontal">
          <Button size="sm" variant={past ? "primary" : "secondary"} onClick={() => setPast(!past)}>Past</Button>
          <Button size="sm" variant={!past ? "primary" : "secondary"} onClick={() => setPast(!past)}>Upcoming</Button>
        </Stack>
        <Table size="sm">
          <thead>
            <tr>
              <th>City</th>
              <th>Country</th>
              <th>Dates</th>
              <th>View Trip</th>
            </tr>
          </thead>
          <tbody>
            {user.cities.sort((a, b) => a.city.localeCompare(b.city)).map(city => (
              <tr key={city.id}>
                <td>{city.city}</td>
                <td>{city.country}</td>
                {city.arrival_date && city.departure_date ? <td>{city.arrival_date.split("T")[0]} - {city.departure_date.split("T")[0]}</td> : <td>No dates yet</td>}
                <Link to={`/trips/${city.trip_id}`}>Open Trip</Link>
              </tr>
            ))}
          </tbody>
        </Table>
      </Stack>
    )
  }
}

export default Cities