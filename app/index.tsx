import { ColorScheme, useTheme } from '@/hooks/useTheme'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SplashScreen() {
  const router = useRouter()
  const { colors } = useTheme()
  const styles = getStyles(colors)

  // Optional: placeholder for background tasks
  useEffect(() => {
    // Example: generate device ID, request permissions
    // async function setup() { ... }
    // setup();
  }, [])

  const handleContinue = () => {
    router.push('/(tabs)') // navigate to home page
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>⛈️</Text>

      {/* Optional tagline */}
      <Text style={styles.header}>Weather Alerts</Text>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Continue as Guest</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg, // adjust as needed

      alignItems: 'center',
      paddingTop: 150,
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
