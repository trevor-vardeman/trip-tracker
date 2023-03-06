import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useUserContext } from '../context/UserContext'
import { useTripContext } from '../context/CurrentTripContext'
import TripName from './TripName'
import TripData from './TripData'
import TripSummary from './TripSummary'
import TripButtons from './TripButtons'
import TripAddCity from './TripAddCity'
import TripAddTransportation from './TripAddTransportation'
import TripAddAccommodation from './TripAddAccommodation'
import TripAddActivity from './TripAddActivity'
import Stack from 'react-bootstrap/Stack'
import Spinner from 'react-bootstrap/Spinner'

function Trip() {
  const user = useUserContext()
  const { currentTrip, setCurrentTrip } = useTripContext()
  const paramId = useParams().id

  useEffect(() => {
    if (currentTrip === null) {
      let trip = user.trips.filter(trip => trip.id === paramId)
      if (trip) {
        setCurrentTrip(trip)
      } else {
        return <h3>Trip not found.</h3>
      }
      // fetch("/trips", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json", },
      //   body: JSON.stringify(trip)
      // })
      // .then(r => r.json())
      // .then(user => {
      //   userUpdate(user)
      //   setCurrentTrip(user.trips[user.trips.length - 1])
      //   setName("")
      //   setCity("")
      //   setCountry("")
      //   setShowModal(false)
      // })
      // .catch(e => alert(e))
    }
  })

  if (currentTrip !== null) {
    return (
      <Stack>
        <TripName />
        <TripAddCity />
        <p>Select a city to add...</p>
          <Stack className="small-button" direction="horizontal">
            <TripAddTransportation />
            <TripAddAccommodation />
            <TripAddActivity />
          </Stack>
        <TripData />
        <TripSummary />
        <TripButtons />
      </Stack>
    )
  } else {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }
}

export default Trip