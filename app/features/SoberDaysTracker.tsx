import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const quotes = [
  "The only way out is through. Keep going.",
  "Every day is a new opportunity to be better.",
  "Your future self will thank you for the progress you're making today.",
  "One step at a time. You’ve got this!",
  "Strength doesn’t come from what you can do. It comes from overcoming the things you once thought you couldn’t.",
  "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
  "The journey of a thousand miles begins with one step.",
  "You are not your past. Your future is yours to create.",
  "The hardest battles are given to the strongest warriors. Keep fighting.",
  "Success is the sum of small efforts repeated day in and day out.",
];

export default function SoberDaysTracker() {
  const [soberDays, setSoberDays] = useState(0);
  const [points, setPoints] = useState(0);
  const [currentQuote, setCurrentQuote] = useState("");

  const trackSoberDay = () => {
    setSoberDays(soberDays + 1); // Increment sober days
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote); // Get a random quote each time
    setPoints(points + 30); // Award 30 points for each sober day
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sober Days Tracker</Text>
      <Text style={styles.subTitle}>Number of Days Achieved: {soberDays}</Text>
      <Text style={styles.subTitle}>Total Points: {points}</Text>
      <Text style={styles.quote}>Motivation: {currentQuote}</Text>
      <Button title="Track a Sober Day" onPress={trackSoberDay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  quote: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 20,
    textAlign: "center",
  },
});
