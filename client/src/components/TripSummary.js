import { useTripContext } from '../context/CurrentTripContext'
import Stack from 'react-bootstrap/Stack'
import Spinner from 'react-bootstrap/Spinner'

function TripSummary() {
  const { currentTrip } = useTripContext()

  if (!currentTrip) {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  } else {
    return (
      <Stack>
        <p className="bold">Trip Summary</p>
        <p>Cities: {currentTrip.trip_summary.num_cities}</p>
        <p>Accommodations: {currentTrip.trip_summary.accommodations}</p>
        <p>Activities: {currentTrip.trip_summary.activities}</p>
        <p>Transporatation: {currentTrip.trip_summary.transportations}</p>
        <p className="bold">Cost: ${currentTrip.trip_summary.cost}</p>
      </Stack>
    )
  }
}

export default TripSummary