import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

export default function Profile() {
  const [user, setUser] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) {
        setUser(sessionData.session);
        fetchProfile(sessionData.session.user.id);
      }
    };

    fetchUser();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ImageBackground
      source={require("../assets/background.jpg")} style={styles.background}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.headerTitle}>PROFILE</Text>
      </View>

      <View style={styles.container}>
        {profile ? (
          <View style={styles.profileBox}>
            <Image
              source={{
                uri: profile.avatar_url || "https://via.placeholder.com/100",
              }}
              style={styles.avatar}
            />
            <Text style={styles.name}>{profile.full_name}</Text>
            <Text style={styles.email}>{profile.email}</Text>
          </View>
        ) : (
          <Text style={styles.noDataText}>No profile data found</Text>
        )}
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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profileBox: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Adds shadow on Android
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 5,
  },
  email: {
    fontSize: 18,
    color: "gray",
  },
  noDataText: {
    fontSize: 18,
    color: "#333",
  },
  header: {
    backgroundColor: "#FFFFFF",
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
  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    flex: 1,
  },
});

