import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ForgotPasswordScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="chevron-back" size={24} color="#1A1D1E" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your email address to receive a verification code</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#8E8E93" />
          <TextInput style={styles.input} placeholder="Email Address" keyboardType="email-address" placeholderTextColor="#A0A0A0" />
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('OtpVerification')}>
          <Text style={styles.primaryText}>Send Code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 24, paddingVertical: 20 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  header: { marginTop: 20, marginBottom: 32 },
  title: { fontSize: 26, fontWeight: '700', color: '#1A1D1E' },
  subtitle: { fontSize: 14, color: '#6C727F', marginTop: 8 },
  form: { width: '100%' },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 16, height: 56, marginBottom: 20, gap: 12 },
  input: { flex: 1, fontSize: 15, color: '#1A1D1E' },
  primaryBtn: { backgroundColor: '#4A3AFF', height: 56, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  primaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});