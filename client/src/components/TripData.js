import { useState } from 'react'
import { useTripContext } from './CurrentTripContext'
import { ArcherContainer, ArcherElement } from "react-archer"
import Stack from 'react-bootstrap/Stack'

function TripData({ handleCitySelection }) {
  const { currentTrip, setCurrentTrip } = useTripContext()
  const [selectedCityStyle, setSelectedCityStyle] = useState("")
  const citySelection = (city) => {
    console.log("city", city)
    setSelectedCityStyle(city.id)
    console.log(selectedCityStyle, "selectedCityStyle")
    handleCitySelection(city)
  }

  return (
    <Stack className="trip-data">
      {currentTrip.cities.map((city, index) => (
        <p 
          key={city.id} 
          className={`${city.id === selectedCityStyle ? "selected-city" : "null"}`}
          onClick={() => citySelection(city)}
        >{city.city}, {city.country}</p>
      ))}
        <p>Trip Complete</p>
    </Stack>
  )

  // return (
  //   <Stack>
  //     <ArcherContainer className="trip-data">
  //       {currentTrip.cities.map((city, index) => (
  //         <ArcherElement 
  //           key={city.id}
  //           element={index.toString()}
  //           // element="1"
  //           relations={[
  //             {
  //               targetId: (index + 1).toString(),
  //               // targetId: "tripComplete",
  //               targetAnchor: 'top',
  //               sourceAnchor: 'bottom',
  //               style: { strokeColor: 'black', strokeWidth: 1 }
  //             },
  //           ]}
  //         >
  //           <p 
  //             key={city.id} 
  //             className={`${city.id === selectedCityStyle ? "selected-city" : "null"}`}
  //             onClick={() => citySelection(city)}
  //           >{city.city}, {city.country}, {index.toString()}, {typeof index.toString()}</p>
  //         </ArcherElement>
  //       ))}
  //       <ArcherElement id="tripComplete" style={{display: "flex", alignItems: "end", bottom: "0px"}}>
  //         <p>Trip Complete</p>
  //       </ArcherElement>
  //     </ArcherContainer>
  //   </Stack>
  // )
}

export default TripData