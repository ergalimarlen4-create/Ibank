import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const InterestRateScreen = ({ navigation }: any) => {
  const rates = [
    { kind: 'Individual customers', term: '1m', rate: '4.50%' },
    { kind: 'Corporate customers', term: '2m', rate: '5.50%' },
    { kind: 'Individual customers', term: '1m', rate: '4.50%' },
    { kind: 'Corporate customers', term: '6m', rate: '2.50%' },
    { kind: 'Individual customers', term: '1m', rate: '4.50%' },
    { kind: 'Corporate customers', term: '8m', rate: '6.50%' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1A1D1E" />
        </TouchableOpacity>
        <Text style={styles.title}>Interest rate</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.columnText, { flex: 2 }]}>Interest kind</Text>
        <Text style={[styles.columnText, { flex: 1, textAlign: 'center' }]}>Deposit</Text>
        <Text style={[styles.columnText, { flex: 1, textAlign: 'right' }]}>Rate</Text>
      </View>

      <FlatList
        data={rates}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.rowText, { flex: 2, color: '#1A1D1E' }]}>{item.kind}</Text>
            <Text style={[styles.rowText, { flex: 1, textAlign: 'center', color: '#6C727F' }]}>{item.term}</Text>
            <Text style={[styles.rowText, { flex: 1, textAlign: 'right', color: '#4A3AFF', fontWeight: '700' }]}>{item.rate}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 20 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16 },
  title: { fontSize: 18, fontWeight: '700', color: '#1A1D1E' },
  tableHeader: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  columnText: { fontSize: 13, fontWeight: '600', color: '#8E8E93' },
  row: { flexDirection: 'row', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F2F2F7', alignItems: 'center' },
  rowText: { fontSize: 14 },
});