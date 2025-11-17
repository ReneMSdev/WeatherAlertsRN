import { ColorScheme, useTheme } from '@/hooks/useTheme'
import { getOrCreateDeviceId } from '@/utils/deviceId'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { colors } = useTheme()
  const styles = getStyles(colors)

  // Optional: placeholder for background tasks
  useEffect(() => {
    // Background tasks can be added here if needed
  }, [])

  const handleContinueAsGuest = async (): Promise<void> => {
    try {
      setIsLoading(true) // show spinner
      const deviceId: string = await getOrCreateDeviceId()
      console.log('Device ID:', deviceId)
      router.replace('/(tabs)/home')
    } catch (error) {
      console.error('Error setting up deviceId:', error)
      Alert.alert('Error', 'Failed to continue as guest. Please try again.')
    } finally {
      setIsLoading(false) // hide spinner
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>⛈️</Text>

      {/* Optional tagline */}
      <Text style={styles.header}>Weather Alerts</Text>

      {isLoading ? (
        <ActivityIndicator
          size='large'
          color={colors.primary}
        />
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={handleContinueAsGuest}
        >
          <Text style={styles.buttonText}>Continue as Guest</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg, // adjust as needed

      alignItems: 'center',
      paddingTop: 180,
    },
    logo: {
      fontSize: 120,
      marginBottom: 20,
    },
    header: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 40,
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 10,
    },
    buttonText: {
      color: colors.surface,
      fontSize: 16,
      fontWeight: '600',
    },
  })
