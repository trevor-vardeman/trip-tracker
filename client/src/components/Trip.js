import Stack from 'react-bootstrap/Stack'

function Trip({ currentTrip }) {
  console.log(currentTrip, "currentTrip")
  return (
    <Stack gap={3}>
      {currentTrip !== null ? <p>{currentTrip.cities[0].city}, {currentTrip.cities[0].country}</p> : null}
    </Stack>
  )
}

export default Trip