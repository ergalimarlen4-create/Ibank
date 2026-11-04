import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

export const OtpVerificationScreen = ({ navigation }: any) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Enter OTP Code</Text>
        <Text style={styles.subtitle}>We have sent a 4-digit code to your email</Text>
      </View>

      <View style={styles.otpRow}>
        {[0, 1, 2, 3].map((index) => (
          <TextInput
            key={index}
            style={styles.otpBox}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(val) => {
              const newOtp = [...otp];
              newOtp[index] = val;
              setOtp(newOtp);
            }}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styles.primaryText}>Verify Code</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 24, paddingVertical: 20 },
  header: { marginTop: 40, alignItems: 'center', marginBottom: 32 },
  title: { fontSize: 26, fontWeight: '700', color: '#1A1D1E' },
  subtitle: { fontSize: 14, color: '#6C727F', marginTop: 8, textAlign: 'center' },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  otpBox: { width: 64, height: 64, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, textAlign: 'center', fontSize: 24, fontWeight: '700', backgroundColor: '#F8F9FA' },
  primaryBtn: { backgroundColor: '#4A3AFF', height: 56, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  primaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});