import { useState } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet, Alert, Image, ImageBackground } from "react-native";
import { supabase } from "../lib/supabase";
import { Ionicons } from "@expo/vector-icons";

export default function Settings({ navigation }: any) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigation.replace("Login"); // Redirect to Login after sign-out
    } catch (error) {
      Alert.alert("Error", "Failed to sign out. Please try again.");
    }
  };

  return (
    <ImageBackground source={require("../assets/background.jpg")} style={styles.background}>
      
      {/* Fixed Header (Inside ImageBackground) */}
      <View style={styles.header}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.headerTitle}>SETTINGS</Text>
      </View>

      {/* Main Content with a Content Box */}
      <View style={styles.container}>
        <View style={styles.settingsBox}>
          {/* Dark Mode Toggle */}
          <View style={styles.settingRow}>
            <Ionicons name="moon-outline" size={24} color="black" />
            <Text style={styles.settingText}>Dark Mode</Text>
            <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
          </View>

          {/* Profile Settings */}
          <TouchableOpacity style={styles.settingRow} onPress={() => navigation.navigate("Profile")}>
            <Ionicons name="person-outline" size={24} color="black" />
            <Text style={styles.settingText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </TouchableOpacity>

          {/* Sign Out */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ImageBackground>
  );
}

// 🔹 Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  header: {
    backgroundColor: "#FFFFFF", // Dark blue header with transparency
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    flex: 1,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    marginTop: 100, // Push content below fixed header
  },
  settingsBox: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white
    padding: 20,
    borderRadius: 15,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Adds shadow on Android
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "red",
    alignItems: "center",
    borderRadius: 5,
    width: "100%",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
  },
});
