import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { firestore, auth } from "../../services/firebase"; // Import firestore and auth
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// Function to update total points in Firebase
export const updateTotalPoints = async (points: number) => {
  const userId = auth.currentUser?.uid;
  if (userId) {
    const userDocRef = doc(firestore, "users", userId); // Reference to the user document

    try {
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        // Document exists, update the points
        const previousPoints = docSnapshot.data()?.totalPoints || 0;
        const newTotalPoints = previousPoints + points;

        // Update the document with the new total points
        await updateDoc(userDocRef, { totalPoints: newTotalPoints });
      } else {
        // Document does not exist, create it with the initial points
        await setDoc(userDocRef, { totalPoints: points });
      }
    } catch (error) {
      console.error("Error updating total points:", error);
      Alert.alert("Error", "There was a problem updating your points.");
    }
  } else {
    Alert.alert("Error", "User not authenticated.");
  }
};

export default function TotalPoints() {
  const [points, setPoints] = useState(0);

  // Fetch total points when the component loads
  useEffect(() => {
    const fetchPoints = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const userDocRef = doc(firestore, "users", userId); // Reference to the user document
        try {
          const docSnapshot = await getDoc(userDocRef);
          if (docSnapshot.exists()) {
            const totalPoints = docSnapshot.data()?.totalPoints || 0;
            setPoints(totalPoints);
          } else {
            setPoints(0); // No points stored yet for this user
          }
        } catch (error) {
          console.error("Error fetching total points:", error);
          Alert.alert("Error", "There was a problem fetching your points.");
        }
      } else {
        Alert.alert("Error", "User not authenticated.");
      }
    };

    fetchPoints();
  }, []);

  const handleShowPoints = () => {
    alert(`Your total points: ${points}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Points Tracker</Text>
      <Text style={styles.points}>Current Points: {points}</Text>
      <Button
        title="View Total Points"
        onPress={handleShowPoints}
        color="#4CAF50"
      />
    </View>
  );
}

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
  },
  points: {
    fontSize: 18,
    marginBottom: 20,
    color: "#333",
  },
});
