import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLang } from '../i18n';
import { colors, fonts } from '../theme';

type Icon = keyof typeof Ionicons.glyphMap;
const items: { icon: Icon; color: string; name: string }[] = [
  { icon: 'camera', color: colors.primary, name: 'Buy Camera' },
  { icon: 'tv', color: colors.danger, name: 'Buy Television' },
  { icon: 'camera', color: '#3B82F6', name: 'Buy Camera' },
  { icon: 'tv', color: colors.warning, name: 'Buy Television' },
];

export default function PurchaseList() {
  const { t } = useLang();
  return (
    <View>
      {items.map((it, i) => (
        <View key={i} style={styles.row}>
          <View style={[styles.icon, { backgroundColor: it.color }]}><Ionicons name={it.icon} size={14} color="#fff" /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{t(it.name)}</Text>
            <Text style={styles.date}>02/11/2018</Text>
          </View>
          <Text style={styles.amount}>- $1200</Text>
        </View>
      ))}
      <View style={styles.totalRow}>
        <Text style={styles.total}>{t('TOTAL')}</Text>
        <Text style={styles.totalVal}>-$3100</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 9 },
  icon: { width: 26, height: 26, borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: fonts.regular, fontSize: 9, color: colors.text },
  date: { fontFamily: fonts.regular, fontSize: 7, color: colors.muted, marginTop: 2 },
  amount: { fontFamily: fonts.medium, fontSize: 9, color: colors.danger },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border, paddingTop: 12, marginTop: 6 },
  total: { fontFamily: fonts.semibold, fontSize: 10, color: colors.text },
  totalVal: { fontFamily: fonts.semibold, fontSize: 18, color: colors.danger },
});
