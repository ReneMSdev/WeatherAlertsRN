import { ColorScheme, useTheme } from '@/hooks/useTheme'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import {
  Animated,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Home() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const { colors } = useTheme()
  const styles = getStyles(colors)
  const insets = useSafeAreaInsets()

  const translateY = useRef(new Animated.Value(0)).current

  const handleFocus = () => {
    setIsFocused(true)
    Animated.timing(translateY, {
      toValue: -insets.top,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  const handleBlur = () => {
    setIsFocused(false)
    Animated.timing(translateY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  const cities = ['London', 'Tokyo', 'New York'] // placeholder list

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        {/* Top area: header + search — stays clear */}
        <Animated.View style={{ flex: 1, padding: 20, transform: [{ translateY }] }}>
          <Animated.View style={{ opacity: isFocused ? 0 : 1 }}>
            <Text style={styles.header}>Weather</Text>
          </Animated.View>

          <View style={styles.search}>
            <Ionicons
              style={styles.icon}
              name='search'
              size={20}
              color={colors.textMuted}
            />
            <TextInput
              style={styles.searchInput}
              placeholder='Search for a city in the US...'
              placeholderTextColor={colors.textMuted + '80'}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={search}
              onChangeText={setSearch}
            />
          </View>
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
        </Animated.View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    scrollContent: { flex: 1 },
    header: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, color: colors.text },
    search: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
      borderWidth: 2,
      borderColor: colors.border + '80',
      backgroundColor: colors.bg,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 10,
      marginBottom: 30,
      zIndex: 10,
    },
    icon: { marginRight: 8 },
    searchInput: { flex: 1, height: 40, color: colors.text },
    cityCard: {
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.text + '30',
      backgroundColor: colors.bg,
      marginBottom: 10,
    },
    cityName: { fontSize: 18, color: colors.text },
    headerStorm: { marginTop: 30 },
    stormBox: {
      padding: 20,
      backgroundColor: colors.text + '10',
      borderRadius: 12,
      marginTop: 10,
    },
    stormText: { color: colors.text },
  })
