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
    if (currentTrip) {
      fetch("/tags", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })
      .then(r => r.json())
      .then(tags => {
        setUnformattedTags(tags)
        let tagsToBeRemoved = []
        const getTagIdsToRemove = () => tags.map(tag => {
          let newTags = currentTrip.tags.filter(currentTag => currentTag.id === tag.id)
          tagsToBeRemoved.push(newTags.map(tag => tag.id))
          return newTags
        })
        getTagIdsToRemove()
        const updatedTags = tags.filter(({ id }) => !tagsToBeRemoved.flat().includes(id))
        const tagFormat = updatedTags.map(tag => {
          let newTag = {
            label: tag.name, value: tag.name
          }
          return newTag
        })
        setFormattedTags(tagFormat)
      })
      .catch(e => alert(e))
    } else return
  },[currentTrip])

  const handleSubmit = e => {
    e.preventDefault()
    if (!tripTags) {
        alert("Please select or create some tags before submitting.")
    } else if (tripTags.filter(tag => tag.label.length < 2 || tag.label.length > 20).length > 0) {
        alert("All tags must be between 2 and 20 characters. Please try again.")
    } else {
      const new_tags = tripTags.filter(tag => tag.__isNew__ === true).map(tag => {
        let tagObj = {
          name: tag.label.toLowerCase(),
          trip_id: currentTrip.id
        }
        return tagObj
      })
  
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
    }
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