import CityList from '@/components/CityList'
import Overlay from '@/components/Overlay'
import SearchBar from '@/components/SearchBar'
import { ColorScheme, useTheme } from '@/hooks/useTheme'
import { useRef, useState } from 'react'
import { Animated, ScrollView, StyleSheet, Text } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Home() {
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

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          padding: 20,
          transform: [{ translateY }],
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Animated.View style={{ opacity: isFocused ? 0 : 1 }}>
          <Text style={styles.header}>Weather</Text>
        </Animated.View>
        {/* Search Bar */}
        <SearchBar
          handleFocus={handleFocus}
          handleOverlayPress={handleOverlayPress}
          search={search}
          setSearch={setSearch}
        />
      </Animated.View>

      {/* Scollable Content */}
      <ScrollView style={styles.scrollContent}>
        {/* City List */}
        <CityList />
        {/* Storm Watch */}
        {/* <StormWatch /> */}
      </ScrollView>

      {/* Overlay */}
      <Overlay
        isFocused={isFocused}
        handleOverlayPress={handleOverlayPress}
        overlayOpacity={overlayOpacity}
        translateY={translateY}
      />
    </SafeAreaView>
  )
}

const getStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    scrollContent: { paddingHorizontal: 20 },
    header: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, color: colors.text },
  })
