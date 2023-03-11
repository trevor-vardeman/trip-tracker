import { useState } from 'react'
import { useUserUpdate } from '../context/UserContext'
import { useTripContext } from '../context/CurrentTripContext'
import { useCityContext } from '../context/CurrentCityContext'
import { ArcherContainer, ArcherElement } from "react-archer"
import Stack from 'react-bootstrap/Stack'
import Spinner from 'react-bootstrap/Spinner'

function TripData() {
  const userUpdate = useUserUpdate()
  const { currentTrip, setCurrentTrip } = useTripContext()
  const { currentCity, setCurrentCity } = useCityContext()
  const [selectedCityStyle, setSelectedCityStyle] = useState("")
  const citySelection = city => {
    setSelectedCityStyle(city.id)
    setCurrentCity(city)
  }

  const handleDelete = id => {
    fetch(`/cities/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(r => r.json())
    .then(user => {
      userUpdate(user)
      const updatedTrip = user.trips.filter(trip => trip.id === currentTrip.id)[0]
      setCurrentTrip(updatedTrip)
      const updatedCity = updatedTrip.cities.filter(city => city.id === currentCity.id)[0]
      setCurrentCity(updatedCity)
    })
    .catch(e => alert(e))
  }

  if (!currentTrip) {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  } else {
    return (
      <Stack className="trip-data">
        <p className="bold">Trip Start</p>
        <ArcherContainer>
          {currentTrip.cities.sort((a, b) => a.id - b.id).map((city, index) => (
            <Stack className="centered" direction="horizontal" key={city.id}>
              <ArcherElement 
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
                className={`${city.id === selectedCityStyle ? "selected-city archer-element centered" : "null archer-element centered"} hover`}
                onClick={() => citySelection(city)}
              >
                {city.city}, {city.country}
              </p>
              </ArcherElement>
              <img className="hover" src="/assets/x.svg" alt="bootstrapXIcon" width="20" height="20" onClick={() => handleDelete(city.id)}/>
            </Stack>
          ))}
        </ArcherContainer>
        <p className="bold">Trip End</p>
      </Stack>
    )
  }
}

export default TripData