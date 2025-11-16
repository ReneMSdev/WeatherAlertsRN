// app/city/[name].js
import { useLocalSearchParams } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

export default function CityDetailPlaceholder() {
  const { name } = useLocalSearchParams()

  return (
    <View style={styles.container}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  box: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 6,
  },
  sub: {
    color: '#666',
  },
})
