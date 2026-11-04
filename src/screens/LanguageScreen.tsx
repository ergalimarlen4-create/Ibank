import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const LanguageScreen = ({ navigation }: any) => {
  const [selected, setSelected] = useState('English');
  const languages = ['Vietnamese', 'French', 'English', 'Japanese', 'Portuguese', 'China', 'Korea', 'Nicaragua', 'Russia'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1A1D1E" />
        </TouchableOpacity>
        <Text style={styles.title}>Language</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={languages}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => setSelected(item)}>
            <Text style={[styles.langText, selected === item && { color: '#4A3AFF', fontWeight: '700' }]}>{item}</Text>
            {selected === item && <Ionicons name="checkmark" size={20} color="#4A3AFF" />}
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 20 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16 },
  title: { fontSize: 18, fontWeight: '700', color: '#1A1D1E' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F2F2F7', alignItems: 'center' },
  langText: { fontSize: 15, color: '#1A1D1E' },
});