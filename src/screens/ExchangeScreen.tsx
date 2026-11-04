import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ExchangeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1A1D1E" />
        </TouchableOpacity>
        <Text style={styles.title}>Exchange</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>From</Text>
        <View style={styles.inputRow}>
          <TextInput style={styles.input} defaultValue="1000" keyboardType="numeric" />
          <Text style={styles.currency}>USD</Text>
        </View>
      </View>

      <View style={styles.switchIcon}>
        <Ionicons name="swap-vertical" size={22} color="#4A3AFF" />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>To</Text>
        <View style={styles.inputRow}>
          <TextInput style={styles.input} defaultValue="1,122,000" keyboardType="numeric" />
          <Text style={styles.currency}>KRW</Text>
        </View>
      </View>

      <View style={styles.rateInfo}>
        <Text style={styles.rateText}>Currency rate</Text>
        <Text style={styles.rateValue}>1 USD = 1122 KRW</Text>
      </View>

      <TouchableOpacity style={styles.primaryBtn}>
        <Text style={styles.primaryText}>Exchange</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 20 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16 },
  title: { fontSize: 18, fontWeight: '700', color: '#1A1D1E' },
  card: { backgroundColor: '#F8F9FA', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 16, marginBottom: 8 },
  label: { fontSize: 12, color: '#6C727F', marginBottom: 8 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  input: { fontSize: 20, fontWeight: '700', color: '#1A1D1E', flex: 1 },
  currency: { fontSize: 16, fontWeight: '600', color: '#4A3AFF' },
  switchIcon: { alignSelf: 'center', marginVertical: -12, zIndex: 1, backgroundColor: '#F0EEFF', padding: 8, borderRadius: 20 },
  rateInfo: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, paddingHorizontal: 4 },
  rateText: { color: '#6C727F', fontSize: 14 },
  rateValue: { color: '#1A1D1E', fontWeight: '600', fontSize: 14 },
  primaryBtn: { backgroundColor: '#4A3AFF', height: 56, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  primaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});