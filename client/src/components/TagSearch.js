import { useState, useEffect } from 'react'
import { useUserUpdate } from '../context/UserContext'
import { useTripContext } from '../context/CurrentTripContext'
import CreatableSelect from 'react-select/creatable'
import makeAnimated from 'react-select/animated'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Spinner from 'react-bootstrap/Spinner'

function TagSearch() {
  const userUpdate = useUserUpdate()
  const { currentTrip, setCurrentTrip } = useTripContext()
  const [unformattedTags, setUnformattedTags] = useState(null)
  const [formattedTags, setFormattedTags] = useState(null)
  const [tripTags, setTripTags] = useState(null)
  const animatedComponents = makeAnimated()

  useEffect(() => {
    fetch("/tags", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    .then(r => r.json())
    .then(tags => {
      setUnformattedTags(tags)
      const tagFormat = tags.map(tag => {
        let newTag = {
          label: tag.name, value: tag.name
        }
        return newTag
      })
      setFormattedTags(tagFormat)
    })
    .catch(e => alert(e))
  },[])

  const handleSubmit = e => {
    e.preventDefault()
    const new_tags = tripTags.filter(tag => tag.__isNew__ === true).map(tag => {
      let tagObj = {
        name: tag.label.toLowerCase(),
        trip_id: currentTrip.id
      }
      return tagObj
    })

    const existingTags = tripTags.filter(tag => Object.keys(tag).length < 3)
    const existing_trip_tags = existingTags.map(existingTag => {
      let tags = unformattedTags.filter(tag => tag.name === existingTag.label)
      let id =  tags.map(tag => tag.id)[0]
      let tagObj = {
        tag_id: id,
        trip_id: currentTrip.id
      }
      return tagObj
    })

    if (new_tags.length > 0) {
      fetch("/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ new_tags })
      })
      .then(r => {
        if (r.ok) {
          r.json().then(user => {
            setTripTags(null)
            userUpdate(user)
            const updatedTrip = user.trips.filter(trip => trip.id === currentTrip.id)[0]
            setCurrentTrip(updatedTrip)
          })
        } else {
          r.json().then(r => alert(r.error))
        }
      })
      .catch(e => alert(e))
    } else if (existing_trip_tags.length > 0) {
      fetch("/trip_tags", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ existing_trip_tags })
      })
      .then(r => {
        if (r.ok) {
          r.json().then(user => {
            setTripTags(null)
            userUpdate(user)
            const updatedTrip = user.trips.filter(trip => trip.id === currentTrip.id)[0]
            setCurrentTrip(updatedTrip)
          })
        } else {
          r.json().then(r => alert(r.error))
        }
      })
      .catch(e => alert(e))
    } else return
  }

  if (!formattedTags) {
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
        options={formattedTags}
        onChange={e => setTripTags(e)}
        value={tripTags}
      />
      <Button type="submit" size="sm" variant="primary" onClick={e => handleSubmit(e)}>Submit</Button>
    </Stack>
  )
}

export default TagSearch