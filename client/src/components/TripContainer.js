import { useUserContext } from '../context/UserContext'
import Stack from 'react-bootstrap/Stack'
import Trip from './Trip'
import CityDetails from './CityDetails'
import Spinner from 'react-bootstrap/Spinner'

function TripContainer() {
  const user = useUserContext()

  if (user === null || undefined) {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  } else {
    return (
      <Stack direction="horizontal">
      <Trip />
      <CityDetails />
    </Stack>
    )
  }
}

export default TripContainer