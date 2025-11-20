// app/city/[name].js
import { ColorScheme, useTheme } from '@/hooks/useTheme'
import axios from 'axios'

import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface WeatherResponse {
  city: string
  state: string
  current: {
    temp: number
    high: number
    low: number
    precipitation: number
    windSpeed: string
    windDirection: string
    icon: string
    shortDescription: string
    detailedDescription: string
  }
  forecast: {
    day: string
    high: number
    low: number
    icon: string
    description: string
  }[]
  updatedAt: string
}

export default function CityDetail() {
  const { name, state } = useLocalSearchParams()
  const cityId = encodeURIComponent(`${name}, ${state}`)
  const router = useRouter()
  const { colors } = useTheme()
  const styles = getStyles(colors)

  const [weather, setWeather] = useState<WeatherResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const FETCH_WEATHER_URL = process.env.EXPO_PUBLIC_FETCH_WEATHER_URL

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`${FETCH_WEATHER_URL}/${cityId}`)
        setWeather(response.data)
      } catch (error: any) {
        setError(error.message || 'Failed to fetch weather data.')
        console.error('Error fetching weather:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchWeather()
  }, [FETCH_WEATHER_URL, cityId])

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>

      <Text style={styles.title}>{name}</Text>

      {loading && (
        <ActivityIndicator
          size='large'
          color={colors.primary}
        />
      )}

      {error && <Text style={styles.label}>{error}</Text>}

      {weather && (
        <View style={styles.box}>
          <Text style={styles.label}>
            {weather.current.icon} {weather.current.shortDescription}
          </Text>
          <Text style={styles.sub}>Temp: {weather.current.temp}°</Text>
          <Text style={styles.sub}>
            High: {weather.current.high}° — Low: {weather.current.low}°
          </Text>
          <Text style={styles.sub}>
            Wind: {weather.current.windSpeed} {weather.current.windDirection}
          </Text>
          <Text style={styles.sub}>Precip: {weather.current.precipitation}%</Text>
        </View>
      )}

      {weather && (
        <View style={styles.box}>
          <Text style={styles.label}>Forecast</Text>

          {weather.forecast.map((f: any) => (
            <View
              key={f.day}
              style={{ marginBottom: 8 }}
            >
              <Text style={styles.sub}>
                {f.icon} {f.day}: {f.description} ({f.high}° / {f.low}°)
              </Text>
            </View>
          ))}
        </View>
      )}

      {weather && (
        <View style={styles.box}>
          <Text style={styles.label}>Updated: {new Date(weather.updatedAt).toLocaleString()}</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    backButton: {
      marginBottom: 20,
    },
    backButtonText: {
      fontSize: 18,
      color: colors.text,
    },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.bg,
      color: colors.text,
    },
    title: {
      color: colors.text,
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 30,
    },
    box: {
      padding: 20,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      marginBottom: 20,
    },
    label: {
      color: colors.text,
      fontSize: 18,
      marginBottom: 6,
    },
    sub: {
      color: colors.textMuted,
    },
  })
