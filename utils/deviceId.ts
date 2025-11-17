import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

export const getOrCreateDeviceId = async (): Promise<string> => {
  try {
    // Check if deviceId already exists
    let deviceId: string | null = await AsyncStorage.getItem('deviceId')

    if (!deviceId) {
      // Generate new UUID
      deviceId = uuidv4()
      // Save it locally
      await AsyncStorage.setItem('deviceId', deviceId)
    } else {
      console.log('Using existing deviceId:', deviceId)
    }

    return deviceId
  } catch (error: unknown) {
    console.error('Error generating or storing deviceId:', error)
    throw error
  }
}
