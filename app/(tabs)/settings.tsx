import { ColorScheme, useTheme } from '@/hooks/useTheme'
import { useRouter } from 'expo-router'
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Settings() {
  const { isDarkMode, toggleDarkMode, colors } = useTheme()
  const router = useRouter()
  const styles = getStyles(colors)

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          // Navigate to splash screen
          router.replace('/')
        },
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Settings</Text>

      {/* Dark Mode Switch */}
      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
        />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.bg,
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
    divider: {
      height: 4,
      backgroundColor: colors.border + '80',
      marginVertical: 30,
    },
    logoutButton: {
      paddingTop: 12,
      paddingBottom: 12,
      paddingRight: 20,
      alignSelf: 'flex-start',
    },
    logoutButtonText: {
      fontSize: 18,
      color: colors.danger,
    },
  })
