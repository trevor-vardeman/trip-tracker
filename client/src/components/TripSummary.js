import { useTripContext } from '../context/CurrentTripContext'
import Stack from 'react-bootstrap/Stack'

function TripSummary() {
  const { currentTrip } = useTripContext()

  const summary = () => {
    console.log("currentTrip in TripSummary", currentTrip)
    const cities = currentTrip.cities.length
    var accommodations = 0
    var activities = 0
    var transportations = 0
    var cost = 0

    currentTrip.cities.forEach((city) => {
      let cityAccommodations = city.accommodations.length
      let cityActivities = city.activities.length
      let cityStartLocations = city.start_locations.length
      accommodations += cityAccommodations
      activities += cityActivities
      transportations += cityStartLocations
      city.accommodations.map(acc => cost += acc.cost)
      city.activities.map(act => cost += act.cost)
      city.start_locations.map(tran => cost += tran.cost)
    })

    return (
      <div>
        <p>Cities: {cities}</p>
        <p>Accommodations: {accommodations}</p>
        <p>Activities: {activities}</p>
        <p>Transporatation: {transportations}</p>
        <p className="bold">Cost: ${cost}</p>
      </div>
    )
  }

  return (
    <Stack>
      <p className="bold">Trip Summary</p>
      {summary()}
    </Stack>
  )
}

export default TripSummary