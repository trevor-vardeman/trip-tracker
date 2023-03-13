import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import { useUserUpdate } from '../context/UserContext'
import { useTripContext } from '../context/CurrentTripContext'
import { useCityContext } from '../context/CurrentCityContext'
import Stack from 'react-bootstrap/Stack'
import TripAddActivity from './TripAddActivity'
import TripAddAccommodation from './TripAddAccommodation'
import TripAddTransportation from './TripAddTransportation'

function CityDetails() {
  let location = useLocation()
  const userUpdate = useUserUpdate()
  const { currentTrip, setCurrentTrip } = useTripContext()
  const { currentCity, setCurrentCity } = useCityContext()
  const [activityProps, setActivityProps] = useState(null)
  const [accommodationProps, setAccommodationProps] = useState(null)
  const [transportationProps, setTransportationProps] = useState(null)

  const handleActivityEdit = activity => setActivityProps(activity)
  const handleAccommodationEdit = accommodation => setAccommodationProps(accommodation)
  const handleTransportationEdit = transportation => setTransportationProps(transportation)
  const handleClose = () => {
    setActivityProps(null)
    setAccommodationProps(null)
    setTransportationProps(null)
  }

  useEffect(() => {
    setCurrentCity(null)
  },[setCurrentCity, location])

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
            <Stack className="city-item" direction="horizontal" key={transportation.id}>
              <Stack>
                <Stack className="edit-delete-buttons" direction="horizontal">
                  {!currentTrip.plan ? <img className="hover" src="/assets/pencil-square.svg" alt="bootstrapEditIcon" width="15" height="15" onClick={() => handleTransportationEdit(transportation)}/> : null}
                  {!currentTrip.plan ? <img className="hover" src="/assets/x.svg" alt="bootstrapXIcon" width="20" height="20" onClick={() => handleDelete("transportations", transportation.id)}/> : null}
                </Stack>
                <Stack>
                  <p className="transportation p">Transportation</p>
                  <p className="p"><span className="bold">{transportation.start_location}</span> to <span className="bold">{transportation.end_location}</span></p>
                  <p className="p"><span className="bold">Description:</span> {transportation.description}</p>
                  <p className="p"><span className="bold">Cost:</span> ${transportation.cost}</p>
                  <p className="p"><span className="bold">Departure Time:</span> {transportation.start_datetime.split("T")[0]} {transportation.start_datetime.split("T")[1].split(":")[0]}:{transportation.start_datetime.split("T")[1].split(":")[1]}</p>
                  <p className="p"><span className="bold">Arrival Time:</span> {transportation.end_datetime.split("T")[0]} {transportation.end_datetime.split("T")[1].split(":")[0]}:{transportation.end_datetime.split("T")[1].split(":")[1]}</p>
                </Stack>
              </Stack>
            </Stack>
          ))}
          <div className="hide">
            {transportationProps ? <TripAddTransportation transportationProps={transportationProps} handleClose={handleClose}/> : null}
          </div>
        </>
      )
    }
  }

  const accommodations = () => {
    if (currentCity.accommodations.length > 0) {
      return (
        <>
          {currentCity.accommodations.map((accommodation) => (
            <Stack className="city-item" direction="horizontal" key={accommodation.id}>
              <Stack>
                <Stack className="edit-delete-buttons" direction="horizontal">
                  {!currentTrip.plan ? <img className="hover" src="/assets/pencil-square.svg" alt="bootstrapEditIcon" width="15" height="15" onClick={() => handleAccommodationEdit(accommodation)}/> : null}
                  {!currentTrip.plan ? <img className="hover" src="/assets/x.svg" alt="bootstrapXIcon" width="20" height="20" onClick={() => handleDelete("accommodations", accommodation.id)}/> : null}
                </Stack>
                <p className="accommodation p">Accommodation</p>
                <p className="bold p">{accommodation.description}</p>
                <p className="p"><span className="bold p">Cost:</span> ${accommodation.cost}</p>
                <p className="p"><span className="bold">Arrival Date:</span> {accommodation.start_datetime.split("T")[0]} {accommodation.start_datetime.split("T")[1].split(":")[0]}:{accommodation.start_datetime.split("T")[1].split(":")[1]}</p>
                <p className="p"><span className="bold">Arrival Date:</span> {accommodation.end_datetime.split("T")[0]} {accommodation.end_datetime.split("T")[1].split(":")[0]}:{accommodation.end_datetime.split("T")[1].split(":")[1]}</p>
              </Stack>
            </Stack>
          ))}
          <div className="hide">
            {accommodationProps ? <TripAddAccommodation accommodationProps={accommodationProps} handleClose={handleClose}/> : null}
          </div>
        </>
      )
    } else return null
  }

  const activities = () => {
    if (currentCity.activities.length > 0) {
      return (
        <>
          {currentCity.activities.map((activity) => (
            <Stack className="city-item" direction="horizontal" key={activity.id}>
              <Stack>
                <Stack className="edit-delete-buttons" direction="horizontal">
                  {!currentTrip.plan ? <img className="hover" src="/assets/pencil-square.svg" alt="bootstrapEditIcon" width="15" height="15" onClick={() => handleActivityEdit(activity)}/> : null}
                  {!currentTrip.plan ? <img className="hover" src="/assets/x.svg" alt="bootstrapXIcon" width="20" height="20" onClick={() => handleDelete("activities", activity.id)}/> : null}
                </Stack>
                <p className="activity p">Activity</p>
                <p className="bold p">{activity.description}</p>
                <p className="p"><span className="bold">Cost:</span> ${activity.cost}</p>
                <p className="p"><span className="bold">Start Time:</span> {activity.start_datetime.split("T")[0]} {activity.start_datetime.split("T")[1].split(":")[0]}:{activity.start_datetime.split("T")[1].split(":")[1]}</p>
                <p className="p"><span className="bold">End Time:</span> {activity.end_datetime.split("T")[0]} {activity.end_datetime.split("T")[1].split(":")[0]}:{activity.end_datetime.split("T")[1].split(":")[1]}</p>
              </Stack>
            </Stack>
          ))}
          <div className="hide">
            {activityProps ? <TripAddActivity activityProps={activityProps} handleClose={handleClose}/> : null}
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
            <Stack className="city-item" direction="horizontal" key={transportation.id}>
              <Stack>
                <Stack className="edit-delete-buttons" direction="horizontal">
                  {!currentTrip.plan ? <img className="hover" src="/assets/pencil-square.svg" alt="bootstrapEditIcon" width="15" height="15" onClick={() => handleTransportationEdit(transportation)}/> : null}
                  {!currentTrip.plan ? <img className="hover" src="/assets/x.svg" alt="bootstrapXIcon" width="20" height="20" onClick={() => handleDelete("transportations", transportation.id)}/> : null}
                </Stack>
                <p className="transportation p">Transportation</p>
                <p className="p"><span className="bold">{transportation.start_location}</span> to <span className="bold">{transportation.end_location}</span></p>
                <p className="p"><span className="bold">Description:</span> {transportation.description}</p>
                <p className="p"><span className="bold">Cost:</span> ${transportation.cost}</p>
                <p className="p"><span className="bold">Departure Time:</span> {transportation.start_datetime.split("T")[0]} {transportation.start_datetime.split("T")[1].split(":")[0]}:{transportation.start_datetime.split("T")[1].split(":")[1]}</p>
                <p className="p"><span className="bold">Arrival Time:</span> {transportation.end_datetime.split("T")[0]} {transportation.end_datetime.split("T")[1].split(":")[0]}:{transportation.end_datetime.split("T")[1].split(":")[1]}</p>
              </Stack>
            </Stack>
          ))}
          <div className="hide">
            {transportationProps ? <TripAddTransportation transportationProps={transportationProps} handleClose={handleClose}/> : null}
          </div>
        </>
      )
    } else return null
  }

  if (currentCity) {
    return (
      <Stack className="centered city-details">
        <h5>{currentCity.city}, {currentCity.country} Details</h5>
        <Stack className="city-data xsmall" gap={1}>
          {endLocations()}
          {accommodations()}
          {activities()}
          {startLocations()}
        </Stack>
        <br></br>
      </Stack>
    )
  } else {
    return (
      <Stack className="centered city-details">
        <h5>City Details</h5>
        <Stack className="city-data xsmall" gap={1}></Stack>
      </Stack>
    )
  }
}

export default CityDetails