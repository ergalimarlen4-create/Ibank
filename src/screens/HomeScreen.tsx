import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>John Smith</Text>
          </View>
          <TouchableOpacity style={styles.profileBadge}>
            <Ionicons name="person" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Card */}
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CardDetails')}>
          <Text style={styles.cardType}>iBank Premium</Text>
          <Text style={styles.cardNumber}>**** **** **** 4829</Text>
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardLabel}>Balance</Text>
              <Text style={styles.cardBalance}>$24,850.00</Text>
            </View>
            <Text style={styles.cardExpiry}>08/28</Text>
          </View>
        </TouchableOpacity>

        {/* Action Grid */}
        <View style={styles.grid}>
          {[
            { title: 'Transfer', icon: 'swap-horizontal' },
            { title: 'Pay Bills', icon: 'receipt' },
            { title: 'Top Up', icon: 'add-circle' },
            { title: 'Withdraw', icon: 'cash' },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.gridItem}>
              <View style={styles.iconCircle}>
                <Ionicons name={item.icon as any} size={24} color="#4A3AFF" />
              </View>
              <Text style={styles.gridTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Transactions */}
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {[
          { title: 'Apple Store', date: 'Today, 14:20', amount: '-$999.00', color: '#1A1D1E' },
          { title: 'Salary Income', date: 'Yesterday', amount: '+$4,500.00', color: '#10B981' },
        ].map((tx, idx) => (
          <View key={idx} style={styles.txRow}>
            <View style={styles.txIcon}>
              <Ionicons name="cart-outline" size={20} color="#4A3AFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.txTitle}>{tx.title}</Text>
              <Text style={styles.txDate}>{tx.date}</Text>
            </View>
            <Text style={[styles.txAmount, { color: tx.color }]}>{tx.amount}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scroll: { padding: 20 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { fontSize: 13, color: '#6C727F' },
  userName: { fontSize: 20, fontWeight: '700', color: '#1A1D1E' },
  profileBadge: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#4A3AFF', justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#4A3AFF', borderRadius: 20, padding: 20, height: 180, justifyContent: 'space-between', marginBottom: 24 },
  cardType: { color: '#E0E0FF', fontSize: 14 },
  cardNumber: { color: '#FFF', fontSize: 18, letterSpacing: 2, fontWeight: '600' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  cardLabel: { color: '#E0E0FF', fontSize: 12 },
  cardBalance: { color: '#FFF', fontSize: 22, fontWeight: '700' },
  cardExpiry: { color: '#FFF', fontSize: 14 },
  grid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  gridItem: { alignItems: 'center', width: '22%' },
  iconCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  gridTitle: { fontSize: 12, color: '#1A1D1E', fontWeight: '500' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1A1D1E', marginBottom: 12 },
  txRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 8, gap: 12 },
  txIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0EEFF', justifyContent: 'center', alignItems: 'center' },
  txTitle: { fontSize: 15, fontWeight: '600', color: '#1A1D1E' },
  txDate: { fontSize: 12, color: '#8E8E93' },
  txAmount: { fontSize: 15, fontWeight: '700' },
});