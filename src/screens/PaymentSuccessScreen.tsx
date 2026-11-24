import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Button from '../components/Button';
import { useLang } from '../i18n';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

const content = {
  withdraw: { icon: 'wallet', title: 'Successful withdrawal!', lines: ['You have successfully withdrawn money!', 'Please check the balance in the card management section.'] },
  prepaid: { icon: 'phone-portrait', title: 'Payment success!', lines: ['You have successfully paid mobile prepaid!'] },
  bill: { icon: 'receipt', title: 'Transaction successfully!', lines: ['You have successfully paid the bill!'] },
  credit: { icon: 'card', title: 'Transaction successfully!', lines: ['You have successfully traded!'] },
  save: { icon: 'cash', title: 'Save online successfully!', lines: ['Congratulations!', 'You have save money online successfully!'] },
} as const;

export default function PaymentSuccessScreen({ navigation, route }: ScreenProps<'PaymentSuccess'>) {
  const { t } = useLang();
  const c = content[route.params.kind];
  const bill = route.params.bill;
  const lines: readonly string[] = route.params.kind === 'bill' && bill ? [`You have paid your ${bill.toLowerCase()} bill`] : c.lines;
  const goHome = () => navigation.popToTop();
  return (
    <View style={styles.root}>
      <Header light />
      <View style={styles.body}>
        {/* Замени на иллюстрацию из Figma */}
        <View style={styles.art}><Ionicons name={c.icon} size={80} color={colors.primary} /></View>
        <Text style={styles.title}>{t(c.title)}</Text>
        <Text style={styles.text}>{lines.map((l) => t(l)).join('\n')}</Text>
        <Button title={t('Confirm')} onPress={goHome} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  body: { paddingHorizontal: 16 },
  art: { alignSelf: 'center', width: 170, height: 170, borderRadius: 85, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginVertical: 30 },
  title: { textAlign: 'center', fontFamily: fonts.medium, fontSize: 12, color: colors.primary },
  text: { textAlign: 'center', fontFamily: fonts.regular, fontSize: 10, color: colors.text, marginVertical: 18, lineHeight: 16 },
});
