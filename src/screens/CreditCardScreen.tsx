import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import BankCard from '../components/BankCard';
import Button from '../components/Button';
import PurchaseList from '../components/PurchaseList';
import { useLang } from '../i18n';
import { colors, radius } from '../theme';
import { ScreenProps } from '../navigation/types';

export default function CreditCardScreen({ navigation }: ScreenProps<'CreditCard'>) {
  const { t } = useLang();
  return (
    <View style={styles.root}>
      <Header title={t('Credit card')} onBack={navigation.goBack} />
      <ScrollView>
        <View style={styles.top}>
          <View style={{ marginBottom: -60 }}>
            <BankCard />
            <View style={styles.strip} />
          </View>
        </View>
        <View style={styles.sheet}>
          <PurchaseList />
          <Button title={t('Pay')} style={{ marginTop: 28 }} onPress={() => navigation.navigate('CreditPay')} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.primary },
  top: { backgroundColor: colors.primary, paddingHorizontal: 16, zIndex: 2 },
  strip: { height: 6, marginHorizontal: 16, borderBottomLeftRadius: 6, borderBottomRightRadius: 6, backgroundColor: colors.danger },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, paddingHorizontal: 16, paddingTop: 76, paddingBottom: 32, minHeight: 560, zIndex: 1 },
});
