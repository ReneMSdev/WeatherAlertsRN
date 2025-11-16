// app/hooks/useTheme.tsx
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { Appearance } from 'react-native'

interface ThemeColors {
  background: string
  text: string
}

interface ThemeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
  colors: ThemeColors
}

const lightColors: ThemeColors = {
  background: '#64748b',
  text: '#000000',
}

const darkColors: ThemeColors = {
  background: '#111827',
  text: '#ffffff',
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const colorMode = Appearance.getColorScheme()
    return colorMode === 'dark'
  })

  useEffect(() => {
    AsyncStorage.getItem('darkMode').then((value) => {
      if (value !== null) setIsDarkMode(JSON.parse(value))
    })
  }, [])

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    await AsyncStorage.setItem('darkMode', JSON.stringify(newMode))
  }

  const colors = isDarkMode ? darkColors : lightColors

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}
