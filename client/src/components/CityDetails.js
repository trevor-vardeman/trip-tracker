import { useCityContext } from '../context/CurrentCityContext'
import Stack from 'react-bootstrap/Stack'

function CityDetails() {
  const { currentCity } = useCityContext()
  console.log(currentCity)

  if (currentCity) {
    return (
      <Stack className="city-details">
        <p className="trip-start-end">City Details</p>
        {currentCity.activities.map((activity) => (
          <p key={activity.id}>{activity.description}</p>
        ))}
      </Stack>
    )
  } else return null
}

export default CityDetails