import { useTheme } from '@/hooks/useTheme'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const { colors } = useTheme()

  const cities = ['London', 'Tokyo', 'New York'] // placeholder list

  const styles = getStyles(colors)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Weather</Text>

      <TextInput
        style={styles.search}
        placeholder='Search city'
        placeholderTextColor={colors.text + '80'}
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

        <Text style={styles.header}>Storm Watch</Text>
        <View style={styles.stormBox}>
          <Text style={styles.stormText}>No active alerts</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const getStyles = (colors: { background: string; text: string }) =>
  StyleSheet.create({
    scrollContent: {},
    container: { flex: 1, padding: 20, backgroundColor: colors.background },
    header: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, color: colors.text },
    search: {
      borderWidth: 1,
      borderColor: colors.text + '40',
      backgroundColor: colors.background,
      color: colors.text,
      padding: 12,
      borderRadius: 10,
      marginBottom: 20,
    },
    sectionTitle: { fontSize: 20, fontWeight: '600', marginVertical: 10, color: colors.text },
    cityCard: {
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.text + '30',
      backgroundColor: colors.background,
      marginBottom: 10,
    },
    cityName: { fontSize: 18, color: colors.text },
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
