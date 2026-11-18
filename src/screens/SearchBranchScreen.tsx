import { useLang } from '../i18n';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

const branches = [
  { name: 'Bank 1656 Union Street', dist: '50 m' },
  { name: 'Bank Secaucus', dist: '1,2 km' },
  { name: 'Bank 1657 Riverside Drive', dist: '5,3 km' },
  { name: 'Bank Rutherford', dist: '70m' },
  { name: 'Bank 1656 Union Street', dist: '30m' },
];
const pins = [{ top: 30, left: 20 }, { top: 60, left: 180 }, { top: 150, left: 140 }, { top: 165, left: 24 }, { top: 190, left: 212 }];

export default function SearchBranchScreen({ navigation }: ScreenProps<'SearchBranch'>) {
  const { t } = useLang();
  const [q, setQ] = useState('Bank');
  const list = branches.filter((b) => b.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <View style={styles.root}>
      {/* Заглушка карты. Позже подключим react-native-maps (на web не работает). */}
      <View style={styles.map}>
        {pins.map((p, i) => (
          <Ionicons key={i} name="location" size={24} color={colors.primary} style={{ position: 'absolute', ...p }} />
        ))}
      </View>
      <View style={styles.headerAbs}>
        <Header light title={t('Branch')} onBack={navigation.goBack} />
      </View>
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <View style={styles.search}>
          <Ionicons name="search" size={16} color={colors.text} />
          <TextInput style={styles.input} value={q} onChangeText={setQ} placeholder={t('Search branch')} />
          {q.length > 0 && (
            <Pressable onPress={() => setQ('')} hitSlop={10}>
              <Ionicons name="close" size={16} color={colors.muted} />
            </Pressable>
          )}
        </View>
        <ScrollView>
          {list.map((b, i) => (
            <View key={i} style={styles.row}>
              <Ionicons name="location" size={18} color={colors.primary} />
              <Text style={styles.name}>{b.name}</Text>
              <Text style={styles.dist}>{b.dist}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  map: { height: 300, backgroundColor: '#E8E8EE' },
  headerAbs: { position: 'absolute', top: 0, left: 0, right: 0 },
  sheet: { flex: 1, marginTop: -24, backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16 },
  handle: { alignSelf: 'center', width: 28, height: 3, borderRadius: 2, backgroundColor: colors.border, marginBottom: 12 },
  search: { flexDirection: 'row', alignItems: 'center', gap: 8, height: 40, borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 12 },
  input: { flex: 1, fontFamily: fonts.regular, fontSize: 12, color: colors.text },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  name: { flex: 1, fontFamily: fonts.regular, fontSize: 12, color: colors.text },
  dist: { fontFamily: fonts.regular, fontSize: 9, color: colors.muted },
});
