import { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable'
import makeAnimated from 'react-select/animated'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Spinner from 'react-bootstrap/Spinner'

function TagSearch() {
  const animatedComponents = makeAnimated()
  const [allTags, setAllTags] = useState(null)
  const [tripTags, setTripTags] = useState(null)
  const handleSubmit = e => {
    e.preventDefault()
    console.log(e)
    setTripTags(null)
  }

  useEffect(() => {
    fetch("/tags", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    .then(r => r.json())
    .then(tags => {
      const tagFormat = tags.map(tag => {
        let newTag = {
          label: tag.name, value: tag.name
        }
        return newTag
      })
      setAllTags(tagFormat)
    })
    .catch(e => alert(e))
  },[])

  if (!allTags) {
    return (
      <Spinner className="definite-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }
  return (
    <Stack>
      <p>Search and select tags for your trip!</p>
      <CreatableSelect
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={allTags}
        onChange={e => setTripTags(e)}
        value={tripTags}
      />
      <Button type="submit" size="sm" variant="primary" onClick={e => handleSubmit(e)}>Submit</Button>
    </Stack>
  )
}

export default TagSearch