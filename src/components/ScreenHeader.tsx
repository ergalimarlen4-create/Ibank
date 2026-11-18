import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';

export function ScreenHeader({ title }: { title: string }) {
  const navigation = useNavigation<any>();
  return (
    <View style={s.row}>
      <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
        <Ionicons name="chevron-back" size={22} color={colors.text} />
      </TouchableOpacity>
      <Text style={s.title}>{title}</Text>
    </View>
  );
}
const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  title: { fontSize: 17, fontWeight: '600', color: colors.text, marginLeft: 8 },
});
