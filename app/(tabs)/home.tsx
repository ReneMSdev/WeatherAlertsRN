import { ColorScheme, useTheme } from '@/hooks/useTheme'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const { colors } = useTheme()

  const cities = ['London', 'Tokyo', 'New York'] // placeholder list
  const emptyCities = []

  const styles = getStyles(colors)

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Weather</Text>

        <TextInput
          style={styles.search}
          placeholder='Search for a city in the US...'
          placeholderTextColor={colors.textMuted + '80'}
          value={search}
          onChangeText={setSearch}
        />
        <ScrollView style={styles.scrollContent}>
          {cities.map((item) => (
            <Pressable
              key={item}
              style={styles.cityCard}
              onPress={() => router.push(`/city/${item}`)}
            >
              <Text style={styles.cityName}>{item}</Text>
            </Pressable>
          ))}

          <Text style={[styles.header, styles.headerStorm]}>Storm Watch</Text>
          <View style={styles.stormBox}>
            <Text style={styles.stormText}>No active alerts</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    scrollContent: { flex: 1 },
    container: { flex: 1, padding: 20, backgroundColor: colors.bg },
    header: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, color: colors.text },
    search: {
      borderWidth: 1,
      borderColor: colors.text + '40',
      backgroundColor: colors.bg,
      color: colors.text,
      padding: 12,
      borderRadius: 10,
      marginBottom: 30,
    },
    sectionTitle: { fontSize: 20, fontWeight: '600', marginVertical: 10, color: colors.text },
    cityCard: {
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.text + '30',
      backgroundColor: colors.bg,
      marginBottom: 10,
    },
    cityName: { fontSize: 18, color: colors.text },
    headerStorm: {
      marginTop: 30,
    },
    stormBox: {
      padding: 20,
      backgroundColor: colors.text + '10',
      borderRadius: 12,
      marginTop: 10,
    },
    stormText: {
      color: colors.text,
    },
  })
