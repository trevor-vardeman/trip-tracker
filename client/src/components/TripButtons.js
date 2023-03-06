import { useHistory } from "react-router-dom"
import { useUserUpdate } from '../context/UserContext'
import { useTripContext } from '../context/CurrentTripContext'
import { useCityContext } from '../context/CurrentCityContext'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

function TripButtons() {
  const { currentTrip, setCurrentTrip } = useTripContext()
  const { setCurrentCity } = useCityContext()
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
      setCurrentTrip(null)
      setCurrentCity(null)
      userUpdate(user)
      history.push("/")
    })
    .catch(e => alert(e))
  }

  const handleFinalize = e => {
    fetch(`/trips/${currentTrip.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({plan: true})
    })
    .then(r => r.json())
    .then(user => {
      userUpdate(user)
      alert("Trip finalized!")
      history.push("/plans")
    })
    .catch(e => alert(e))
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <Button size="sm" variant="danger" onClick={handleDelete}>Delete</Button>
      <Button size="sm" variant="dark" type="submit" onClick={handleFinalize}>Finalize</Button>
    </Stack>
  )
}

export default TripButtons