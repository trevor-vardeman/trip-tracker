import { useState } from 'react'
import { useTripContext } from './CurrentTripContext'
import { ArcherContainer, ArcherElement } from "react-archer"
import Stack from 'react-bootstrap/Stack'

function TripData({ handleCitySelection }) {
  const { currentTrip } = useTripContext()
  const [selectedCityStyle, setSelectedCityStyle] = useState("")
  const citySelection = (city) => {
    console.log("city", city)
    setSelectedCityStyle(city.id)
    console.log(selectedCityStyle, "selectedCityStyle")
    handleCitySelection(city)
  }

  return (
    <Stack className="trip-data">
      <p className="trip-start-end">Trip Start</p>
      <ArcherContainer>
        {currentTrip.cities.map((city, index) => (
          <ArcherElement 
            key={city.id}
            id={index.toString()}
            relations={[
              {
                targetId: (index + 1).toString(),
                targetAnchor: 'top',
                sourceAnchor: 'bottom',
                style: { strokeColor: 'black', strokeWidth: 1 }
              },
            ]}
          >
            <p 
              key={city.id} 
              className={`${city.id === selectedCityStyle ? "selected-city" : "null"} city`}
              onClick={() => citySelection(city)}
            >{city.city}, {city.country}</p>
          </ArcherElement>
        ))}
      </ArcherContainer>
      <p className="trip-start-end">Trip End</p>
    </Stack>
  )
}

export default TripData