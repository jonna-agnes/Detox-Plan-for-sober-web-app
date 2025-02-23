import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

export default function DailyCheckIn({ navigation }: any) {
  const [points, setPoints] = useState(0);

  return (
    <View style={styles.container}>
      {/* Using the app icon as logo */}
      <Image
        style={styles.logo}
        source={require("../../assets/images/sober_icon.png")} // Updated path to your app icon
      />

      <Text style={styles.title}>Welcome to Your Daily Check-In</Text>
      <Text style={styles.points}>Your Current Points: {points}</Text>
      <Text style={styles.subText}>Keep checking in daily for rewards!</Text>

      {/* Button to navigate to the 30-Day Plan */}
      <Button
        title="View Your 30-Day Plan"
        onPress={() => navigation.navigate("SoberPlan")}
        color="#2196F3" // Blue color for the 30-Day Plan button
      />

      {/* Optional: Logout button */}
      <Button
        title="Logout"
        onPress={() => navigation.navigate("Login")}
        color="#F44336" // Red color for logout button
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f7f7", // Light background color
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20, // Adjust space between the image and text
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4CAF50", // Green color for title
  },
  points: {
    fontSize: 20,
    marginBottom: 20,
    color: "#333",
  },
  subText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
  },
});
