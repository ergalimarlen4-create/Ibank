import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const SearchScreen = ({ navigation }: any) => {
  const searchItems = [
    { title: 'Branch', subtitle: 'Search for branch' },
    { title: 'Interest rate', subtitle: 'Search for interest rate' },
    { title: 'Exchange rate', subtitle: 'Search for exchange rate' },
    { title: 'Exchange', subtitle: 'Exchange amount of money' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Search</Text>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#8E8E93" />
        <TextInput style={styles.input} placeholder="Search" placeholderTextColor="#A0A0A0" />
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {searchItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.itemRow}
            onPress={() => {
              if (item.title === 'Branch') navigation.navigate('SearchBranch');
              if (item.title === 'Interest rate') navigation.navigate('InterestRate');
              if (item.title === 'Exchange rate') navigation.navigate('ExchangeRate');
              if (item.title === 'Exchange') navigation.navigate('Exchange');
            }}
          >
            <View>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 20 },
  header: { marginTop: 20, marginBottom: 16 },
  screenTitle: { fontSize: 24, fontWeight: '700', color: '#1A1D1E' },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 16, height: 50, marginBottom: 20, gap: 12 },
  input: { flex: 1, fontSize: 15, color: '#1A1D1E' },
  list: { gap: 12 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8F9FA', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  itemTitle: { fontSize: 16, fontWeight: '600', color: '#1A1D1E', marginBottom: 4 },
  itemSubtitle: { fontSize: 13, color: '#6C727F' },
});