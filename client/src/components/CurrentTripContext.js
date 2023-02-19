import React, { useContext, useState } from 'react'

const CurrentTripContext = React.createContext()

export function useTripContext() {
  return useContext(CurrentTripContext)
}

export function TripProvider({ children }){
  const [currentTrip, setCurrentTrip] = useState(null)
  return (
    <CurrentTripContext.Provider value={{ currentTrip, setCurrentTrip }}>
      {children}
    </CurrentTripContext.Provider>
  )
}