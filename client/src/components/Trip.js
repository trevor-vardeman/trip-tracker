import { useTripContext } from './CurrentTripContext'
import TripName from './TripName'
import TripData from './TripData'
import TripSummary from './TripSummary'
import TripButtons from './TripButtons'
import TripAdditions from './TripAdditions'
import Stack from 'react-bootstrap/Stack'

function Trip() {
  const {
    currentTrip, 
    setCurrentTrip
  } = useTripContext()

  return (
    <Stack>
      {currentTrip !== null 
        ? <Stack>
            <TripName />
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