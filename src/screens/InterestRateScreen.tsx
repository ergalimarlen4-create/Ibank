import { useLang } from '../i18n';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

const I = 'Individual customers';
const C = 'Corporate customers';
const rows = [
  [I, '1m', '4.50%'], [C, '2m', '5.50%'], [I, '1m', '4.50%'], [C, '6m', '2.50%'],
  [I, '1m', '4.50%'], [C, '8m', '6.50%'], [I, '1m', '4.50%'], [I, '1m', '4.50%'],
  [C, '7m', '6.80%'], [I, '1m', '4.50%'], [I, '12m', '5.90%'],
];

export default function InterestRateScreen({ navigation }: ScreenProps<'InterestRate'>) {
  const { t } = useLang();
  return (
    <View style={styles.root}>
      <Header light title={t('Interest rate')} onBack={navigation.goBack} />
      <View style={styles.head}>
        <Text style={[styles.th, { flex: 1 }]}>{t('Interest kind')}</Text>
        <Text style={[styles.th, styles.col]}>{t('Deposit')}</Text>
        <Text style={[styles.th, styles.col]}>{t('Rate')}</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {rows.map(([kind, dep, rate], i) => (
          <View key={i} style={styles.row}>
            <Text style={[styles.td, { flex: 1 }]}>{t(kind)}</Text>
            <Text style={[styles.td, styles.col]}>{dep}</Text>
            <Text style={[styles.td, styles.col, styles.rate]}>{rate}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  head: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 12 },
  th: { fontFamily: fonts.regular, fontSize: 10, color: colors.muted },
  row: { flexDirection: 'row', paddingHorizontal: 20, height: 38, alignItems: 'center', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  td: { fontFamily: fonts.regular, fontSize: 10, color: colors.text },
  col: { width: 56, textAlign: 'right' },
  rate: { fontFamily: fonts.medium, color: colors.primary },
});
