import { useState } from 'react'
import { useTripContext } from './CurrentTripContext'
import Stack from 'react-bootstrap/Stack'
import Trip from './Trip'
import CityDetails from './CityDetails'

function TripContainer() {
  const { currentTrip } = useTripContext()
  const [selectedCity, setSelectedCity] = useState(null)
  const handleCitySelection = city => {
    if (selectedCity === null) {
      setSelectedCity(city)
    } else {
      const updateExistingCity = currentTrip.cities.filter(city => city.id === selectedCity.id)
      setSelectedCity(updateExistingCity)
    }
    console.log("selectedCity", selectedCity)
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <Trip selectedCity={selectedCity} handleCitySelection={handleCitySelection} />
      <CityDetails selectedCity={selectedCity} />
    </Stack>
  )
}

export default TripContainer