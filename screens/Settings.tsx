import { useState } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet, Alert } from "react-native";
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
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

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
  );
}

// 🔹 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
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
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
  },
});
