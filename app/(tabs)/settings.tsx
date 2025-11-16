import { useTheme } from '@/hooks/useTheme'
import { StyleSheet, Switch, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Settings() {
  const { isDarkMode, toggleDarkMode, colors } = useTheme()

  const styles = getStyles(colors)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
        />
      </View>
    </SafeAreaView>
  )
}

const getStyles = (colors: { background: string; text: string }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
    },
    header: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors.text,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },
    label: {
      fontSize: 18,
      color: colors.text,
    },
  })
