import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const SignUpStep1Screen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to us,</Text>
        <Text style={styles.subtitle}>Hello there, sign up to continue</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputBox}>
          <Ionicons name="person-outline" size={20} color="#8E8E93" />
          <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#A0A0A0" />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#8E8E93" />
          <TextInput style={styles.input} placeholder="Email Address" keyboardType="email-address" placeholderTextColor="#A0A0A0" />
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('SignUpStep2')}>
          <Text style={styles.primaryText}>Continue</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.linkText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 24, justifyContent: 'space-between', paddingVertical: 20 },
  header: { marginTop: 40, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: '700', color: '#1A1D1E' },
  subtitle: { fontSize: 14, color: '#6C727F', marginTop: 8 },
  form: { width: '100%' },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 16, height: 56, marginBottom: 16, gap: 12 },
  input: { flex: 1, fontSize: 15, color: '#1A1D1E' },
  primaryBtn: { backgroundColor: '#4A3AFF', height: 56, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 12 },
  primaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: '#6C727F' },
  linkText: { color: '#4A3AFF', fontWeight: '600' },
});