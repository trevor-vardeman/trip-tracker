import { useState } from 'react'
import { useTripContext } from './CurrentTripContext'
import TripName from './TripName'
import TripData from './TripData'
import TripSummary from './TripSummary'
import TripButtons from './TripButtons'
import TripAdditions from './TripAdditions'
import Stack from 'react-bootstrap/Stack'

function Trip() {
  // const [citySelected, setCitySelected] = useState(false)
  // const selectCity (city) {
  //   setCitySelected(true)
  // }

  const {
    currentTrip, 
    setCurrentTrip
  } = useTripContext()

  return (
    <Stack>
      {currentTrip !== null 
        ? <Stack>
            <TripName />
            {/* <TripData citySelected={citySelected} /> */}
            <TripData />
            <TripSummary />
            <TripButtons />
            {/* <TripAdditions citySelected={citySelected} /> */}
            <TripAdditions />
          </Stack>
        : null
      }
    </Stack>
  )
}

export default Trip