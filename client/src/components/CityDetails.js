import Stack from 'react-bootstrap/Stack'

function CityDetails({ selectedCity }) {
  console.log("selectedCity", selectedCity)

  if (selectedCity) {
    return (
      <Stack className="city-details">
        <p className="trip-start-end">City Details</p>
        {selectedCity.activities.map((activity) => (
          <p key={activity.id}>{activity.description}</p>
        ))}
      </Stack>
    )
  } else return null
}

export default CityDetails