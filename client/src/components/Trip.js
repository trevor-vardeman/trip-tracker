import { useState } from 'react'
import { useTripContext } from './CurrentTripContext'
import TripName from './TripName'
import TripData from './TripData'
import TripSummary from './TripSummary'
import TripButtons from './TripButtons'
import TripAddCity from './TripAddCity'
import TripAddTransportation from './TripAddTransportation'
import TripAddAccommodation from './TripAddAccommodation'
import TripAddActivity from './TripAddActivity'
import Stack from 'react-bootstrap/Stack'

function Trip() {
  const {currentTrip, setCurrentTrip} = useTripContext()
  const [selectedCity, setSelectedCity] = useState(null)

  const handleCitySelection = city => {
    setSelectedCity(city)
    console.log("trip", city)
  }

  return (
    <Stack>
      {currentTrip !== null 
        ? <Stack className="trip">
            <TripName />
              <Stack direction="horizontal">
                <TripAddCity handleCitySelection={handleCitySelection} />
                <TripAddTransportation />
                <TripAddAccommodation />
                <TripAddActivity />
              </Stack>
            <TripData handleCitySelection={handleCitySelection} />
            <TripSummary />
            <TripButtons />
          </Stack>
        : null
      }
    </Stack>
  )
}

export default Trip