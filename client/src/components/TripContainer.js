import { useUserContext } from '../context/UserContext'
import Stack from 'react-bootstrap/Stack'
import Trip from './Trip'
import CityDetails from './CityDetails'
import TagContainer from './TagContainer'
import Spinner from 'react-bootstrap/Spinner'

function TripContainer() {
  const user = useUserContext()

  if (!user) {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  } else {
    return (
      <Stack className="trip-container" direction="horizontal" gap={3}>
        <TagContainer />
        <Trip />
        <CityDetails />
    </Stack>
    )
  }
}

export default TripContainer