import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";

export default function EmergencyContacts() {
  const callPhone = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>

      <TouchableOpacity onPress={() => callPhone("1-800-123-4567")}>
        <Text style={styles.contact}>
          1. Emergency Helpline: 1-800-123-4567
        </Text>
      </TouchableOpacity>

      <Text style={styles.contact}>2. Local Support Group: AA</Text>

      <TouchableOpacity onPress={() => callPhone("555-1234")}>
        <Text style={styles.contact}>3. Therapist: Dr. John Doe, 555-1234</Text>
      </TouchableOpacity>
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
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  contact: { fontSize: 18, marginBottom: 12, color: "#007BFF" },
});
