import React from 'react';
import { View, Text, StyleSheet, Button, Linking } from 'react-native';

export default function Resources() {
  // Function to open links
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL: ", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resources</Text>

      {/* Support Groups */}
      <Text style={styles.subTitle}>1. Support Groups</Text>
      <Text style={styles.text}>AA (Alcoholics Anonymous): Support group for individuals recovering from alcohol addiction.</Text>
      <Text style={styles.text}>NA (Narcotics Anonymous): Support group for individuals recovering from drug addiction.</Text>

      {/* Helplines */}
      <Text style={styles.subTitle}>2. Helplines</Text>
      <Text style={styles.text}>National Helpline: 1-800-123-4567 (Available 24/7)</Text>
      <Text style={styles.text}>Text HELP to 741741 for immediate help (Crisis Text Line)</Text>

      {/* Online Support */}
      <Text style={styles.subTitle}>3. Online Support</Text>
      <Text style={styles.text}>- [Addiction Help Website](https://www.addictionhelp.com)</Text>
      <Text style={styles.text}>- [SMART Recovery](https://www.smartrecovery.org)</Text>
      <Text style={styles.text}>- [Recovery.org Resources](https://www.recovery.org/resources)</Text>

      {/* External Link Buttons */}
      <Button 
        title="Visit Addiction Help Website"
        onPress={() => openLink('https://www.addictionhelp.com')}
      />
      <Button 
        title="Visit SMART Recovery"
        onPress={() => openLink('https://www.smartrecovery.org')}
      />
      <Button 
        title="Visit Recovery.org Resources"
        onPress={() => openLink('https://www.recovery.org/resources')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  subTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 18, marginBottom: 12 },
});
