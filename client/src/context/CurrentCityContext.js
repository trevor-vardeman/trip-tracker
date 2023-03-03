import React, { useContext, useState } from 'react'

const CurrentCityContext = React.createContext()

export function useCityContext() {
  return useContext(CurrentCityContext)
}

export function CityProvider({ children }){
  const [currentCity, setCurrentCity] = useState(null)
  
  return (
    <CurrentCityContext.Provider value={{ currentCity, setCurrentCity }}>
      {children}
    </CurrentCityContext.Provider>
  )
}