import { useState } from 'react'
import { StyleSheet, Switch, Text, View, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Settings() {
  const systemColorScheme = useColorScheme() // 'light' or 'dark'
  const [darkMode, setDarkMode] = useState(systemColorScheme === 'dark')

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const styles = getStyles(darkMode)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
        />
      </View>
    </SafeAreaView>
  )
}

const getStyles = (dark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: dark ? '#111827' : '#cbd5e1',
    },
    header: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 20,
      color: dark ? '#fff' : '#000',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },
    label: {
      fontSize: 18,
      color: dark ? '#fff' : '#000',
    },
  })
