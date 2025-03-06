import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  CheckBox,
} from "react-native";
import { User } from "@supabase/supabase-js";

export default function Login({ navigation }: any) {
  const [isChecked, setIsChecked] = useState(false);

  const handleGoogleSignIn = async () => {
    if (!isChecked) {
      console.log("User agreement not checked");
      Alert.alert("User Agreement", "You must agree to the terms and conditions to continue.");
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
    } catch (error) {
      console.error("Authentication Error:", error);
      Alert.alert("Login Failed", "Unable to sign in with Google.");
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          console.log("Auth state changed:", session.user);
          try {
            await saveUserToDatabase(session.user);
            navigation.replace("Dashboard");
          } catch (error) {
            console.error("Error during user save or navigation:", error);
            Alert.alert(
              "Error",
              "There was an issue logging in. Please try again."
            );
          }
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const saveUserToDatabase = async (user: User) => {
    try {
      console.log("Saving user to database:", user);
      const { error } = await supabase
        .from("user_info")
        .upsert(
          [
            {
              id: user.id,
              email: user.email,
              full_name:
                user.user_metadata?.full_name ||
                (user.email ? user.email.split("@")[0] : ""),
              avatar_url: user.user_metadata?.avatar_url || "",
              created_at: new Date().toISOString(),
            },
          ],
          { onConflict: "id" }
        );

      if (error) throw error;
      console.log("User successfully saved");
    } catch (error) {
      console.error("Error saving user:", error);
      Alert.alert(
        "Database Error",
        "There was an issue saving user data. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/headerPhoto.png")}
        style={styles.headerPhoto}
        resizeMode="cover"
      />
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.formContainer}>
        <Text style={styles.title}>VioScanner</Text>
        <Text style={styles.subtitle}>A Violation Detection App</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            onValueChange={setIsChecked}
            style={styles.checkbox}
          />
          <Text style={styles.label}>I agree to the terms and conditions</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
          <Text style={styles.buttonText}>Continue using Google Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 🔹 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerPhoto: {
    width: "100%",
    height: 345,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "absolute",
  },
  logo: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 300,
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 250,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    color: "#666",
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  button: {
    width: "80%",
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});