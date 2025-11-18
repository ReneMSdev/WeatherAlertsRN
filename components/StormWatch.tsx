import { StyleSheet, Text, View } from 'react-native'
import { ColorScheme, useTheme } from '../hooks/useTheme'

export default function StormWatch(): React.JSX.Element {
  const { colors } = useTheme()
  const styles = getStyles(colors)
  return (
    <>
      <Text style={[styles.header, styles.header]}>Storm Watch</Text>
      <View style={styles.stormBox}>
        <Text style={styles.stormText}>No active alerts</Text>
      </View>
    </>
  )
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    header: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors.text,
      marginTop: 30,
    },
    stormBox: {
      padding: 20,
      backgroundColor: colors.text + '10',
      borderRadius: 12,
      marginTop: 10,
    },
    stormText: { color: colors.text },
  })
