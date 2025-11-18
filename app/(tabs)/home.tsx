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
  const overlayOpacity = useRef(new Animated.Value(0)).current

  const handleFocus = () => {
    setIsFocused(true)
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -insets.top,
        duration: 200,
        useNativeDriver: true,
      }),

      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const handleOverlayPress = () => {
    setIsFocused(false)
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const cities = ['London', 'Tokyo', 'New York'] // placeholder list

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          flex: 1,
          padding: 20,
          transform: [{ translateY }],
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Animated.View style={{ opacity: isFocused ? 0 : 1 }}>
          <Text style={styles.header}>Weather</Text>
        </Animated.View>
        {/* Search Box */}
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
            onBlur={handleOverlayPress}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </Animated.View>
      {/* City List */}
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

      {/* Overlay */}
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
          handleOverlayPress()
        }}
      >
        <Animated.View
          pointerEvents={isFocused ? 'auto' : 'none'}
          style={[
            styles.overlay,

            {
              opacity: overlayOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1], // full opacity when focused
              }),
              transform: [{ translateY }],
            },
          ]}
        />
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.bg,
      zIndex: 5,
      elevation: 5,
    },

    scrollContent: { paddingHorizontal: 20 },
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
      elevation: 10,
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
