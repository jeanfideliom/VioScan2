import { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Image } from "react-native";

export default function PolicyPage() {
  // State for dropdown visibility
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section], // Toggle the visibility
    }));
  };

  return (
    <ImageBackground source={require("../assets/background.jpg")} style={styles.background}>
      
      {/* HEADER (Fixed at the top) */}
      <View style={styles.header}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.headerTitle}>STUDENT GUIDELINES</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Add space so content doesn't overlap with the header */}
        <View style={{ height: 80 }} />

        {/* Dropdown Sections */}
        {policyData.map(({ title, content }, index) => (
          <View key={index} style={styles.contentBox}>
            <TouchableOpacity onPress={() => toggleSection(title)} style={styles.dropdownHeader}>
              <Text style={styles.sectionTitle}>{title}</Text>
              <Text style={styles.icon}>{openSections[title] ? "▲" : "▼"}</Text>
            </TouchableOpacity>
            {openSections[title] && <Text style={styles.text}>{content}</Text>}
          </View>
        ))}
      </ScrollView>

    </ImageBackground>
  );
}

// 🔹 Policy Data (Array for better maintainability)
const policyData = [
  {
    title: "School Attire A.",
    content:
      "During school days, students are strictly required to wear the current and complete school uniform prescribed by the University, which includes the wearing of proper school closed shoes. Alterations to the standard cut and design of the prescribed uniform are likewise prohibited. The uniform must be worn the way it was designed to be worn.",
  },
  {
    title: "School Attire B.",
    content:
      "College students may apply for uniform exemption in case of certain exceptional circumstances, such as but not limited to: students who are working, or enrolled in practicum and/or internship or pregnant.",
  },
];

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  header: {
    backgroundColor: "#FFFFFF", // Dark blue header
    paddingVertical: 15,
    paddingHorizontal: 20, // Added padding for better spacing
    alignItems: "center",
    flexDirection: "row", // Align logo and text in a row
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Ensure it stays above other content
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 100, // Push content down to avoid overlapping the fixed header
  },
  contentBox: {
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Lower opacity
    padding: 15,
    borderRadius: 15,
    width: "95%",
    marginBottom: 10,
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    color: "#333",
  },
  icon: {
    fontSize: 22,
    color: "#333",
  },
  text: {
    fontSize: 18,
    textAlign: "left",
    color: "#333",
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#003366", // White text
    textAlign: "center",
    flex: 1, // Allow text to take up remaining space
  },
  logo: {
    width: 50, // Adjust size as needed
    height: 50,
    marginRight: 15, // Space between logo and title
  },
  
});

