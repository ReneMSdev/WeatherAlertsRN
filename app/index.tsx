import { useRouter } from 'expo-router'
import { useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

export default function Home() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const cities = ['London', 'Tokyo', 'New York'] // placeholder list

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weather</Text>

      <TextInput
        style={styles.search}
        placeholder='Search city'
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.sectionTitle}>Locations</Text>

      <FlatList
        data={cities}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable
            style={styles.cityCard}
            onPress={() => router.push(`/city/${item}`)}
          >
            <Text style={styles.cityName}>{item}</Text>
          </Pressable>
        )}
      />

      <Text style={styles.sectionTitle}>Storm Watch</Text>
      <View style={styles.stormBox}>
        <Text>No active alerts</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
