import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { useLang } from '../i18n';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

const bills = [
  { key: 'Electric', title: 'Electric bill', sub: 'Pay electric bill this month', icon: 'flash', color: colors.warning },
  { key: 'Water', title: 'Water bill', sub: 'Pay water bill this month', icon: 'water', color: '#3B82F6' },
  { key: 'Mobile', title: 'Mobile bill', sub: 'Pay mobile bill this month', icon: 'phone-portrait', color: colors.primary },
  { key: 'Internet', title: 'Internet bill', sub: 'Pay internet bill this month', icon: 'wifi', color: colors.success },
] as const;

export default function PayBillScreen({ navigation }: ScreenProps<'PayBill'>) {
  const { t } = useLang();
  return (
    <View style={styles.root}>
      <Header light title={t('Pay the bill')} onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.list}>
        {bills.map((b) => (
          <Pressable key={b.key} style={styles.card} onPress={() => navigation.navigate('BillCheck', { kind: b.key })}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{t(b.title)}</Text>
              <Text style={styles.sub}>{t(b.sub)}</Text>
            </View>
            {/* Замени на иллюстрацию из Figma */}
            <View style={[styles.art, { backgroundColor: b.color + '22' }]}><Ionicons name={b.icon} size={30} color={b.color} /></View>
          </Pressable>
        ))}
        <Pressable style={styles.hist} onPress={() => navigation.navigate('PaymentHistory')}>
          <Ionicons name="time-outline" size={16} color={colors.primary} />
          <Text style={styles.histText}>{t('Payment history')}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  list: { padding: 16, gap: 12 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 16, height: 82, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  title: { fontFamily: fonts.semibold, fontSize: 11, color: colors.text },
  sub: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted, marginTop: 6 },
  hist: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 12 },
  histText: { fontFamily: fonts.medium, fontSize: 10, color: colors.primary },
  art: { width: 54, height: 54, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
