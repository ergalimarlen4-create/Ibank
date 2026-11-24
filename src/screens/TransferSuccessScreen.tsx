import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Button from '../components/Button';
import { useLang } from '../i18n';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

export default function TransferSuccessScreen({ navigation, route }: ScreenProps<'TransferSuccess'>) {
  const { t } = useLang();
  const { amount, name } = route.params;
  const goHome = () => navigation.popToTop();
  return (
    <View style={styles.root}>
      <Header light title={t('Confirm')} onBack={goHome} />
      <View style={styles.body}>
        {/* Замени на иллюстрацию из Figma */}
        <View style={styles.art}><Ionicons name="wallet" size={90} color={colors.primary} /></View>
        <Text style={styles.title}>{t('Transfer successful!')}</Text>
        <Text style={styles.text}>
          {t('You have successfully transferred')}
          {'\n'}
          <Text style={styles.amount}>${amount}</Text> {t('to')} <Text style={styles.name}>{name}!</Text>
        </Text>
        <Button title={t('Confirm')} onPress={goHome} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  body: { paddingHorizontal: 16 },
  art: { height: 170, borderRadius: 85, alignSelf: 'center', width: 170, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginVertical: 30 },
  title: { textAlign: 'center', fontFamily: fonts.medium, fontSize: 13, color: colors.primary, marginTop: 8 },
  text: { textAlign: 'center', fontFamily: fonts.regular, fontSize: 11, color: colors.text, marginVertical: 18, lineHeight: 18 },
  amount: { fontFamily: fonts.semibold, color: colors.danger },
  name: { fontFamily: fonts.semibold, color: colors.primary },
});
