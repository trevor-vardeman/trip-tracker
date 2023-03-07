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
  const handleView = trip => {
    console.log(trip)
  }

  if (user === null || undefined) {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  } else if (user.cities.length === 0) {
    return (
      <Stack gap={3}>
        <h3>Plans</h3>
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
              <th>Dates</th>
              <th>City</th>
              <th>Country</th>
              <th>View Trip</th>
            </tr>
          </thead>
          <tbody>
            {user.cities.map(city => (
              <tr key={city.id}>
                <td></td>
                <td>{city.city}</td>
                <td>{city.country}</td>
                <Link to={`/drafts/${city.trip_id}`}>Open Trip</Link>
              </tr>
            ))}
          </tbody>
        </Table>
      </Stack>
    )
  }
}

export default Cities