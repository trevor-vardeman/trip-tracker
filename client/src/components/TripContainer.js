import Stack from 'react-bootstrap/Stack'
import Trip from './Trip'
import CityDetails from './CityDetails'

function TripContainer() {
  return (
    <Stack direction="horizontal">
      <Trip />
      <CityDetails />
    </Stack>
  )
}

export default TripContainer