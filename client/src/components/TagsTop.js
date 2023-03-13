import { useTagContext } from '../context/TagContext'
import Stack from 'react-bootstrap/Stack'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'

function TagsTop() {
  const { unformattedTags } = useTagContext()

  if (unformattedTags === null) {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  } else {
    return (
      <Stack className="centered" gap={3}>
        <Table className="centered" size="sm" striped bordered hover>
          <thead>
            <tr>
              <th>Tag Name</th>
              <th># Trips Tagged</th>
            </tr>
          </thead>
          <tbody>
            {unformattedTags.sort((a, b) => b.trip_tags.length - a.trip_tags.length).slice(0,10).map(tag => (
              <tr className="centered" key={tag.id}>
                <td>{tag.name}</td>
                <td>{tag.trip_tags.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Stack>
    )
  }
}

export default TagsTop