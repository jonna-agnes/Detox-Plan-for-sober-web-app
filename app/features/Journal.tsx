import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { firestore, auth } from "../../services/firebase"; // Adjust path to your firebase.js
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { updateTotalPoints } from "../features/TotalPoints"; // Import the function to update total points

const dailyGratitude = [
  {
    day: 1,
    quote: "The best way to predict the future is to create it.",
    tip: "Visualize your goals vividly today and write down one step you can take to move closer to them.",
    uses: "Daily goal visualization strengthens your focus and empowers you to take actionable steps toward a fulfilled life.",
  },
  {
    day: 2,
    quote:
      "Happiness is not something ready-made. It comes from your own actions.",
    tip: "List three small acts of kindness you can do today and implement them.",
    uses: "Acts of kindness enhance your sense of purpose and connection with others.",
  },
  {
    day: 3,
    quote: "Do what you can, with what you have, where you are.",
    tip: "Identify one challenge you’re facing and write down how you can address it with the resources you already have.",
    uses: "This practice develops resilience and boosts problem-solving skills.",
  },
  {
    day: 4,
    quote:
      "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    tip: "Reflect on a moment when you showed great inner strength, and note how it transformed you.",
    uses: "Recognizing your inner power builds confidence for future challenges.",
  },
  {
    day: 5,
    quote:
      "It is not the strongest of the species that survive, but the most adaptable.",
    tip: "Journal about one recent change in your life and how you’ve adapted to it.",
    uses: "Adaptability is key to navigating life’s uncertainties with grace.",
  },
];

export default function Journal() {
  const [entry, setEntry] = useState("");
  const [day, setDay] = useState(1); // Track the current day
  const [points, setPoints] = useState(0);

  const handleSave = async () => {
    if (!entry.trim()) {
      Alert.alert("Error", "Please write something before saving.");
      return;
    }

    const earnedPoints = 100; // Points for saving an entry
    setPoints(earnedPoints); // Set points for the current day

    // Send the earned points to TotalPoints
    updateTotalPoints(earnedPoints);

    const userId = auth.currentUser?.uid;
    const journalDocRef = doc(
      firestore,
      "journals",
      userId ? `${userId}_day${day}` : `temp_day${day}`
    );

    const journalData = {
      entry: entry,
      points: earnedPoints,
      timestamp: serverTimestamp(),
      day: day,
      userId: userId,
    };

    try {
      // Check if the document exists
      const docSnapshot = await getDoc(journalDocRef);
      if (docSnapshot.exists()) {
        // Document exists, update it
        const prevData = docSnapshot.data();
        const previousPoints = prevData ? prevData.points : 0;

        // Subtract the previous points if they exist
        const newTotalPoints = previousPoints
          ? previousPoints - earnedPoints
          : earnedPoints;

        await updateDoc(journalDocRef, journalData); // Update entry data
        // Also update the total points if needed (This could be another collection or field)
        updateTotalPoints(newTotalPoints);
      } else {
        // Create new document if it doesn't exist
        await setDoc(journalDocRef, journalData);
      }

      Alert.alert("Success", `Your gratitude journal for Day ${day} is saved!`);
      setEntry(""); // Clear the entry input
    } catch (error) {
      console.error("Error saving journal entry:", error);
      Alert.alert(
        "Error",
        "There was a problem saving your journal entry. Please try again."
      );
    }
  };

  // Navigate to the previous or next day
  const navigateDay = (direction: "previous" | "next") => {
    setDay((prevDay) => (direction === "previous" ? prevDay - 1 : prevDay + 1));
  };

  // Get the current day's quote, tip, and uses
  const gratitude = dailyGratitude[day - 1];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gratitude Journal</Text>
      <Text style={styles.subtitle}>Day {day}</Text>

      {/* Daily Gratitude Quote */}
      <Text style={styles.subheading}>Quote:</Text>
      <Text style={styles.text}>{gratitude?.quote}</Text>

      {/* Tip for Journal Writing */}
      <Text style={styles.subheading}>Tip:</Text>
      <Text style={styles.text}>{gratitude?.tip}</Text>

      {/* How it Helps */}
      <Text style={styles.subheading}>How it Helps:</Text>
      <Text style={styles.text}>{gratitude?.uses}</Text>

      {/* Journal Entry Section */}
      <Text style={styles.subtitle}>Write something you're grateful for:</Text>
      <TextInput
        style={styles.input}
        placeholder="Write what you're grateful for..."
        multiline
        value={entry}
        onChangeText={setEntry}
      />

      {/* Save Button */}
      <Button title="Save Entry" onPress={handleSave} color="#5e4b8b" />

      {/* Points Earned Today */}
      <Text style={styles.points}>Points Earned Today: {points}</Text>

      {/* Day Navigation Buttons */}
      <View style={styles.navigation}>
        <Button
          title="Previous Day"
          onPress={() => navigateDay("previous")}
          color="#6c63ff"
          disabled={day === 1} // Disable if it's the first day
        />
        <Button
          title="Next Day"
          onPress={() => navigateDay("next")}
          color="#6c63ff"
        />
      </View>

      {/* Motivational Quote */}
      <View style={styles.motivationalBox}>
        <Text style={styles.motivationalText}>
          "Gratitude turns what we have into enough."
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4e2a84",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4e2a84",
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4e2a84",
    marginVertical: 6,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
  input: {
    height: 120,
    borderColor: "#4e2a84",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    paddingTop: 12,
    borderRadius: 8,
    fontSize: 16,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  points: {
    fontSize: 18,
    color: "#4e2a84",
    fontWeight: "500",
    marginTop: 16,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 20,
  },
  motivationalBox: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#5e4b8b",
    borderRadius: 10,
    marginBottom: 20,
    width: "90%",
    alignItems: "center",
  },
  motivationalText: {
    fontSize: 18,
    color: "#fff",
    fontStyle: "italic",
    textAlign: "center",
  },
});
