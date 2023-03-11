import Stack from 'react-bootstrap/Stack'
import TagsCurrent from './TagsCurrent'
import TagSearch from './TagSearch'

function Tags() {
  return (
    <Stack className="centered tags">
      <h3>Tags</h3>
      <Stack className="tag-data">
        <TagSearch />
        <TagsCurrent />
      </Stack>
    </Stack>
  )
}

export default Tags