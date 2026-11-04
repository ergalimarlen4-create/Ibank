import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const WelcomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.illustration}>
        <View style={styles.circle}>
          <Ionicons name="wallet-outline" size={80} color="#4A3AFF" />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Easy Way to Manage Your Money</Text>
        <Text style={styles.subtitle}>Transfer money, pay bills, and manage your financial goals easily.</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.primaryText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('SignUpStep1')}>
          <Text style={styles.secondaryText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 24, justifyContent: 'space-between', paddingVertical: 20 },
  illustration: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  circle: { width: 160, height: 160, borderRadius: 80, backgroundColor: '#F0EEFF', justifyContent: 'center', alignItems: 'center' },
  content: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 26, fontWeight: '700', textAlign: 'center', color: '#1A1D1E', marginBottom: 12 },
  subtitle: { fontSize: 14, textAlign: 'center', color: '#6C727F', paddingHorizontal: 10 },
  actions: { width: '100%', gap: 12 },
  primaryBtn: { backgroundColor: '#4A3AFF', height: 56, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  primaryText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  secondaryBtn: { backgroundColor: '#F0EEFF', height: 56, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  secondaryText: { color: '#4A3AFF', fontSize: 16, fontWeight: '600' },
});