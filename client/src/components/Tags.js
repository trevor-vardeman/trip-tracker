import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import { useTripContext } from '../context/CurrentTripContext'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'

function Tags() {
  const history = useHistory()
  const user = useUserContext()
  const { setCurrentTrip } = useTripContext()
  const [myTags, setMyTags] = useState(true)
  const handleOpenTrip = tag => {
    console.log(tag)
    setCurrentTrip(user.trips.find(trip => trip.id === tag.trip))
    history.push(`/trips/${tag.trip}`)
  }

  const myTripTags = () => {
    if (user === null) {
      return 
    } else  {
      const tags = []
      user.trips.map(trip => trip.trip_tags.map(tag => tags.push({ name: tag.name, trip: tag.trip_id, tripName: tag.trip_name })))
      tags.sort((a, b) => a.name.localeCompare(b.name))
      console.log(tags)
      return tags
    }
  }

  if (user === null || undefined) {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  } else {
    return (
      <Stack className="centered" gap={3}>
        <h3>Tags</h3>
        <Stack className="centered" direction="horizontal">
          <Button size="sm" variant={!myTags ? "primary" : "secondary"} onClick={() => setMyTags(!myTags)}>My Tags</Button>
          <Button size="sm" variant={myTags ? "primary" : "secondary"} onClick={() => setMyTags(!myTags)}>Explore Tags</Button>
        </Stack>
        <Table className="centered" size="sm" striped bordered hover>
          <thead>
            <tr>
              <th>Tag Name</th>
              <th>Trip Name</th>
              <th>View Trip</th>
            </tr>
          </thead>
          <tbody>
            {!myTags 
              ? myTripTags().map(tag => (
                  <tr className="centered" key={tag.id}>
                    <td>{tag.name}</td>
                    <td>{tag.tripName}</td>
                    <td><img className="hover" src="/assets/arrow-up-right-circle.svg" alt="bootstrapOpenIcon" width="20" height="20" onClick={() => handleOpenTrip(tag)}/></td>
                  </tr>
                ))
              : myTripTags().map(tag => (
                  <tr className="centered" key={tag.id}>
                    <td>{tag.name}</td>
                    <td>{tag.tripName}</td>
                    <td><img className="hover" src="/assets/arrow-up-right-circle.svg" alt="bootstrapOpenIcon" width="20" height="20" onClick={() => handleOpenTrip(tag)}/></td>
                  </tr>
                ))
            }
          </tbody>
        </Table>
      </Stack>
    )
  }
}

export default Tags