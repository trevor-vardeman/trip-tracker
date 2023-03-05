import { useTripContext } from '../context/CurrentTripContext'
import Stack from 'react-bootstrap/Stack'

function TripSummary() {
  const { currentTrip } = useTripContext()

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

export default TripSummary