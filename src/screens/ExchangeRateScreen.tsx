import { useLang } from '../i18n';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

const rows = [
  ['🇻🇳', 'Vietnam', '1.403', '1.746'], ['🇳🇮', 'Nicaragua', '9.123', '12.09'],
  ['🇰🇷', 'Korea', '3.704', '5.151'], ['🇷🇺', 'Russia', '116.0', '144.4'],
  ['🇨🇳', 'China', '1.725', '2.234'], ['🇵🇹', 'Portuguese', '1.403', '1.746'],
  ['🇰🇷', 'Korea', '3.454', '4.312'], ['🇫🇷', 'French', '23.45', '34.56'],
  ['🇳🇮', 'Nicaragua', '263.1', '300.3'], ['🇨🇳', 'China', '1.725', '2.234'],
];

export default function ExchangeRateScreen({ navigation }: ScreenProps<'ExchangeRate'>) {
  const { t } = useLang();
  return (
    <View style={styles.root}>
      <Header light title={t('Exchange rate')} onBack={navigation.goBack} />
      <View style={styles.head}>
        <Text style={[styles.th, { flex: 1 }]}>{t('Country')}</Text>
        <Text style={[styles.th, styles.col]}>{t('Buy')}</Text>
        <Text style={[styles.th, styles.col]}>{t('Sell')}</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {rows.map(([flag, name, buy, sell], i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.flag}>{flag}</Text>
            <Text style={[styles.td, { flex: 1 }]}>{t(name)}</Text>
            <Text style={[styles.td, styles.col]}>{buy}</Text>
            <Text style={[styles.td, styles.col]}>{sell}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  head: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 12 },
  th: { fontFamily: fonts.regular, fontSize: 10, color: colors.muted },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, height: 43 },
  flag: { fontSize: 20, width: 36 },
  td: { fontFamily: fonts.regular, fontSize: 11, color: colors.text },
  col: { width: 60, textAlign: 'right' },
});
