import { useHistory } from "react-router-dom"
import { useTripContext } from './CurrentTripContext'
import { useUserContext, useUserUpdate } from './UserContext'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

function TripButtons() {
  const {
    currentTrip, 
    setCurrentTrip
  } = useTripContext()
  const history = useHistory()
  const userUpdate = useUserUpdate()

  const handleDelete = () => {
    fetch(`/trips/${currentTrip.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .catch(e => alert(e))
    .then(r => r.json())
    .then(user => {
      userUpdate(user)
      history.push("/")
    })
    .catch(e => alert(e))
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <Button variant="danger" onClick={handleDelete}>Delete</Button>
      <Button variant="dark">Finalize</Button>
    </Stack>
  )
}

export default TripButtons