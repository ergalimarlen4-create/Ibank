import { StyleSheet, Text, View } from 'react-native';
import { useLang } from '../i18n';
import { colors, fonts } from '../theme';

const fees: Record<string, number> = { Electric: 470, Water: 30, Mobile: 20, Internet: 50 };
const TAX = 10;

export default function BillDetails({ kind, title }: { kind: string; title?: string }) {
  const { t } = useLang();
  const fee = fees[kind] ?? 50;
  const rows: [string, string][] = [
    ['Name', 'Jackson Maine'], ['Address', '403 East 4th Street, Santa Ana'], ['Phone number', '+8424599721'],
    ['Code', '#2343543'], ['From', '01/10/2019'], ['To', '01/11/2019'],
  ];
  return (
    <View style={styles.card}>
      {!!title && <Text style={styles.title}>{title}</Text>}
      {rows.map(([k, v]) => (
        <View key={k} style={styles.row}>
          <Text style={styles.label}>{t(k)}</Text>
          <Text style={styles.value}>{v}</Text>
        </View>
      ))}
      <View style={[styles.row, { marginTop: 10 }]}>
        <Text style={styles.feeLabel}>{t(`${kind} fee`)}</Text>
        <Text style={styles.fee}>${fee}</Text>
      </View>
      <View style={styles.sep} />
      <View style={styles.row}>
        <Text style={styles.feeLabel}>{t('Tax')}</Text>
        <Text style={styles.fee}>${TAX}</Text>
      </View>
      <View style={styles.sep} />
      <View style={[styles.row, { alignItems: 'center' }]}>
        <Text style={styles.total}>{t('TOTAL')}</Text>
        <Text style={styles.totalVal}>${fee + TAX}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 14, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 3 },
  title: { fontFamily: fonts.medium, fontSize: 10, color: colors.text, marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, gap: 16 },
  label: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted },
  value: { fontFamily: fonts.regular, fontSize: 8, color: colors.text, textAlign: 'right', flexShrink: 1 },
  feeLabel: { fontFamily: fonts.regular, fontSize: 10, color: colors.muted },
  fee: { fontFamily: fonts.medium, fontSize: 10, color: colors.primary },
  sep: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginVertical: 8 },
  total: { fontFamily: fonts.semibold, fontSize: 10, color: colors.text },
  totalVal: { fontFamily: fonts.semibold, fontSize: 18, color: colors.danger },
});
