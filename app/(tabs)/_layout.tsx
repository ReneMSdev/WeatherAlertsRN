import { Tabs } from 'expo-router'

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: () => null, // add icons later if you want
        }}
      />

      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: () => null,
        }}
      />
    </Tabs>
  )
}
