import CityListItem from './CityListItem'

// Test Values
// ------------------------
const cities = [
  {
    cityName: 'New York, NY',
    city: 'New York',
    state: 'NY',
    currentTemp: 60,
    time: '10:00 AM',
    description: 'Sunny',
    high: 65,
    low: 55,
  },
  {
    cityName: 'Austin, TX',
    city: 'Austin',
    state: 'TX',
    currentTemp: 55,
    time: '11:00 AM',
    description: 'Cloudy',
    high: 60,
    low: 50,
  },
  {
    cityName: 'Columbia, MO',
    city: 'Columbia',
    state: 'MO',
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
          state={city.state}
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
