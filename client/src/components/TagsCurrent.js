import { useUserUpdate } from '../context/UserContext'
import { useTripContext } from '../context/CurrentTripContext'
import Stack from 'react-bootstrap/Stack'
import Spinner from 'react-bootstrap/Spinner'

function TagsCurrent() {
  const userUpdate = useUserUpdate()
  const { currentTrip, setCurrentTrip } = useTripContext()

  const handleDelete = tagId => {
    const tripTagId = currentTrip.trip_tags.filter(tag => tag.tag_id === tagId)[0].id
    fetch(`/trip_tags/${tripTagId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .catch(e => alert(e))
    .then(r => r.json())
    .then(updatedUser => {
      userUpdate(updatedUser)
      const updatedTrip = updatedUser.trips.filter(trip => trip.id === currentTrip.id)[0]
      setCurrentTrip(updatedTrip)
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
      <Stack className="centered">
        <h6 className="bold">{currentTrip.name} Tags</h6>
        {currentTrip.tags.map(tag => (
          <Stack className="centered" direction="horizontal">
            <p className="p">{tag.name}</p>
            <img className="hover" src="/assets/x.svg" alt="bootstrapXIcon" width="20" height="20" onClick={() => handleDelete(tag.id)}/>
          </Stack>
        ))}
      </Stack>
    )
  }
}

export default TagsCurrent