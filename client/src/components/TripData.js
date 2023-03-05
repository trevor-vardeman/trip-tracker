import { useState } from 'react'
import { useUserUpdate } from '../context/UserContext'
import { useTripContext } from '../context/CurrentTripContext'
import { useCityContext } from '../context/CurrentCityContext'
import { ArcherContainer, ArcherElement } from "react-archer"
import Stack from 'react-bootstrap/Stack'

function TripData() {
  const userUpdate = useUserUpdate()
  const { currentTrip, setCurrentTrip } = useTripContext()
  const { setCurrentCity } = useCityContext()
  const [selectedCityStyle, setSelectedCityStyle] = useState("")
  const citySelection = city => {
    setSelectedCityStyle(city.id)
    setCurrentCity(city)
  }

  const handleDelete = id => {
    console.log(id)
    fetch(`/cities/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .catch(e => alert(e))
    .then(r => r.json())
    .then(user => {
      const updatedTrip = user.trips.filter(trip => trip.id === currentTrip.id)[0]
      setCurrentTrip(updatedTrip)
      userUpdate(user)
    })
    .catch(e => alert(e))
  }

  return (
    <Stack className="trip-data">
      <p className="box-header-footer">Trip Start</p>
      <ArcherContainer>
        {currentTrip.cities.map((city, index) => (
          <Stack direction="horizontal">
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
              className={`${city.id === selectedCityStyle ? "selected-city" : "null"} hover`}
              onClick={() => citySelection(city)}
            >
              {city.city}, {city.country}
            </p>
            </ArcherElement>
            <img className="hover" src="/assets/x.svg" alt="bootstrapXIcon" width="20" height="20" onClick={() => handleDelete(city.id)}/>
          </Stack>
        ))}
      </ArcherContainer>
      <p className="box-header-footer">Trip End</p>
    </Stack>
  )
}

export default TripData