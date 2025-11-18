import { ColorScheme, useTheme } from '@/hooks/useTheme'
import { router } from 'expo-router'
import { Pressable, StyleSheet, Text } from 'react-native'

const cities: string[] = ['London', 'Tokyo', 'New York'] // placeholder list

export default function CityList() {
  const { colors } = useTheme()
  const styles = getStyles(colors)

  return (
    <>
      {cities.map((item) => (
        <Pressable
          key={item}
          style={styles.cityCard}
          onPress={() => router.push(`/city/${item}`)}
        >
          <Text style={styles.cityName}>{item}</Text>
        </Pressable>
      ))}
    </>
  )
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    cityName: { fontSize: 18, color: colors.text },
    cityCard: {
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.bg,
      marginBottom: 10,
    },
  })
