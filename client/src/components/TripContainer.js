import Stack from 'react-bootstrap/Stack'
import Trip from './Trip'
import CityDetails from './CityDetails'

function TripContainer() {
  return (
    <Stack direction="horizontal" gap={3}>
      <Trip />
      <CityDetails />
    </Stack>
  )
}

export default TripContainer