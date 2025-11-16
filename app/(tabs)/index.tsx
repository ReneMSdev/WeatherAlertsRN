import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const cities = ['London', 'Tokyo', 'New York'] // placeholder list

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Weather</Text>

      <TextInput
        style={styles.search}
        placeholder='Search city'
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
          <Text>No active alerts</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollContent: {},
  container: { flex: 1, padding: 20 },
  header: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 20, fontWeight: '600', marginVertical: 10 },
  cityCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  cityName: { fontSize: 18 },
  stormBox: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    marginTop: 10,
  },
})
