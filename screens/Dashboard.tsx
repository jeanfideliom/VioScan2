import { View, Text, StyleSheet, ImageBackground, ScrollView, Image } from "react-native";

export default function Dashboard() {
  return (
    <ImageBackground source={require("../assets/background.jpg")} style={styles.background}>
      <View style={styles.header}>
                <Image source={require("../assets/logo.png")} style={styles.logo} />
                <Text style={styles.headerTitle}>WELCOME</Text>
              </View>
      <ScrollView contentContainerStyle={styles.container}>
    
        {/* WHY STUDY IN NEU */}
        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>WHY STUDY IN NEU?</Text>
          <Text style={styles.text}>
            New Era University (NEU) is a private, non-sectarian educational institution aimed at 
            developing men and women of excellence, discipline, and service to humanity. The University 
            also endeavors at developing academic excellence, professional responsibility, and social 
            awareness among its students.
          </Text>
        </View>

        {/* Philosophy of Education */}
        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>Philosophy of Education</Text>
          <Text style={styles.text}>Godliness is the foundation of knowledge.</Text>
        </View>

        {/* Mission */}
        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>Mission</Text>
          <Text style={styles.text}>
            Provide quality education anchored on Christian values with the prime purpose of bringing 
            honor and glory to God.
          </Text>
        </View>

        {/* Vision */}
        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>Vision</Text>
          <Text style={styles.text}>
            A world-class Institution of learning with a unique Christian culture of excellence, discipline, 
            and service to humanity.
          </Text>
        </View>

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  contentBox: {
    backgroundColor: "rgba(255, 255, 255, 0.9)", 
    padding: 20,
    borderRadius: 15,
    width: "95%",
    alignItems: "center",
    opacity: 0.7,
    marginBottom: 15, 
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#003366", // White text
    textAlign: "center",
    flex: 1, // Allow text to take up remaining space
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  
  },
  header: {
    backgroundColor: "#FFFFFF", // Dark blue header
    paddingVertical: 15,
    paddingHorizontal: 20, // Added padding for better spacing
    alignItems: "center",
    flexDirection: "row", // Align logo and text in a row
    width: "100%",  
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Ensure it stays above other content
  },
  logo: {
    width: 50, // Adjust size as needed
    height: 50,
    marginRight: 15, // Space between logo and title
  },
  
});
