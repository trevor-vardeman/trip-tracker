import { useTripContext } from '../context/CurrentTripContext'
import Stack from 'react-bootstrap/Stack'
import TagsCurrent from './TagsCurrent'
import TagSearch from './TagSearch'
import Spinner from 'react-bootstrap/Spinner'

function TagContainer() {
  const { currentTrip } = useTripContext()

  if (!currentTrip) {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  } else {
  return (
      <Stack className="centered tags">
        <h5>Tags</h5>
        <Stack className="tag-data">
          {!currentTrip.plan ? <TagSearch /> : null}
          <TagsCurrent />
        </Stack>
      </Stack>
    )
  }
}

export default TagContainer