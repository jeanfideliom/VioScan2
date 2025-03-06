import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { supabase } from './lib/supabase'
import { Session } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import Profile from './screens/Profile'
import { RootStackParamList } from './lib/types'

const Stack = createStackNavigator<RootStackParamList>()
export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setLoading(false)
    }

    fetchSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (!session) {
        AsyncStorage.removeItem('lastScreen') // Only clear last screen on logout
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const saveLastScreen = async (screenName: keyof RootStackParamList) => {
    try {
      await AsyncStorage.setItem('lastScreen', screenName)
    } catch (error) {
      console.error('Error saving last screen:', error)
    }
  }

  const restoreLastScreen = async () => {
    try {
      const lastScreen = await AsyncStorage.getItem('lastScreen')
      if (lastScreen && navigationRef.isReady()) {
        navigationRef.navigate(lastScreen as keyof RootStackParamList)
      }
    } catch (error) {
      console.error('Error restoring last screen:', error)
    }
  }

  useEffect(() => {
    if (session) restoreLastScreen()
  }, [session])

  if (loading) return null

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session && session.user ? (
          <>
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              listeners={{ focus: () => saveLastScreen('Dashboard') }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              listeners={{ focus: () => saveLastScreen('Profile') }}
            />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}