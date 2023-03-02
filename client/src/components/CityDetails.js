import Stack from 'react-bootstrap/Stack'

function CityDetails({ selectedCity }) {
  console.log("selectedCity", selectedCity)

  if (selectedCity) {
    return (
      <Stack className="city-details">
        {selectedCity.activities.map((activity) => (
          <p>{activity.description}</p>
        ))}
        <p>test</p>
      </Stack>
    )
  } else return null
}

export default CityDetails