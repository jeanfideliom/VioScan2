import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import * as Network from "expo-network"; // Import for IP retrieval
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { User } from "@supabase/supabase-js";

export default function Login({ navigation }: any) {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    if (!isChecked) {
      Alert.alert("User Agreement", "You must agree to the terms and conditions to continue.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: { prompt: "select_account" }, // Forces Google to always ask for login
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Authentication Error:", error);
      Alert.alert("Login Failed", "Unable to sign in with Google.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          console.log("Auth state changed:", session.user);
          try {
            await saveUserToDatabase(session.user);
            await saveAgreementStatus(session.user);
            navigation.replace("Main"); // Navigate to the main tab-based screen
          } catch (error) {
            console.error("Error during user save or navigation:", error);
            Alert.alert(
              "Error",
              "There was an issue logging in. Please try again."
            );
          }
        }
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const saveUserToDatabase = async (user: User) => {
    try {
      console.log("Saving user to database:", user);
      const { data, error } = await supabase
        .from("profile")
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

      if (error) {
        console.error("Error saving user:", error);
        throw error;
      }

      console.log("User successfully saved:", data);
    } catch (error) {
      console.error("Error saving user:", error);
      Alert.alert(
        "Database Error",
        "There was an issue saving user data. Please try again."
      );
    }
  };

  const saveAgreementStatus = async (user: User) => {
    try {
      console.log("Saving agreement for user:", user);

      const ipAddress = await Network.getIpAddressAsync();
      const agreementVersion = "1.0";
      const agreementText = "I agree to the terms and conditions";

      console.log("Agreement data:", {
        user_id: user.id,
        agreement_text: agreementText,
        version: agreementVersion,
        ip_address: ipAddress || "Unknown",
        status: "active",
        created_at: new Date().toISOString(),
      });

      const { data, error } = await supabase.from("user_agreements").upsert(
        [
          {
            user_id: user.id,
            agreement_text: agreementText,
            version: agreementVersion,
            ip_address: ipAddress || "Unknown",
            status: "active",
            created_at: new Date().toISOString(),
          },
        ],
        { onConflict: "user_id" }
      );

      if (error) {
        console.error("Error saving agreement:", error);
        Alert.alert("Database Error", "Failed to save agreement.");
        return;
      }

      console.log("Agreement saved successfully:", data);
    } catch (error) {
      console.error("Error saving agreement:", error);
      Alert.alert("Database Error", "Failed to save agreement.");
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
            checked={isChecked}
            onPress={() => setIsChecked(!isChecked)}
            title="I agree to the terms and conditions"
          />
        </View>
        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continue using Google Sign In</Text>
          )}
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
  disabledButton: {
    backgroundColor: "#aaa",
  },
});