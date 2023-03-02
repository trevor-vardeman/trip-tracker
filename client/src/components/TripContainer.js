import { useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import Trip from './Trip'
import CityDetails from './CityDetails'

function TripContainer() {
  const [selectedCity, setSelectedCity] = useState(null)
  const handleCitySelection = city => {
    // if (selectedCity === null) {
      setSelectedCity(city)
      console.log("city", city)
    // } else {
    //   console.log(selectedCity)
    // }
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <Trip selectedCity={selectedCity} handleCitySelection={handleCitySelection} />
      <CityDetails selectedCity={selectedCity} />
    </Stack>
  )
}

export default TripContainer