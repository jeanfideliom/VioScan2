import { View, Text, Button, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
  
      // Ensure navigation goes back to login
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Dashboard</Text>
      <View style={styles.buttonContainer}>
        <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sign Out" onPress={handleLogout} color="#D32F2F" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 10, // Adds spacing between buttons
  },
});
