import CityListItem from './CityListItem'

// Test Values
// ------------------------
const cities = [
  {
    cityName: 'New York, NY',
    city: 'New York',
    currentTemp: 60,
    time: '10:00 AM',
    description: 'Sunny',
    high: 65,
    low: 55,
  },
  {
    cityName: 'London, UK',
    city: 'London',
    currentTemp: 55,
    time: '11:00 AM',
    description: 'Cloudy',
    high: 60,
    low: 50,
  },
  {
    cityName: 'Tokyo, JP',
    city: 'Tokyo',
    currentTemp: 62,
    time: '12:00 PM',
    description: 'Rainy',
    high: 68,
    low: 58,
  },
]
// ------------------------

export default function CityList() {
  return (
    <>
      {cities.map((city) => (
        <CityListItem
          key={city.cityName}
          city={city.city}
          currentTemp={city.currentTemp}
          time={city.time}
          description={city.description}
          high={city.high}
          low={city.low}
        />
      ))}
    </>
  )
}
