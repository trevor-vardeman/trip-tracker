import { useCityContext } from '../context/CurrentCityContext'
import Stack from 'react-bootstrap/Stack'

function CityDetails() {
  const { currentCity } = useCityContext()
  console.log("currentCity", currentCity)

  const endLocations = () => {
    if (currentCity.end_locations.length > 0) {
      return (
        <>
          {currentCity.end_locations.map((city) => (
            <div key={city.id}>
              <p><span className="bold">{city.start_location}</span> to <span className="bold">{city.end_location}</span></p>
              <p><span className="bold">Description:</span> {city.description}</p>
              <p><span className="bold">Cost:</span> ${city.cost}</p>
              <p><span className="bold">Departure Time:</span> {city.start_datetime}</p>
              <p><span className="bold">Arrival Time:</span> {city.end_datetime}</p>
            </div>
          ))}
        </>
      )
    }
  }

  const accommodations = () => {
    if (currentCity.accommodations.length > 0) {
      return (
        <>
          {currentCity.accommodations.map((acc) => (
            <div key={acc.id}>
              <p className="bold">{acc.description}</p>
              <p><span className="bold">Cost:</span> ${acc.cost}</p>
              <p><span className="bold">Arrival Date:</span> ${acc.start_datetime}</p>
              <p><span className="bold">Arrival Date:</span> ${acc.end_datetime}</p>
            </div>
          ))}
        </>
      )
    } else return null
  }

  const activities = () => {
    if (currentCity.activities.length > 0) {
      return (
        <>
          {currentCity.activities.map((activity) => (
            <div key={activity.id}>
              <p className="bold">{activity.description}</p>
              <p><span className="bold">Cost:</span> ${activity.cost}</p>
              <p><span className="bold">Start Time:</span> ${activity.start_datetime}</p>
              <p><span className="bold">End Time:</span> ${activity.end_datetime}</p>
            </div>
          ))}
        </>
      )
    } else return null
  }

  const startLocations = () => {
    if (currentCity.start_locations.length > 0) {
      return (
        <>
          {currentCity.start_locations.map((city) => (
            <div key={city.id}>
              <p><span className="bold">{city.start_location}</span> to <span className="bold">{city.end_location}</span></p>
              <p><span className="bold">Description:</span> {city.description}</p>
              <p><span className="bold">Cost:</span> ${city.cost}</p>
              <p><span className="bold">Departure Time:</span> {city.start_datetime}</p>
              <p><span className="bold">Arrival Time:</span> {city.end_datetime}</p>
            </div>
          ))}
        </>
      )
    } else return null
  }

  if (currentCity) {
    return (
      <Stack className="city-details">
        <p className="box-header-footer">{currentCity.city}, {currentCity.country} Details</p>
        <div className="xsmall">
          {endLocations()}
          {accommodations()}
          {activities()}
          {startLocations()}
        </div>
        <br></br>
      </Stack>
    )
  } else return null
}

export default CityDetails