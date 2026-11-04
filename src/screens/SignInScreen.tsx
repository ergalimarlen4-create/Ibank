import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const SignInScreen = ({ navigation }: any) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Hello there, sign in to continue</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#8E8E93" />
          <TextInput style={styles.input} placeholder="Email or Username" placeholderTextColor="#A0A0A0" />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#8E8E93" />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry={!showPassword} placeholderTextColor="#A0A0A0" />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#8E8E93" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.primaryText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpStep1')}>
          <Text style={styles.linkText}>Sign Up</Text>
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
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 24 },
  forgotText: { color: '#4A3AFF', fontWeight: '500' },
  primaryBtn: { backgroundColor: '#4A3AFF', height: 56, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  primaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: '#6C727F' },
  linkText: { color: '#4A3AFF', fontWeight: '600' },
});