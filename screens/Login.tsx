import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { View, Text, Button, Alert } from 'react-native'
import { User } from '@supabase/supabase-js'

export default function Login({ navigation }: any) {
  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      if (error) throw error
    } catch (error) {
      console.error("Authentication Error:", error)
    }
  }

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user = session.user
        console.log('Auth state changed:', user)
        
        try {
          await saveUserToDatabase(user)
          navigation.replace('Dashboard')
        } catch (error) {
          console.error('Error during user save or navigation:', error)
          Alert.alert('Error', 'There was an error during the login process. Please try again.')
        }
      }
    })
    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  const saveUserToDatabase = async (user: User) => {
    try {
      const { error } = await supabase
        .from('user_info')
        .upsert([
          {
            id: user.id, 
            email: user.email,
            full_name: user.user_metadata?.full_name || user.email.split('@')[0],
            avatar_url: user.user_metadata?.avatar_url || '',
            created_at: new Date().toISOString(),
          },
        ], { onConflict: ['id'] })
      
      if (error) throw error
      console.log('User successfully saved')
    } catch (error) {
      console.error('Error saving user:', error)
      Alert.alert('Database Error', 'There was an error saving the user to the database. Please try again.')
    }
  }

  return (
    <View>
      <Text>Login with Google</Text>
      <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
    </View>
  )
}
