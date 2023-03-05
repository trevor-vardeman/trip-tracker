import { useTripContext } from '../context/CurrentTripContext'

function TripName() {
  const { currentTrip } = useTripContext()

  return (
    <h3>Trip | {currentTrip.name}</h3>
  )
}

export default TripName