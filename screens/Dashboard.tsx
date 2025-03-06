import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native'
import { supabase } from '../lib/supabase'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../lib/types'

export default function Dashboard() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <ImageBackground
      source={require('../assets/background.jpg')} // Replace with your background image path
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Dashboard</Text>
        <View style={styles.buttonContainer}>
          <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Sign Out" color="#D32F2F" onPress={handleSignOut} />
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 10,
  },
})