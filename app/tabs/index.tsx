import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthPage from "../features/AuthPage"; // Updated to reflect the new name
import Dashboard from "../features/Dashboard";
import DailyCheckin from "../features/DailyCheckIn";
import DailyQuote from "../features/DailyQuote";
import Journal from "../features/Journal";
import SoberDaysTracker from "../features/SoberDaysTracker";
import SoberPlan from "../features/SoberPlan";
import Resources from "../features/Resources";
import EmergencyContacts from "../features/EmergencyContacts";
import TotalPoints from "../features/TotalPoints";

// Define the screen types for TypeScript
type RootStackParamList = {
  AuthPage: undefined;
  Dashboard: undefined;
  DailyCheckin: undefined;
  DailyQuote: undefined;
  Journal: undefined;
  SoberDaysTracker: undefined;
  SoberPlan: undefined;
  Resources: undefined;
  EmergencyContacts: undefined;
  TotalPoints: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthPage"
        screenOptions={{
          headerStyle: { backgroundColor: "#007BFF" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="AuthPage"
          component={AuthPage}
          options={{ title: "Authentication" }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ title: "Dashboard" }}
        />
        <Stack.Screen
          name="DailyCheckin"
          component={DailyCheckin}
          options={{ title: "Daily Check-In" }}
        />
        <Stack.Screen
          name="DailyQuote"
          component={DailyQuote}
          options={{ title: "Daily Quote" }}
        />
        <Stack.Screen
          name="Journal"
          component={Journal}
          options={{ title: "Journal" }}
        />
        <Stack.Screen
          name="SoberDaysTracker"
          component={SoberDaysTracker}
          options={{ title: "Sober Days Tracker" }}
        />
        <Stack.Screen
          name="SoberPlan"
          component={SoberPlan}
          options={{ title: "Sober Plan" }}
        />
        <Stack.Screen
          name="Resources"
          component={Resources}
          options={{ title: "Resources" }}
        />
        <Stack.Screen
          name="EmergencyContacts"
          component={EmergencyContacts}
          options={{ title: "Emergency Contacts" }}
        />
        <Stack.Screen
          name="TotalPoints"
          component={TotalPoints}
          options={{ title: "Total Points" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
