// app/city/[name].js
import { ColorScheme, useTheme } from '@/hooks/useTheme'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function CityDetailPlaceholder() {
  const { name } = useLocalSearchParams()
  const router = useRouter()
  const { colors } = useTheme()
  const styles = getStyles(colors)

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>
      <Text style={styles.title}>{name}</Text>

      <View style={styles.box}>
        <Text style={styles.label}>Weather info will appear here.</Text>
        <Text style={styles.sub}>This is just a placeholder screen.</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>Forecast section placeholder</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>Storm Watch placeholder</Text>
      </View>
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
