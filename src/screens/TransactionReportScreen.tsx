import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import BankCard from '../components/BankCard';
import { useLang } from '../i18n';
import { colors, fonts, radius } from '../theme';
import { ScreenProps } from '../navigation/types';

const bars = [
  { m: 'Jan', up: 28, down: 22 }, { m: 'Feb', up: 52, down: 44 }, { m: 'Mar', up: 74, down: 64 },
  { m: 'Apr', up: 44, down: 58 }, { m: 'May', up: 20, down: 36 }, { m: 'Jun', up: 32, down: 28 },
];

type Icon = keyof typeof Ionicons.glyphMap;
type Item = { icon: Icon; color: string; name: string; income?: boolean; amount: number; status?: string };
const groups: { title: string; items: Item[] }[] = [
  { title: 'Today', items: [{ icon: 'water', color: colors.primary, name: 'Water Bill', amount: -280, status: 'Unsuccessfully' }] },
  { title: 'Yesterday', items: [
    { icon: 'cash', color: colors.danger, name: 'Salary Oct', income: true, amount: 1200 },
    { icon: 'flash', color: '#3B82F6', name: 'Electric Bill', amount: -480, status: 'Successfully' },
    { icon: 'cash', color: colors.warning, name: 'Jane transfers', income: true, amount: 500 },
    { icon: 'wifi', color: colors.success, name: 'Internet Bill', amount: -100, status: 'Successfully' },
  ] },
];

export default function TransactionReportScreen({ navigation }: ScreenProps<'TransactionReport'>) {
  const { t } = useLang();
  return (
    <View style={styles.root}>
      <Header title={t('Transaction report')} onBack={navigation.goBack} />
      <ScrollView>
        <View style={styles.top}>
          <View style={styles.cardWrap}>
            <BankCard />
            <View style={[styles.strip, { backgroundColor: colors.danger }]} />
            <View style={[styles.strip2, { backgroundColor: colors.primary }]} />
          </View>
        </View>
        <View style={styles.sheet}>
          <View style={styles.chart}>
            <Text style={styles.small}>{t('Balance')}</Text>
            <Text style={styles.big}>1000 <Text style={styles.small}>USD</Text></Text>
            <View style={styles.bars}>
              {bars.map((b) => (
                <View key={b.m} style={styles.col}>
                  <View style={styles.barArea}>
                    <View style={{ width: 3, height: b.up, backgroundColor: colors.primary, borderRadius: 2 }} />
                    <View style={{ width: 3, height: b.down, backgroundColor: colors.danger, borderRadius: 2 }} />
                  </View>
                  <Text style={[styles.month, b.m === 'Apr' && { color: colors.primary, fontFamily: fonts.medium }]}>{b.m}</Text>
                </View>
              ))}
            </View>
          </View>

          {groups.map((g) => (
            <View key={g.title}>
              <Text style={styles.group}>{t(g.title)}</Text>
              {g.items.map((it) => (
                <View key={it.name} style={styles.row}>
                  <View style={[styles.icon, { backgroundColor: it.color }]}><Ionicons name={it.icon} size={16} color="#fff" /></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{it.income ? `${t('Income')}: ${t(it.name)}` : t(it.name)}</Text>
                    {!!it.status && <Text style={styles.status}>{t(it.status)}</Text>}
                  </View>
                  <Text style={[styles.amount, { color: it.amount < 0 ? colors.danger : colors.primary }]}>
                    {it.amount < 0 ? `- $${-it.amount}` : `+$${it.amount}`}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.primary },
  top: { backgroundColor: colors.primary, paddingHorizontal: 16, paddingBottom: 0, zIndex: 2 },
  cardWrap: { marginBottom: -60 },
  strip: { height: 6, marginHorizontal: 16, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 },
  strip2: { height: 6, marginHorizontal: 28, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, paddingHorizontal: 16, paddingTop: 80, paddingBottom: 32, minHeight: 600, zIndex: 1 },
  chart: { backgroundColor: '#fff', borderRadius: 12, padding: 14, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 3 },
  small: { fontFamily: fonts.regular, fontSize: 8, color: colors.text },
  big: { fontFamily: fonts.medium, fontSize: 22, color: colors.primary },
  bars: { flexDirection: 'row', marginTop: 10 },
  col: { flex: 1, alignItems: 'center' },
  barArea: { height: 130, justifyContent: 'center', alignItems: 'center', gap: 2 },
  month: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted, marginTop: 6 },
  group: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted, marginTop: 18, marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  icon: { width: 28, height: 28, borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: fonts.regular, fontSize: 10, color: colors.text },
  status: { fontFamily: fonts.regular, fontSize: 7, color: colors.muted, marginTop: 2 },
  amount: { fontFamily: fonts.medium, fontSize: 10 },
});
