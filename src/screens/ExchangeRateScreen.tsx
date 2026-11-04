import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ExchangeRateScreen = ({ navigation }: any) => {
  const exchanges = [
    { country: 'Vietnam', buy: '1.403', sell: '1.746' },
    { country: 'Nicaragua', buy: '9.123', sell: '12.09' },
    { country: 'Korea', buy: '3.704', sell: '5.151' },
    { country: 'Russia', buy: '116.0', sell: '144.4' },
    { country: 'China', buy: '1.725', sell: '2.234' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1A1D1E" />
        </TouchableOpacity>
        <Text style={styles.title}>Exchange rate</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.columnText, { flex: 2 }]}>Country</Text>
        <Text style={[styles.columnText, { flex: 1, textAlign: 'right' }]}>Buy</Text>
        <Text style={[styles.columnText, { flex: 1, textAlign: 'right' }]}>Sell</Text>
      </View>

      <FlatList
        data={exchanges}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.rowText, { flex: 2, fontWeight: '600', color: '#1A1D1E' }]}>{item.country}</Text>
            <Text style={[styles.rowText, { flex: 1, textAlign: 'right', color: '#6C727F' }]}>{item.buy}</Text>
            <Text style={[styles.rowText, { flex: 1, textAlign: 'right', color: '#1A1D1E', fontWeight: '600' }]}>{item.sell}</Text>
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