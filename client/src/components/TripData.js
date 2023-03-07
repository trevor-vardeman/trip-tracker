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
    console.log(id)
    fetch(`/cities/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(r => r.json())
    .then(user => {
      console.log(user)
      userUpdate(user)
      const updatedTrip = user.trips.filter(trip => trip.id === currentTrip.id)[0]
      setCurrentTrip(updatedTrip)
      const updatedCity = updatedTrip.cities.filter(city => city.id === currentCity.id)[0]
      setCurrentCity(updatedCity)
    })
    .catch(e => console.log(e))
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
        <p className="box-header-footer">Trip Start</p>
        <ArcherContainer>
          {currentTrip.cities.map((city, index) => (
            <Stack direction="horizontal" key={city.id}>
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
                className={`${city.id === selectedCityStyle ? "selected-city" : "null"} hover`}
                onClick={() => citySelection(city)}
              >
                {city.city}, {city.country}
              </p>
              </ArcherElement>
              {!currentTrip.plan ? <img className="hover" src="/assets/x.svg" alt="bootstrapXIcon" width="20" height="20" onClick={() => handleDelete(city.id)}/> : null}
            </Stack>
          ))}
        </ArcherContainer>
        <p className="box-header-footer">Trip End</p>
      </Stack>
    )
  }
}

export default TripData