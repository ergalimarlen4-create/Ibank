import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const CardDetailsScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="chevron-back" size={24} color="#1A1D1E" />
      </TouchableOpacity>

      <Text style={styles.title}>Card Details</Text>

      <View style={styles.card}>
        <Text style={styles.cardType}>iBank Visa Card</Text>
        <Text style={styles.cardNumber}>4829 **** **** 1092</Text>
        <View style={styles.row}>
          <Text style={styles.whiteText}>Holder: JOHN SMITH</Text>
          <Text style={styles.whiteText}>EXP: 08/28</Text>
        </View>
      </View>

      <View style={styles.infoList}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Card Status</Text>
          <Text style={styles.activeStatus}>Active</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Daily Limit</Text>
          <Text style={styles.val}>$5,000.00</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 24, paddingVertical: 20 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginVertical: 16 },
  card: { backgroundColor: '#1A1D1E', borderRadius: 20, padding: 24, height: 200, justifyContent: 'space-between', marginBottom: 24 },
  cardType: { color: '#8E8E93', fontSize: 14 },
  cardNumber: { color: '#FFFFFF', fontSize: 20, letterSpacing: 2, fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  whiteText: { color: '#FFFFFF', fontSize: 12 },
  infoList: { backgroundColor: '#F8F9FA', borderRadius: 12, padding: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  label: { color: '#6C727F', fontSize: 14 },
  activeStatus: { color: '#10B981', fontWeight: '700' },
  val: { color: '#1A1D1E', fontWeight: '600' },
});