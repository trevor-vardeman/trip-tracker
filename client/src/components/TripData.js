import { useTripContext } from './CurrentTripContext'
import { ArcherContainer, ArcherElement } from "react-archer"
import Stack from 'react-bootstrap/Stack'

function TripData() {
  const {
    currentTrip, 
    setCurrentTrip
  } = useTripContext()

  return (
    <Stack className="trip-data">
      <ArcherContainer className="trip">
        <ArcherElement
          id="element1"
          className="arrow"
          relations={[
            {
              targetId:"element2",
              targetAnchor: "top",
              sourceAnchor: "bottom",
              style: { strokeColor: 'black', strokeWidth: 1 }
            },
          ]}
        >
          <p>{currentTrip.cities[0].city}, {currentTrip.cities[0].country}</p> 
        </ArcherElement>

        <ArcherElement
            id="element2"
            className="arrow"
            relations={[
              {
                targetId: 'elementEnd',
                targetAnchor: 'top',
                sourceAnchor: 'bottom',
                style: { strokeColor: 'black', strokeWidth: 1 }
              },
            ]}
          >
          <p>City 2</p>
        </ArcherElement>

        <ArcherElement id="elementEnd" style={{display: "flex", alignItems: "end", bottom: "0px"}}>
          <p>Trip Complete</p>
        </ArcherElement>
      </ArcherContainer>
    </Stack>
  )
}

export default TripData