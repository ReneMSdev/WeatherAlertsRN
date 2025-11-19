import { useRouter } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ColorScheme, useTheme } from '../hooks/useTheme'

type Props = {
  city: string
  currentTemp: number | string
  time?: string
  description?: string
  high?: number | string
  low?: number | string
}

export default function CityListItem({
  city,
  currentTemp,
  time,
  description,
  high,
  low,
}: Props): React.JSX.Element {
  const { colors } = useTheme()
  const styles = getStyles(colors)
  const router = useRouter()
  const DEG = '\u00B0'

  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push(`/city/${city}`)}
    >
      <View style={styles.left}>
        <Text style={styles.cityName}>{city}</Text>
        {time ? <Text style={styles.time}>{time}</Text> : null}
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      <View style={styles.right}>
        <Text style={styles.currentTemp}>
          {currentTemp}
          {DEG}F
        </Text>

        <Text style={styles.highLow}>
          {typeof high !== 'undefined' && typeof low !== 'undefined'
            ? `${high}${DEG}F  ${low}${DEG}F`
            : null}
        </Text>
      </View>
    </Pressable>
  )
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginVertical: 6,
      backgroundColor: colors.bg, // keep same bg by default, or change for card
      borderWidth: 2,
      borderColor: colors.border,
      // subtle shadow for Android/iOS
      elevation: 1,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 2,
    },

    left: {
      flex: 1,
      paddingRight: 12,
    },

    cityName: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 2,
    },

    time: {
      fontSize: 12,
      color: colors.textMuted,
      marginBottom: 6,
    },

    description: {
      fontSize: 13,
      color: colors.textMuted,
    },

    right: {
      alignItems: 'flex-end',
      minWidth: 86,
    },

    currentTemp: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
    },

    highLow: {
      fontSize: 12,
      color: colors.textMuted,
      marginTop: 6,
    },
  })
