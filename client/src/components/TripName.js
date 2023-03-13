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
        {!currentTrip.plan ? <h5>Draft | {currentTrip.name}</h5> : <h5>Plan | {currentTrip.name}</h5>}
      </div>
    )
  }
}

export default TripName