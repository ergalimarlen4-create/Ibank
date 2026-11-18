import { useLang } from '../i18n';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

export default function ForgotPasswordScreen({ navigation }: ScreenProps<'ForgotPassword'>) {
  const { t } = useLang();
  const [phone, setPhone] = useState('');
  return (
    <View style={styles.root}>
      <Header light title={t('Forgot password')} onBack={navigation.goBack} />
      <Card>
        <Text style={styles.label}>{t('Type your phone number')}</Text>
        <Input placeholder="(+84)" keyboardType="phone-pad" autoFocus value={phone} onChangeText={setPhone} />
        <Text style={styles.hint}>{t('We texted you a code to verify your phone number')}</Text>
        <Button title={t('Send')} disabled={phone.length < 6} onPress={() => navigation.navigate('Otp', { phone })} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  label: { fontFamily: fonts.regular, fontSize: 10, color: colors.muted, marginBottom: 8 },
  hint: { fontFamily: fonts.regular, fontSize: 11, color: colors.text, marginVertical: 16 },
});
