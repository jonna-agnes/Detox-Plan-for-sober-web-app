import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

// Define the RootStackParamList with all the screen names
type RootStackParamList = {
  Dashboard: undefined;
  DailyCheckin: undefined;
  DailyQuote: undefined;
  Journal: undefined;
  SoberDaysTracker: undefined;
  SoberPlan: undefined;
  Resources: undefined;
  EmergencyContacts: undefined;
  TotalPoints: undefined; // Add TotalPoints screen
};

// Correctly type the `navigation` prop
type DashboardNavigationProp = StackNavigationProp<RootStackParamList>;

interface DashboardProps {
  navigation: DashboardNavigationProp;
}

const Dashboard: React.FC<DashboardProps> = ({ navigation }) => {
  const buttons: { title: string; screen: keyof RootStackParamList }[] = [
    { title: "Daily Check-In", screen: "DailyCheckin" },
    { title: "Daily Quote", screen: "DailyQuote" },
    { title: "Journal", screen: "Journal" },
    { title: "Sober Days Tracker", screen: "SoberDaysTracker" },
    { title: "Sober Plan", screen: "SoberPlan" },
    { title: "Resources", screen: "Resources" },
    { title: "Emergency Contacts", screen: "EmergencyContacts" },
    { title: "Total Points", screen: "TotalPoints" }, // Add Total Points button
  ];

  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Your Dashboard</Text>
      {buttons.map(({ title, screen }, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => handleNavigation(screen)}
          accessibilityLabel={title}
          accessibilityHint={`Navigate to the ${title} section`}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Dashboard;
