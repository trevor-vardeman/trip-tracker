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
      <div>
        {!currentTrip.plan ? <h3>Draft | {currentTrip.name}</h3> : <h3>Plan | {currentTrip.name}</h3>}
      </div>
    )
  }
}

export default TripName