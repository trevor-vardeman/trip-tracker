import React, { useContext, useState, useEffect } from 'react'
import { useTripContext } from './CurrentTripContext'

const TagContext = React.createContext()

export function useTagContext() {
  return useContext(TagContext)
}

export function TagProvider({ children }){
  const { currentTrip } = useTripContext()
  const [unformattedTags, setUnformattedTags] = useState(null)
  const [formattedTags, setFormattedTags] = useState(null)

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
  
  return (
    <TagContext.Provider value={{ unformattedTags, setUnformattedTags, formattedTags, setFormattedTags }}>
      {children}
    </TagContext.Provider>
  )
}