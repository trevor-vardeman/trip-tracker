import TripName from './TripName'
import TripData from './TripData'
import TripSummary from './TripSummary'
import TripButtons from './TripButtons'
import TripAdditions from './TripAdditions'
import Stack from 'react-bootstrap/Stack'

function Trip({ currentTrip }) {
  console.log(currentTrip, "currentTrip")
  return (
    <Stack gap={3}>
      {currentTrip !== null 
        ? <Stack>
            <TripName currentTrip={currentTrip} />
            <p>{currentTrip.cities[0].city}, {currentTrip.cities[0].country}</p> 
            <TripData />
            <TripSummary />
            <TripButtons />
            <TripAdditions />
          </Stack>
        : null
      }
    </Stack>
  )
}

export default Trip