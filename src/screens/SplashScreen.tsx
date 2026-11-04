import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoBadge}>
        <Text style={styles.logoText}>iB</Text>
      </View>
      <Text style={styles.title}>iBank</Text>
      <Text style={styles.subtitle}>Digital Banking & E-Money</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4A3AFF', justifyContent: 'center', alignItems: 'center' },
  logoBadge: { width: 80, height: 80, borderRadius: 24, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  logoText: { fontSize: 32, fontWeight: '800', color: '#4A3AFF' },
  title: { fontSize: 36, fontWeight: '800', color: '#FFFFFF' },
  subtitle: { fontSize: 14, color: '#E0E0FF', marginTop: 8 },
});