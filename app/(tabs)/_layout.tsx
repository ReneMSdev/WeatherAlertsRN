import { useTheme } from '@/hooks/useTheme'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function Layout() {
  const { colors } = useTheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          padding: 14,
        },
        tabBarStyle: {
          backgroundColor: colors.bg,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: () => (
            <Ionicons
              name='home-outline'
              size={28}
              color={colors.text}
            />
          ),
        }}
      />

      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: () => (
            <Ionicons
              name='settings-outline'
              size={28}
              color={colors.text}
            />
          ),
        }}
      />
    </Tabs>
  )
}
