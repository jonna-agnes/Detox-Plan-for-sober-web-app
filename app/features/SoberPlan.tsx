import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { firestore } from "../../services/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

const dayPlan = [
  {
    day: 1,
    meals: "Breakfast: Oats, Lunch: Salad, Dinner: Grilled Chicken",
    tasks: "Walk for 30 minutes",
    tips: "Drink water, stay hydrated.",
  },
  {
    day: 2,
    meals: "Breakfast: Smoothie, Lunch: Chicken Wrap, Dinner: Veggie Stir Fry",
    tasks: "Read a book for 30 minutes",
    tips: "Stay positive, keep distractions away.",
  },
  // Add all other days here...
];

export default function SoberPlan({ navigation }: any) {
  const [currentDay, setCurrentDay] = useState(0);
  const [points, setPoints] = useState(0);

  const motivationalQuote =
    "Meals are the fuel that powers your body, mind, and soul. Eating right fuels your sobriety journey and strengthens your resolve every day!";

  useEffect(() => {
    // Fetch points on component mount and also listen for real-time updates from Firestore
    const docRef = doc(firestore, "responses", `${dayPlan[currentDay].day}`);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setPoints(data?.points || 0); // Set points from Firestore
      } else {
        console.log("No such document!");
        setPoints(0); // Default points if no document
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [currentDay]);

  const nextDay = () => {
    if (currentDay < dayPlan.length - 1) {
      setCurrentDay(currentDay + 1);
    }
  };

  const previousDay = () => {
    if (currentDay > 0) {
      setCurrentDay(currentDay - 1);
    }
  };

  const handleResponse = async (response: string) => {
    let dailyPoints = 0;

    if (response === "entire") {
      dailyPoints = 50;
    } else if (response === "partial") {
      dailyPoints = 30;
    }

    const docRef = doc(firestore, "responses", `${dayPlan[currentDay].day}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // If document exists, update points
      const currentPoints = docSnap.data()?.points || 0;
      const newPoints = currentPoints + dailyPoints;

      await updateDoc(docRef, {
        response: response,
        points: newPoints, // Update points in Firestore
        timestamp: serverTimestamp(),
      });
      console.log("Response updated in Firestore");
    } else {
      // If document does not exist, create a new document
      const userResponse = {
        day: dayPlan[currentDay].day,
        response: response,
        points: dailyPoints,
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(firestore, "responses"), userResponse);
      console.log("Response saved to Firestore");
    }

    // Update local state after Firestore update
    setPoints((prevPoints) => prevPoints + dailyPoints);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Sober Plan - Day {dayPlan[currentDay].day}
      </Text>
      <Text style={styles.subtitle}>Meals:</Text>
      <Text style={styles.text}>{dayPlan[currentDay].meals}</Text>
      <Text style={styles.subtitle}>Tasks:</Text>
      <Text style={styles.text}>{dayPlan[currentDay].tasks}</Text>
      <Text style={styles.subtitle}>Tips:</Text>
      <Text style={styles.text}>{dayPlan[currentDay].tips}</Text>

      <Text style={styles.points}>Points Earned: {points}</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Completed Entirely"
          onPress={() => handleResponse("entire")}
        />
        <Button
          title="Completed Partially"
          onPress={() => handleResponse("partial")}
        />
      </View>

      <View style={styles.navigation}>
        <Button
          title="Previous Day"
          onPress={previousDay}
          disabled={currentDay === 0}
        />
        <Button
          title="Next Day"
          onPress={nextDay}
          disabled={currentDay === dayPlan.length - 1}
        />
      </View>

      <View style={styles.motivationalBox}>
        <Text style={styles.motivationalText}>{motivationalQuote}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4e2a84",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4e2a84",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  points: {
    fontSize: 18,
    fontWeight: "500",
    color: "#4e2a84",
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navigation: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  motivationalBox: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#e9e9e9",
    borderRadius: 8,
  },
  motivationalText: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    color: "#4e2a84",
  },
});
