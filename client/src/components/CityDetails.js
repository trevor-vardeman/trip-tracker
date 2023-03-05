import { useState } from 'react'
import { useUserUpdate } from '../context/UserContext'
import { useTripContext } from '../context/CurrentTripContext'
import { useCityContext } from '../context/CurrentCityContext'
import Stack from 'react-bootstrap/Stack'
import TripAddActivity from './TripAddActivity'

function CityDetails() {
  const userUpdate = useUserUpdate()
  const { currentTrip, setCurrentTrip } = useTripContext()
  const { currentCity, setCurrentCity } = useCityContext()
  const [activityProps, setActivityProps] = useState(null)

  const handleActivityEdit = activity => setActivityProps(activity)
  const handleClose = () => {
    setActivityProps(null)
    console.log("cleared")
  }

  const handleDelete = (type, objId) => {
    fetch(`/${type}/${objId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .catch(e => alert(e))
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

  const endLocations = () => {
    if (currentCity.end_locations.length > 0) {
      return (
        <>
          {currentCity.end_locations.map((transportation) => (
            <Stack direction="horizontal" key={transportation.id}>
              <Stack className="city-detail">
                <p><span className="bold">{transportation.start_location}</span> to <span className="bold">{transportation.end_location}</span></p>
                <p><span className="bold">Description:</span> {transportation.description}</p>
                <p><span className="bold">Cost:</span> ${transportation.cost}</p>
                <p><span className="bold">Departure Time:</span> {transportation.start_datetime}</p>
                <p><span className="bold">Arrival Time:</span> {transportation.end_datetime}</p>
              </Stack>
              <Stack>
                <img className="hover" src="/assets/x.svg" alt="bootstrapXIcon" width="20" height="20" onClick={() => handleDelete("transportations", transportation.id)}/>
                <img className="hover" src="/assets/pencil-square.svg" alt="bootstrapEditIcon" width="18" height="18"/>
              </Stack>
            </Stack>
          ))}
        </>
      )
    }
  }

  const accommodations = () => {
    if (currentCity.accommodations.length > 0) {
      return (
        <>
          {currentCity.accommodations.map((accommodation) => (
            <Stack direction="horizontal" key={accommodation.id}>
              <Stack className="city-detail">
                <p className="bold">{accommodation.description}</p>
                <p><span className="bold">Cost:</span> ${accommodation.cost}</p>
                <p><span className="bold">Arrival Date:</span> {accommodation.start_datetime}</p>
                <p><span className="bold">Arrival Date:</span> {accommodation.end_datetime}</p>
              </Stack>
              <Stack>
                <img className="hover" src="/assets/x.svg" alt="bootstrapXIcon" width="20" height="20" onClick={() => handleDelete("accommodations", accommodation.id)}/>
                <img className="hover" src="/assets/pencil-square.svg" alt="bootstrapEditIcon" width="18" height="18"/>
              </Stack>
            </Stack>
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
            <Stack direction="horizontal" key={activity.id}>
              <Stack className="city-detail">
                <p className="bold">{activity.description}</p>
                <p><span className="bold">Cost:</span> ${activity.cost}</p>
                <p><span className="bold">Start Time:</span> {activity.start_datetime}</p>
                <p><span className="bold">End Time:</span> {activity.end_datetime}</p>
              </Stack>
              <Stack>
                <img className="hover" src="/assets/x.svg" alt="bootstrapXIcon" width="20" height="20" onClick={() => handleDelete("activities", activity.id)}/>
                <img className="hover" src="/assets/pencil-square.svg" alt="bootstrapEditIcon" width="18" height="18" onClick={() => handleActivityEdit(activity)}/>
              </Stack>
            </Stack>
          ))}
          <div style={{display: "none"}}>
            {activityProps ? <TripAddActivity props={activityProps} handleClose={handleClose}/> : null}
          </div>
        </>
      )
    } else return null
  }

  const startLocations = () => {
    if (currentCity.start_locations.length > 0) {
      return (
        <>
          {currentCity.start_locations.map((transportation) => (
            <Stack direction="horizontal" key={transportation.id}>
              <Stack className="city-detail">
                <p><span className="bold">{transportation.start_location}</span> to <span className="bold">{transportation.end_location}</span></p>
                <p><span className="bold">Description:</span> {transportation.description}</p>
                <p><span className="bold">Cost:</span> ${transportation.cost}</p>
                <p><span className="bold">Departure Time:</span> {transportation.start_datetime}</p>
                <p><span className="bold">Arrival Time:</span> {transportation.end_datetime}</p>
              </Stack>
              <Stack>
                <img className="hover" src="/assets/x.svg" alt="bootstrapXIcon" width="20" height="20" onClick={() => handleDelete("transportations", transportation.id)}/>
                <img className="hover" src="/assets/pencil-square.svg" alt="bootstrapEditIcon" width="18" height="18"/>
              </Stack>
            </Stack>
          ))}
        </>
      )
    } else return null
  }

  if (currentCity) {
    return (
      <Stack className="city-details">
        <p className="box-header-footer">{currentCity.city}, {currentCity.country} Details</p>
        <Stack gap={1} className="xsmall">
          {endLocations()}
          {accommodations()}
          {activities()}
          {startLocations()}
        </Stack>
        <br></br>
      </Stack>
    )
  } else return null
}

export default CityDetails