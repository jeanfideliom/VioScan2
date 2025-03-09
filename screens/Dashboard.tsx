import { View, Text, Button, StyleSheet, ImageBackground, Alert, Linking } from "react-native";
import { supabase } from "../lib/supabase";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../lib/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Dashboard() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSignOut = async () => {
  try {
    // Sign out from Supabase and clear AsyncStorage concurrently
    await Promise.all([
      supabase.auth.signOut(),
      AsyncStorage.clear(),
      // Linking.openURL("https://accounts.google.com/Logout") -- Uncomment to sign out of Google pero nag oopen ng new tab
    ]);

    // Reset navigation to Login screen
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });

    console.log("User fully signed out and session cleared!");
  } catch (error) {
    console.error("Error signing out:", error);
    Alert.alert("Sign Out Error", "There was an issue signing out. Please try again.");
  }
};
  
  

  return (
    <ImageBackground source={require("../assets/background.jpg")} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Dashboard</Text>
        <View style={styles.buttonContainer}>
          <Button title="Go to Profile" onPress={() => navigation.navigate("Profile")} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Sign Out" color="#D32F2F" onPress={handleSignOut} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 10,
  },
});