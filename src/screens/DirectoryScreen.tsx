import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { useBeneficiaries } from '../data/beneficiaries';
import { useLang } from '../i18n';
import { colors, fonts, radius } from '../theme';
import { ScreenProps } from '../navigation/types';

const groups = [
  ['card', 'Transfer via card number'],
  ['same', 'Transfer to the same bank'],
  ['other', 'Transfer to another bank'],
] as const;

export default function DirectoryScreen({ navigation }: ScreenProps<'Directory'>) {
  const { t } = useLang();
  const { list } = useBeneficiaries();
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState('');
  return (
    <View style={styles.root}>
      <Header
        light
        title={t('Beneficiary')}
        onBack={navigation.goBack}
        right={
          <Pressable hitSlop={10} onPress={() => { setSearching((s) => !s); setQ(''); }}>
            <Ionicons name={searching ? 'close' : 'search-outline'} size={18} color={colors.text} />
          </Pressable>
        }
      />
      {searching && (
        <TextInput style={styles.search} autoFocus placeholder={t('Search')} placeholderTextColor={colors.muted} value={q} onChangeText={setQ} />
      )}
      <ScrollView contentContainerStyle={styles.content}>
        {groups.map(([key, title]) => {
          const items = list.filter((b) => b.group === key && b.name.toLowerCase().includes(q.toLowerCase()));
          if (!items.length) return null;
          return (
            <View key={key}>
              <Text style={styles.section}>{t(title)}</Text>
              <View style={styles.card}>
                {items.map((b, i) => (
                  <Pressable key={b.id} style={[styles.row, i > 0 && styles.divider]} onPress={() => navigation.navigate('BeneficiaryDetail', { id: b.id })}>
                    <View style={styles.avatar}><Ionicons name="person" size={16} color={colors.primary} /></View>
                    <View>
                      <Text style={styles.name}>{b.name}</Text>
                      <Text style={styles.sub}>{b.card}</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
      <Pressable style={styles.fab} onPress={() => navigation.navigate('AddBeneficiary')}>
        <Ionicons name="add" size={26} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  search: { height: 38, marginHorizontal: 16, marginBottom: 4, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 12, backgroundColor: '#fff', fontFamily: fonts.regular, fontSize: 11, color: colors.text },
  content: { padding: 16, paddingBottom: 90 },
  section: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted, marginTop: 8, marginBottom: 8 },
  card: { backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 12, marginBottom: 8, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  divider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: fonts.medium, fontSize: 10, color: colors.text },
  sub: { fontFamily: fonts.regular, fontSize: 7, color: colors.muted, marginTop: 2 },
  fab: { position: 'absolute', right: 20, bottom: 30, width: 46, height: 46, borderRadius: 23, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', shadowColor: colors.primary, shadowOpacity: 0.4, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 5 },
});
