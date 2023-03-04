import { useTripContext } from '../context/CurrentTripContext'
import Stack from 'react-bootstrap/Stack'
import CityDetails from './CityDetails'

function TripSummary() {
  const { currentTrip, setCurrentTrip } = useTripContext()

  const summary = () => {
    console.log("currentTrip in TripSummary", currentTrip)
    const cities = currentTrip.cities.length
    var accommodations = 0
    var activities = 0
    var transportations = 0

    currentTrip.cities.forEach((city) => {
      let cityAccommodations = city.accommodations.length
      let cityActivities = city.activities.length
      let cityStartLocations = city.start_locations.length
      accommodations += cityAccommodations
      activities += cityActivities
      transportations += cityStartLocations
    })

    return (
      <div>
        <p>Cities: {cities}</p>
        <p>Accommodations: {accommodations}</p>
        <p>Activities: {activities}</p>
        <p>Transporatation: {transportations}</p>
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