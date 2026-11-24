import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import BankCard from '../components/BankCard';
import Button from '../components/Button';
import { useLang } from '../i18n';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

const accounts = [
  { n: 1, number: '1900 8988 1234', balance: '$20,000' },
  { n: 2, number: '8988 1234', balance: '$12,000' },
  { n: 3, number: '1900 1234 2222', balance: '$230,000' },
];

export default function AccountCardScreen({ navigation }: ScreenProps<'AccountCard'>) {
  const { t } = useLang();
  const [tab, setTab] = useState<'account' | 'card'>('account');
  return (
    <View style={styles.root}>
      <Header light title={t('Account and card')} onBack={navigation.goBack} />
      <View style={styles.tabs}>
        {(['account', 'card'] as const).map((k) => (
          <Pressable key={k} style={[styles.tab, tab === k && styles.tabOn]} onPress={() => setTab(k)}>
            <Text style={[styles.tabText, tab === k && { color: '#fff' }]}>{t(k === 'account' ? 'Account' : 'Card')}</Text>
          </Pressable>
        ))}
      </View>

      {tab === 'account' ? (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.avatar}><Ionicons name="person" size={40} color={colors.primary} /></View>
          <Text style={styles.name}>Push Puttichai</Text>
          {accounts.map((a) => (
            <View key={a.n} style={styles.acc}>
              <View style={styles.row}>
                <Text style={styles.accTitle}>{t('Account')} {a.n}</Text>
                <Text style={styles.accTitle}>{a.number}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.sub}>{t('Available balance')}</Text>
                <Text style={styles.val}>{a.balance}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.sub}>{t('Branch')}</Text>
                <Text style={styles.val}>New York</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={[styles.content, { gap: 16 }]}>
            <BankCard onPress={() => navigation.navigate('CardDetail')} />
            <BankCard variant="orange" onPress={() => navigation.navigate('CardDetail')} />
          </ScrollView>
          <View style={styles.add}><Button title={t('Add card')} /></View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  tabs: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingTop: 4 },
  tab: { flex: 1, height: 32, borderRadius: 8, backgroundColor: '#EDEDF5', alignItems: 'center', justifyContent: 'center' },
  tabOn: { backgroundColor: colors.primary },
  tabText: { fontFamily: fonts.regular, fontSize: 10, color: colors.text },
  content: { padding: 16 },
  avatar: { alignSelf: 'center', width: 72, height: 72, borderRadius: 36, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  name: { textAlign: 'center', fontFamily: fonts.medium, fontSize: 10, color: colors.primary, marginTop: 8, marginBottom: 16 },
  acc: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 12, gap: 6, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 3 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  accTitle: { fontFamily: fonts.medium, fontSize: 10, color: colors.text },
  sub: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted },
  val: { fontFamily: fonts.medium, fontSize: 8, color: colors.primary },
  add: { paddingHorizontal: 16, paddingBottom: 24 },
});
