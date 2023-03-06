import { useTripContext } from '../context/CurrentTripContext'
import Spinner from 'react-bootstrap/Spinner'

function TripName() {
  const { currentTrip } = useTripContext()

  if (!currentTrip) {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  } else {
    return (
      <h3>Trip | {currentTrip.name}</h3>
    )
  }
}

export default TripName