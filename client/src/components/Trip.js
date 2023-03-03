import { useTripContext } from './context/CurrentTripContext'
import TripName from './TripName'
import TripData from './TripData'
import TripSummary from './TripSummary'
import TripButtons from './TripButtons'
import TripAddCity from './TripAddCity'
import TripAddTransportation from './TripAddTransportation'
import TripAddAccommodation from './TripAddAccommodation'
import TripAddActivity from './TripAddActivity'
import Stack from 'react-bootstrap/Stack'

function Trip({ selectedCity, handleCitySelection }) {
  const { currentTrip } = useTripContext()

  return (
    <Stack>
      {currentTrip !== null
        ? <Stack className="trip">
            <TripName />
            <TripAddCity />
            <p>Select a city to add...</p>
              <Stack className="small-button" direction="horizontal">
                <TripAddTransportation selectedCity={selectedCity} handleCitySelection={handleCitySelection} />
                <TripAddAccommodation selectedCity={selectedCity} handleCitySelection={handleCitySelection} />
                <TripAddActivity selectedCity={selectedCity} handleCitySelection={handleCitySelection} />
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