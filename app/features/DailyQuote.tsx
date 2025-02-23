import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { updateTotalPoints } from "../features/TotalPoints"; // Function to update points

const quotes = [
  "Day 1: The journey of a thousand miles begins with a single step.",
  "Day 2: Your future is created by what you do today, not tomorrow.",
  "Day 3: Discipline is the bridge between goals and accomplishments.",
  "Day 4: You don't have to see the whole staircase; just take the first step.",
  "Day 5: Sometimes later becomes never. Do it now.",
  "Day 6: Change is painful, but nothing is as painful as staying stuck somewhere you don’t belong.",
  "Day 7: The only way to achieve the impossible is to believe it is possible.",
  "Day 8: You are never too old to set another goal or to dream a new dream.",
  "Day 9: Believe you can and you're halfway there.",
  "Day 10: Every accomplishment starts with the decision to try.",
  "Day 11: What you get by achieving your goals is not as important as what you become by achieving your goals.",
  "Day 12: Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.",
  "Day 13: The best way to predict the future is to create it.",
  "Day 14: Don’t let what you cannot do interfere with what you can do.",
  "Day 15: Life is 10% what happens to us and 90% how we react to it.",
  "Day 16: Do something today that your future self will thank you for.",
  "Day 17: You don’t have to be perfect to be amazing.",
  "Day 18: Tough times don’t last. Tough people do.",
  "Day 19: The best time to plant a tree was 20 years ago. The second-best time is now.",
  "Day 20: Be stronger than your excuses.",
  "Day 21: The difference between a successful person and others is not a lack of strength but a lack of will.",
  "Day 22: Do what you can with what you have, where you are.",
  "Day 23: A little progress each day adds up to big results.",
  "Day 24: Keep going. Everything you need will come to you at the right time.",
  "Day 25: It’s not about being the best. It’s about being better than you were yesterday.",
  "Day 26: You didn’t come this far to only come this far.",
  "Day 27: If you want something you’ve never had, you must be willing to do something you’ve never done.",
  "Day 28: One day or day one. You decide.",
  "Day 29: Believe in your infinite potential. Your only limitations are those you set upon yourself.",
  "Day 30: Celebrate progress, no matter how small. Growth is growth.",
];

export default function DailyQuote() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const nextQuote = () => {
    if (quoteIndex < quotes.length - 1) setQuoteIndex(quoteIndex + 1);
  };

  const prevQuote = () => {
    if (quoteIndex > 0) setQuoteIndex(quoteIndex - 1);
  };

  const handleReadQuote = () => {
    updateTotalPoints(5); // Add 5 points for reading the quote
    alert(
      `You earned 5 points for reading the quote for Day ${quoteIndex + 1}`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Daily Motivation</Text>
      <Text style={styles.quote}>{quotes[quoteIndex]}</Text>

      <Button
        title="Yes, I have read the quote for this day"
        onPress={handleReadQuote}
        color="#4CAF50"
      />
      <View style={styles.navButtons}>
        <Button
          title="Previous Day"
          onPress={prevQuote}
          disabled={quoteIndex === 0}
        />
        <Button
          title="Next Day"
          onPress={nextQuote}
          disabled={quoteIndex === quotes.length - 1}
        />
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
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  quote: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "500",
    marginHorizontal: 20,
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
