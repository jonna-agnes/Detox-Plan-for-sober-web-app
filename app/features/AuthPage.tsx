import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { signUp, logIn } from "../../services/authService"; // Import Firebase auth service methods

// Define types for navigation stack
type RootStackParamList = {
  AuthPage: undefined;
  Dashboard: undefined;
};

type AuthPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

const AuthPage = () => {
  const [email, setEmail] = useState(""); // Firebase uses email instead of username
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState(false);

  // Random quote array
  const quotes = [
    "The best way to predict the future is to create it.",
    "You are never too old to set another goal or to dream a new dream.",
    "It always seems impossible until it's done.",
    "Believe you can and you're halfway there.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const navigation = useNavigation<AuthPageNavigationProp>();

  // Handle Login
  const handleLogin = async () => {
    try {
      await logIn(email, password); // Firebase login method
      Alert.alert("Success", `Welcome! Here's a quote: "${randomQuote}"`);
      navigation.navigate("Dashboard"); // Navigate to Dashboard on successful login
    } catch (error: any) {
      const errorMessage = error.message || "Failed to log in"; // Extract error message from Firebase
      Alert.alert("Error", errorMessage);
    }
  };

  // Handle Sign Up
  const handleSignUp = async () => {
    try {
      await signUp(email, password); // Firebase sign-up method
      Alert.alert(
        "Success",
        `Account created successfully! Here's a quote: "${randomQuote}"`
      );
      setNewUser(false); // After sign up, return to login screen
    } catch (error: any) {
      const errorMessage = error.message || "Failed to sign up"; // Extract error message from Firebase
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{newUser ? "Sign Up" : "Login"}</Text>

      {/* Email input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {/* Login or Sign-Up button */}
      <TouchableOpacity
        onPress={newUser ? handleSignUp : handleLogin}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{newUser ? "Sign Up" : "Login"}</Text>
      </TouchableOpacity>

      {/* Toggle between login and sign-up */}
      <TouchableOpacity onPress={() => setNewUser(!newUser)}>
        <Text style={styles.toggleText}>
          {newUser ? "Already have an account? Login" : "New user? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleText: {
    color: "#007BFF",
    marginTop: 16,
  },
});

export default AuthPage;
